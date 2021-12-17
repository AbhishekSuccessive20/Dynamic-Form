import { render, screen } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";
import { FieldType } from "../FieldManager";
import { FormLayout } from "../types";
import TextField from "./TextField";

const textProps = {
    "layout": FormLayout.FIELD,
    "name": "alert_email",
    "label": "User Email Address(es)",
    "type": FieldType.Text,
    "validator": [
        {
            "type": "required",
            "message": "Enter valid email addresses"
        }
    ]
}

describe("DOM Form Component testing", () => {
    test("TextField should be render with label & input", () => {
        render(
            <Form
                onSubmit={() => null}
            >
                {
                    () => (
                        <TextField
                            {...textProps}
                        />
                    )
                }
            </Form>
        );
        if (textProps.label) {
            const chipLabel = screen.getByTestId(`${textProps.name}_label`);
            expect(chipLabel).toBeInTheDocument();
            expect(chipLabel).toHaveTextContent(textProps.label);
        }
        expect(screen.getByTestId(`${textProps.name}_field`)).toBeInTheDocument();
    });
});
