import React, { useEffect } from "react";
import { Field, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { OnChange } from "react-final-form-listeners";
import { FormLabel } from "@material-ui/core";

import { evaluateExpression } from "./utils";
import { AllValues, Mutator } from "./types";
import WarningTriangle from "../icons/WarningTriangle";

const useStyles = makeStyles({
    error: {
        color: "#b83833",
        fontSize: "12px",
    },
    title: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        lineHeight: "20px",
        color: "#444"
    },
    warning: {
        fontSize: "12px",
        color: "rgba(0, 0, 0, 0.54)"
    }
})

const isCriteriaMatch = (value, becomes): boolean => {
    if (Array.isArray(becomes)) {
        return becomes.includes(value);
    }
    try {
        return evaluateExpression(becomes)(value);
    } catch (e) {
        return value === becomes;
    }
}

export type DependencyProps = {
    field: string;
    becomes: string;
    set: string;
    to: unknown;
    mode: string;
    setFieldData: Mutator;
}

export interface ChangeSpyRenderProps extends DependencyProps {
    values: AllValues;
    onChange: (e: string | unknown) => void;
}

export const ChangeSpyRender = (props: ChangeSpyRenderProps): JSX.Element => {
    const { values, setFieldData, mode, to, becomes, field, set, onChange } = props;

    useEffect(() => {
        const isCriteria = isCriteriaMatch(values?.[field], becomes)
        switch (mode) {
        case "enable":
            setFieldData(set, { disabled: !isCriteria })
            break;
        case "show":
            setFieldData(set, { hide: false })
            break;
        }
    });

    return (
        <OnChange name={field}>
            {value => {
                const isCriteria = isCriteriaMatch(value, becomes)
                switch (mode) {
                case "enable":
                    setFieldData(set, { disabled: !isCriteria })
                    if (!isCriteria) {
                        onChange(to);
                    }
                    break;
                case "show":
                    setFieldData(set, { hide: false })
                    break;
                }
                return <></>
            }}
        </OnChange>
    )
}
export const WhenFieldChanges = (props: DependencyProps): JSX.Element => (
    <Field name={props.set} subscription={{}}>
        {(
            // No subscription. We only use Field to get to the change function
            { input: { onChange } }
        ) => (
            <FormSpy subscription={{ values: true }}>
                {({ values }) => {
                    return (
                        <ChangeSpyRender
                            {...props}
                            values={values}
                            onChange={onChange}
                        />
                    )
                }}
            </FormSpy>
        )}
    </Field>
);

type ToolTipProps = {
    description: string;
    children: React.ReactElement;
}

export const ToolTipWrapper = (props: ToolTipProps): JSX.Element => {
    const useStyle = makeStyles({
        infoIconStyle: {
            position: "relative",
            marginLeft: "6px",
            top: "2px"
        },
        displayInline: {
            display: "inline-block"
        },
        tooltip: {
            background: "black",
            fontSize: "11px"
        },
        arrow: {
            color: "black"
        }
    });
    const classes = useStyle();
    return (
        <Tooltip
            title={props.description}
            arrow
            placement="bottom"
            classes={{
                tooltip: classes.tooltip,
                arrow: classes.arrow
            }}
        >
            {props.children}
        </Tooltip>
    );
}

type ErrorProps = {
    name: string;
}

export const Error = ({ name }: ErrorProps): JSX.Element => {
    const { error } = useStyles();
    return (
        <Field
            id={`${name}_error_container`}
            name={name}
            subscription={{ data: true }}
            render={({ meta: { data } }) => {
                return data?.error !== undefined
                    ? <div className={error} id={`${name}_error`} >{data.error}</div>
                    : null;
            }
            }
        />
    )
};

type FieldLabelProps = {
    labelText: string | number | React.ReactNode;
    id?: string;
}

export const FieldLabel = (props: FieldLabelProps): JSX.Element => {
    const { labelText, id } = props;
    const { title } = useStyles();
    return (
        <FormLabel
            id={id}
            component="legend"
            classes={{ root: title }}
        >
            {labelText}
        </FormLabel>
    )
};

type DataWarningProps = {
    data: unknown[];
    message?: string;
}

export const DataWarningMessage = (props: DataWarningProps): JSX.Element => {
    const { data, message } = props;
    const { warning } = useStyles();

    const shouldShowWarning = !Array.isArray(data) || data.length === 0;
    return (
        shouldShowWarning && (
            <p className={warning}>
                <WarningTriangle />{message}
            </p>
        )
    )
};
