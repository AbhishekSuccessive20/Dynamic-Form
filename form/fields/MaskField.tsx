import React from "react";
import {
    Grid,
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps
} from "@material-ui/core";
import { Field, FieldRenderProps } from "react-final-form";
import InputMask from "react-input-mask";

import { Error } from "../FormUtility";
import { TransformerObject } from "../utils";

export type TextFieldProps = Partial<Omit<MuiTextFieldProps, "type" | "onChange">> & {
    name: string;
    maskInput?: string;
    variant?: "standard" | "outlined" | "filled";
    size?: "medium" | "small" | "string";
    transformerObj?: TransformerObject;
};

type TextWrapperProps = FieldRenderProps<MuiTextFieldProps, HTMLElement>;

export function MaskFieldWrapper(props: TextWrapperProps): JSX.Element {

    const {
        input: { name, value, type, maskValue, onChange, ...restInput },
        meta,
        variant,
        size,
        required,
        fullWidth = true,
        tipText: helperText,
        label,
        ...rest
    } = props;

    const isError = Boolean(meta.data?.error) && meta.touched;
    return (
        <>
            <Grid item xs={2}>
                {label}
            </Grid>
            <Grid item xs={8}>
                <InputMask
                    mask={maskValue}
                    value={value}
                    disabled={false}
                    maskChar=" "
                    onChange={onChange}
                >
                    {() => (
                        <MuiTextField
                            fullWidth
                            helperText={helperText}
                            error={isError}
                            name={name}
                            value={value}
                            type={type}
                            required={required}
                            inputProps={{ required, ...restInput }}
                            variant={variant}
                            size={size}
                            {...rest}
                        />
                    )}
                </InputMask>
            </Grid>
            <Error name={name} />
        </>
    );
}

export default function MaskField(props: TextFieldProps): JSX.Element {
    const { name, maskInput, variant, size, ...rest } = props;
    return (
        <Field
            name={name}
            render={({ input, meta }) => (
                <MaskFieldWrapper
                    input={input}
                    meta={meta}
                    variant={variant}
                    size={size}
                    name={name}
                    maskValue={maskInput}
                    {...rest}
                />
            )}
        />
    );
}

MaskField.defaultProps = {
    maskInput: "(0)999 999 99 99",
    variant: "outlined",
    size: "small"
};
