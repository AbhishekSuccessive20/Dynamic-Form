import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";
import { FieldType } from "../FieldManager";
import { FormLayout } from "../types";
import ChipInputField from "./ChipInputField";
import userEvent from "@testing-library/user-event";

const chipInputProps = {
    "layout": FormLayout.FIELD,
    "name": "alert_email",
    "label": "User Email Address(es)",
    "type": FieldType.ChipInput,
    "validator": [
        {
            "type": "required",
            "message": "Enter valid email addresses"
        },
        {
            "type": "customEmail",
            "message": "Enter valid email addresses"
        }
    ]
}

describe("DOM Form Component testing", () => {
    test("ChipInput should be render with label & input", async () => {
        const { rerender } = render(
            <Form
                onSubmit={() => null}
            >
                {
                    () => (
                        <ChipInputField
                            {...chipInputProps}
                        />
                    )
                }
            </Form>
        );
        const chipLabel = screen.getByTestId(`${chipInputProps.name}_label`);
        expect(chipLabel).toBeInTheDocument();
        expect(chipLabel).toHaveTextContent(chipInputProps.label);
        expect(screen.getByTestId(`${chipInputProps.name}_field`)).toBeInTheDocument();

        const updatedProps = {
            ...chipInputProps,
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

        //Chip Should be add
        const input = screen.getByTestId(`${chipInputProps.name}_field`);
        expect(input).toBeInTheDocument();

        const chipText = "Chip";

        fireEvent.change(input, { target: { value: chipText } })
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

        const chipElement = screen.getByTestId(`${chipText}_0`);
        await waitFor(() => expect(chipElement).toBeInTheDocument());

        expect(chipElement.firstElementChild).toHaveTextContent(chipText);

        //Cross butn should be render
        const deleteIcon = chipElement.getElementsByTagName("svg")[0];
        expect(deleteIcon).toBeInTheDocument();

        //Chip should be delete
        userEvent.click(deleteIcon)
        await waitFor(() => expect(chipElement).not.toBeInTheDocument());
    });
});
