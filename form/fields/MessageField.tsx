import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import WarningTriangle from "../../icons/WarningTriangle";
import { isNilOrEmptyString } from "../utils";

const useStyles = makeStyles({
    label: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "20px",
        color: "#444"
    },
    messageContainer: {
        display: "inline-flex",
        marginTop: "10px"
    },
    infoCircle: {
        "&:before": {
            content: "\"!\"",
            color: "#fff",
            background: "#85C8FF",
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "20px",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            textAlign: "center",
            display: "inline-block",
            marginRight: "4px"
        }
    },
    message: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "1.25rem",
        color: "#333333"
    },
    gridRoot: {
        lineHeight: "0rem"
    }
});

const MessageInfo = ({ children, classes }) => {
    return (
        <span
            dangerouslySetInnerHTML={{ __html: children }}
            className={classes.message}
        />
    )
}

const HtmlMessage = (props): JSX.Element => {
    const classes = useStyles();
    const {
        infoCircle,
        messageContainer,
    } = classes;

    const message = (
        <span
            dangerouslySetInnerHTML={{ __html: props.children }}
            className={classes.message}
        />
    )
    const iconMessage = (
        <div className={infoCircle}>
            {message}
        </div>
    )
    return (
        <div className={messageContainer} style={{ alignSelf: "baseline" }}>
            {!isNilOrEmptyString(props.icon) ? iconMessage : message}
        </div>
    )
}

export type InfoCircleProps = {
    children: string;
}

export const InfoCircleMessage = (props: InfoCircleProps): JSX.Element => {
    const classes = useStyles();
    const {
        infoCircle,
        messageContainer,
    } = classes;
    const { children } = props;

    return (
        <div className={messageContainer}>
            <div className={infoCircle}>
                <MessageInfo classes={classes}>{children}</MessageInfo>
            </div>
        </div>
    );
}

export type IconMessageProps = {
    children: string;
}

export const IconMessage = (props: IconMessageProps): JSX.Element => {
    const classes = useStyles();
    const {
        messageContainer,
    } = classes;
    const { children } = props;
    return (
        <div className={messageContainer}>
            <WarningTriangle />
            <MessageInfo classes={classes}>{children}</MessageInfo>
        </div>
    );
}

export type AlertMessageProps = {
    children: string;
}

export const AlertMessage = (props: AlertMessageProps): JSX.Element => {
    const classes = useStyles();
    const {
        label,
    } = classes;
    const { children } = props;
    return (
        <span className={label}>
            <span
                dangerouslySetInnerHTML={{ __html: children }}
                className={classes.message}
            />
        </span>
    );
}

export type MessageProps = {
    message: string;
    display: string;
    icon?: string;
    name: string;
}

const MessageField = (props: MessageProps): JSX.Element => {
    const { message, display, icon, name } = props;
    const classes = useStyles();

    return (
        <Grid id={`${name}_message`} item xs={12} classes={{ root: classes.gridRoot }} >
            {
                display === "Plain" &&
                <MessageInfo classes={classes}>{message}</MessageInfo>
            }
            {
                display === "InfoCircle" &&
                <InfoCircleMessage >{message}</InfoCircleMessage>
            }
            {
                display === "Alert" &&
                <AlertMessage >{message}</AlertMessage>
            }
            {
                display === "Html" &&
                <HtmlMessage icon={icon}>{message}</HtmlMessage>
            }
            {
                display === "Icon" &&
                <IconMessage >{message}</IconMessage>
            }
        </Grid>
    );
}

export default MessageField;
