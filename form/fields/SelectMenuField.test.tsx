import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Form } from "react-final-form";
import { FieldType } from "../FieldManager";
import { FormLayout } from "../types";
import SelectMenuField from "./SelectMenuField";

const selectProps = {
    "layout": FormLayout.FIELD,
    "name": "software_version",
    "label": "Software Version",
    "type": FieldType.Select,
    "options": [
        {
            "label": "Software 1",
            "value": "soft_1"
        },
        {
            "label": "Software 2",
            "value": "soft_2"
        }
    ],
    "validator": [
        {
            "type": "required",
            "message": "Please select at least one version."
        }
    ]
}

describe("DOM Form Component testing", () => {
    test("Select Menu should be render with label & input", async () => {
        render(
            <Form
                onSubmit={() => null}
            >
                {
                    () => (
                        <SelectMenuField
                            {...selectProps}
                        />
                    )
                }
            </Form>
        );

        const radioLabel = screen.getByTestId(`${selectProps.name}_label`);
        expect(radioLabel).toBeInTheDocument();
        expect(radioLabel).toHaveTextContent(selectProps.label);

        userEvent.click(screen.getByTestId(`select-field-${selectProps.name}`))

        await waitFor(() => expect(screen.getByRole("listbox")).toBeInTheDocument());

        for (let i = 0; i < selectProps.options.length; i++) {
            expect(
                screen.getByTestId(`${selectProps.name}_menu_${i}`)
            ).toBeInTheDocument();
        }

        userEvent.click(screen.getByTestId(`${selectProps.name}_menu_0`))

        expect(screen.getByTestId(`select-field-${selectProps.name}`)).toHaveTextContent(selectProps.options[0].label);
        expect(
            screen.getByTestId(`select-field-${selectProps.name}`
            ).nextElementSibling).toHaveValue(selectProps.options[0].value);
    });
});
