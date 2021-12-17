import React from "react";
import { Field, FieldRenderProps } from "react-final-form";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Error, FieldLabel } from "../FormUtility";

const useStyles = makeStyles({

    label: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "20px",
        color: "#444"
    },
});
export interface RadioOption {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    label: string | React.ReactNode;
}

export interface RadioFieldProps {
    options: RadioOption[];
    value?: string;
    placeholder?: string;
    variant?: "standard" | "outlined" | "filled";
    id?: string;
    helperText?: string;
    error?: boolean;
    name?: string;
    label?: string;
    separator?:string;
}

interface RadioWrapperProps {
    options: RadioOption[];
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    helperText?: string;
    error?: boolean;
    name: string;
    label: string;
}

const RadioWrapper = (props: FieldRenderProps<RadioWrapperProps>): JSX.Element => {
    const {
        input: { checked, value, name, onChange, onBlur, ...restInput },
        meta,
        ...rest
    } = props;

    const onChangeMethod = (event) => {
        onChange(event);
        onBlur(event);
    }

    return (
        <Radio
            {...rest}
            name={name}
            inputProps={restInput}
            onChange={onChangeMethod}
            checked={checked}
            value={value}
            color="primary"
        />
    );
}

const RadioGroupField = (props: RadioFieldProps): JSX.Element => {
    const { label } = useStyles();
    const { name, options, label: labelText } = props;
    return (
        <>
            <FormControl component="fieldset">
                <FieldLabel
                    id={`${name}_label`}
                    labelText={labelText}
                />
                <RadioGroup
                    id={`${name}_container`}
                    aria-label={name}
                    name={name}
                >
                    {
                        options?.map((option, ind) => {
                            const labelItem = (<span id={`${name}_${option.label}_label`} >{option.label}</span>)
                            return (
                                <FormControlLabel
                                    id={`${name}_item_${option.value}`}
                                    value={option.value}
                                    key={`${option.value}${ind}`}
                                    control={<Field
                                        name={name}
                                        component={RadioWrapper}
                                        type="radio"
                                        value={option.value}
                                    />}
                                    classes={{ label }}
                                    label={labelItem}
                                />
                            );
                        })
                    }
                </RadioGroup>
            </FormControl>
            <Error name={name} />
        </>
    );
}

export default RadioGroupField;
