import { render, screen } from "@testing-library/react";
import React from "react";
import { FieldType } from "../FieldManager";
import { FormLayout } from "../types";
import MessageField from "./MessageField";

const MessageProps = {
    "layout": FormLayout.FIELD,
    "name": "email_message",
    "type": FieldType.Message,
    "display": "Alert",
    "message": "Select Super-Tenants to subscribe users to corresponding Alerts Notifications."
};

describe("DOM Form Component testing", () => {
    test("Message container should be render for alert", () => {
        render(
            <MessageField
                {...MessageProps}
            />
        );
        const messageScreen = screen.getByTestId("email_message_message");
        expect(messageScreen).toBeInTheDocument();
        expect(
            messageScreen
        ).toHaveTextContent(MessageProps.message)
    });
    test("Message container should be render for Plain", () => {
        render(
            <MessageField
                {...MessageProps}
                display="Plain"
            />
        );
        const messageScreen = screen.getByTestId("email_message_message");
        expect(messageScreen).toBeInTheDocument();
        expect(
            messageScreen
        ).toHaveTextContent(MessageProps.message)
    });
    test("Message container should be render for Info", () => {
        render(
            <MessageField
                {...MessageProps}
                display="InfoCircle"
            />
        );
        const messageScreen = screen.getByTestId("email_message_message");
        expect(messageScreen).toBeInTheDocument();
        expect(
            messageScreen
        ).toHaveTextContent(MessageProps.message)
    });
    test("Message container should be render for Html", () => {
        const { rerender } = render(
            <MessageField
                {...MessageProps}
                display="Html"
            />
        );

        const messageScreen = screen.getByTestId("email_message_message");
        expect(messageScreen).toBeInTheDocument();
        expect(
            messageScreen
        ).toHaveTextContent(MessageProps.message)

        rerender(
            <MessageField
                {...MessageProps}
                icon={"infoCircle"}
                display="Html"
            />
        )

        const updatedScreen = screen.getByTestId("email_message_message");
        expect(updatedScreen).toBeInTheDocument();
        expect(
            updatedScreen
        ).toHaveTextContent(MessageProps.message)
    });

    test("Message container should be render for Icon", () => {
        render(
            <MessageField
                {...MessageProps}
                display="Icon"
            />
        );
        const messageScreen = screen.getByTestId("email_message_message");
        expect(messageScreen).toBeInTheDocument();
        expect(
            messageScreen
        ).toHaveTextContent(MessageProps.message)
    });
});
