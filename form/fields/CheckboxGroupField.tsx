import React, { ReactNode, useMemo } from "react";
import {
    Checkbox as MuiCheckbox,
    CheckboxProps as MuiCheckboxProps,
    FormControl,
    FormControlLabel,
    FormGroup
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field } from "react-final-form";

import { Error, FieldLabel } from "../FormUtility";
import { isEmpty } from "../utils";

const useStyles = makeStyles({
    labelClass: {
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "20px",
        color: "#444"
    },
});

export interface CheckboxData {
    label: ReactNode;
    value: unknown;
    disabled?: boolean;
    indeterminate?: boolean;
}

export interface CheckboxesProps extends Partial<Omit<MuiCheckboxProps, "onChange">> {
    name: string;
    label?: ReactNode;
    helperText?: string;
    disabled?: boolean;
    options?: CheckboxData[] | CheckboxData;
    componentClasses?: Record<string, string>;
}

export function CheckboxGroupField(props: CheckboxesProps): JSX.Element {
    const {
        label,
        options,
        name,
        helperText,
        color = "primary",
        size = "medium",
        disabled,
        componentClasses,
        ...restCheckboxes
    } = props;
    const { labelClass } = useStyles();

    const itemNodes = useMemo(() => {
        const itemsData = Array.isArray(options) ? options : [options];
        const single = Array.isArray(itemsData) ? false : true;
        return (
            itemsData.map((item: CheckboxData, idx: number) => (
                <FormControlLabel
                    id={`${name}_field${idx}`}
                    key={idx}
                    name={name}
                    label={item.label}
                    value={single ? undefined : item.value}
                    classes={{ label: labelClass }}
                    control={
                        <Field
                            type="checkbox"
                            name={name}
                            render={({ input: { name, value, onChange, onBlur, checked, ...restInput } }) => {
                                return (
                                    <MuiCheckbox
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            onBlur();
                                        }}
                                        checked={checked}
                                        inputProps={{ ...restInput }}
                                        indeterminate={item.indeterminate}
                                        {...restCheckboxes}
                                        color={color}
                                        size={size}
                                    />
                                )
                            }}
                        />
                    }
                />
            ))
        )
    }, [
        size,
        color,
        options,
        labelClass,
        name,
        restCheckboxes
    ]);

    return (
        <FormControl
            id={`${name}_container`}
            disabled={disabled}
        >
            {!isEmpty(label) ? <FieldLabel labelText={label} /> : <></>}
            <FormGroup>
                {itemNodes}
            </FormGroup>
            <Error name={name} />
        </FormControl>
    );
}

export default CheckboxGroupField;
