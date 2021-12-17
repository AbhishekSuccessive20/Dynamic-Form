import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";
import { FieldType } from "../FieldManager";
import { FormLayout } from "../types";
import CheckboxGroupField from "./CheckboxGroupField";

const checkboxProps = {
    "layout": FormLayout.FIELD,
    "name": "sub_tenants",
    "type": FieldType.Checkbox,
    "options": [
        {
            "label": "All Sub-Tenants",
            "value": "true"
        },
        {
            "label": "Select Sub-Tenants",
            "value": "false"
        }
    ],
    "dependencies": [
        {
            "field": "all_sub_tenants",
            "value": "false",
            "to": [],
            "mode": "enable"
        }
    ],
    "validator": [
        {
            "type": "required",
            "when": {
                "all_sub_tenants": "false"
            },
            "message": "Please select at least one sub tenant"
        }
    ]
}

describe("DOM Form Checkbox testing", () => {
    test("Checkboxes should be render with label & input", async () => {
        const { rerender } = render(
            <Form
                onSubmit={() => null}
            >
                {
                    () => (
                        <CheckboxGroupField
                            {...checkboxProps}
                        />
                    )
                }
            </Form>
        );

        expect(
            screen.getByTestId(`${checkboxProps.name}_container`)
        ).toBeInTheDocument();

        for (let i = 0; i < checkboxProps.options.length; i++) {
            expect(
                screen.getByTestId(`${checkboxProps.name}_field${i}`)
            ).toBeInTheDocument();
        }
        expect(screen.getByTestId(`${checkboxProps.name}_field${0}`)
            .getElementsByTagName("input")[0]).not.toBeChecked();

        // Checking Select of an Item
        fireEvent.click(screen.getByTestId(`${checkboxProps.name}_field${0}`));
        await waitFor(
            () => (
                expect(screen.getByTestId(`${checkboxProps.name}_field${0}`)
                    .getElementsByTagName("input")[0]).toBeChecked()
            )
        );
        // Checking Multi Select of an Item
        fireEvent.click(screen.getByTestId(`${checkboxProps.name}_field${1}`));
        await waitFor(
            () => {
                expect(screen.getByTestId(`${checkboxProps.name}_field${0}`)
                    .getElementsByTagName("input")[0]).toBeChecked()
                return expect(screen.getByTestId(`${checkboxProps.name}_field${1}`)
                    .getElementsByTagName("input")[0]).toBeChecked()
            }
        );

        // Checking Un-Select of an Item
        fireEvent.click(screen.getByTestId(`${checkboxProps.name}_field${0}`));
        await waitFor(
            () => (
                expect(screen.getByTestId(`${checkboxProps.name}_field${0}`)
                    .getElementsByTagName("input")[0]).not.toBeChecked()
            )
        );

        const updatedProps = {
            ...checkboxProps,
            options: [
                {
                    "label": "All Sub-Tenants Change",
                    "value": "true"
                },
                {
                    "label": "Select Sub-Tenants",
                    "value": "false"
                }
            ]
        };

        // re-render the same component with different props
        rerender(
            <Form
                onSubmit={() => null}
            >
                {
                    () => (
                        <CheckboxGroupField
                            {...updatedProps}
                        />
                    )
                }
            </Form>
        )

        for (let i = 0; i < updatedProps.options.length; i++) {
            expect(
                screen.getByTestId(`${updatedProps.name}_field${i}`)
            ).toBeInTheDocument();
        }
    });
});
