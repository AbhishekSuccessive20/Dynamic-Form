import React from "react";
import { Field, FieldRenderProps } from "react-final-form";
import {
    Grid,
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps,
} from "@material-ui/core";

import { Error, FieldLabel } from "../FormUtility";
import { TransformerObject } from "../utils";
import { FieldType } from "../FieldManager";

export const TYPE_PASSWORD = "password";
export const TYPE_TEXT = "text";
export const TYPE_EMAIL = "email";
export const TYPE_NUMBER = "number";
export const TYPE_URL = "url";
export const TYPE_TELEPHONE = "tel";
export const TYPE_DATE = "date";
export const TYPE_DATETIME_LOCAL = "datetime-local";
export const TYPE_MONTH = "month";
export const TYPE_TIME = "time";
export const TYPE_WEEK = "week";

// Restricts the type values to 'password', 'text', 'email', 'number', and 'url'.
export type TEXT_FIELD_TYPE =
    | typeof TYPE_PASSWORD
    | typeof TYPE_TEXT
    | typeof TYPE_EMAIL
    | typeof TYPE_NUMBER
    | typeof TYPE_URL
    | typeof TYPE_TELEPHONE
    | typeof TYPE_DATE
    | typeof TYPE_DATETIME_LOCAL
    | typeof TYPE_MONTH
    | typeof TYPE_TIME
    | typeof TYPE_WEEK;

export type TextFieldProps = Partial<Omit<MuiTextFieldProps, "type" | "onChange">> & {
    name: string;
    variant?: "standard" | "outlined" | "filled";
    size?: "medium" | "small" | "string";
    type?: FieldType;
    textType?: TEXT_FIELD_TYPE;
    transformerObj?: TransformerObject;
};

type TextWrapperProps = FieldRenderProps<MuiTextFieldProps, HTMLElement>;

function TextFieldWrapper(props: TextWrapperProps): JSX.Element {
    const {
        input: { name, value, type, onChange, ...restInput },
        meta,
        required,
        fullWidth = true,
        tipText: helperText,
        label,
        variant,
        size,
        ...rest
    } = props;

    const isError = Boolean(meta.data?.error) && meta.touched;
    return (
        <>
            <FieldLabel id={`${name}_label`} labelText={label} />
            <Grid item>
                <MuiTextField
                    id={`${name}_field`}
                    fullWidth
                    helperText={helperText}
                    error={isError}
                    onChange={onChange}
                    name={name}
                    value={value}
                    type={type}
                    required={required}
                    inputProps={{ required, ...restInput }}
                    variant={variant}
                    size={size}
                    {...rest}
                />
            </Grid>
            <Error name={name} />
        </>
    );
}

export default function TextField(props: TextFieldProps): JSX.Element {
    const { name, type, variant, size, ...rest } = props;

    return (
        <Field
            name={name}
            type={type}
            render={({ input, meta }) => (
                <TextFieldWrapper
                    input={input}
                    meta={meta}
                    name={name}
                    type={type}
                    variant={variant}
                    size={size}
                    {...rest}
                />
            )}
        />
    );
}

TextField.defaultProps = {
    variant: "outlined",
    size: "small"
};
