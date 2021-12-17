import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Form } from "react-final-form";
import { FieldType } from "../FieldManager";
import { FormLayout } from "../types";
import RadioGroupField from "./RadioGroupField";

const radioProps = {
    "layout": FormLayout.FIELD,
    "name": "all_sub_tenants",
    "label": "Select Tenants",
    "type": FieldType.Radio,
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
    "validator": [
        {
            "type": "required",
            "message": "Please select at least one sub tenant"
        }
    ]
}

describe("DOM Form Component testing", () => {
    test("ChipInput should be render with label & input", () => {
        render(
            <Form
                onSubmit={() => null}
            >
                {
                    () => (
                        <RadioGroupField
                            {...radioProps}
                        />
                    )
                }
            </Form>
        );

        expect(screen.getByTestId(`${radioProps.name}_container`)).toBeInTheDocument();
        const radioLabel = screen.getByTestId(`${radioProps.name}_label`);
        expect(radioLabel).toBeInTheDocument();
        expect(radioLabel).toHaveTextContent(radioProps.label);

        for ( let i =0; i < radioProps.options.length; i++) {
            expect(
                screen.getByTestId(`${radioProps.name}_${radioProps.options[i].label}_label`)
            ).toBeInTheDocument();
        }

        // Selection Of a Radio
        const option = radioProps.options[0];
        const radioItem = screen.getByTestId(`${radioProps.name}_item_${option.value}`);
        expect(radioItem).toBeInTheDocument();

        userEvent.click(radioItem);
        expect(radioItem.firstElementChild).toHaveClass("Mui-checked")

        // Others Radio shouldn't be select
        for ( let i =1; i < radioProps.options.length; i++) {
            expect(
                screen.getByTestId(`${radioProps.name}_item_${option.value}`)
            ).not.toHaveClass("Mui-checked");
        }
        // Selection Of a Radio
        const optionSecond = radioProps.options[1];
        const radioItemSecond = screen.getByTestId(`${radioProps.name}_item_${optionSecond.value}`);
        expect(radioItemSecond).toBeInTheDocument();

        userEvent.click(radioItemSecond);
        expect(radioItemSecond.firstElementChild).toHaveClass("Mui-checked")
        expect(radioItem.firstElementChild).not.toHaveClass("Mui-checked")
    });
});
