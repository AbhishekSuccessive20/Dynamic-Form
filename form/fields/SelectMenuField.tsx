import React from "react";
import { Field } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, MenuItem } from "@material-ui/core";

import { FieldLabel, Error, DataWarningMessage } from "../FormUtility";
import { isNilOrEmptyString } from "../../../utils/Utils";
import { isEmpty } from "../utils";
import { SelectData } from "./ChipSelect";

const useStyles = makeStyles({
    text: {
        width: "100%"
    },
    selectInput: {
        padding: "5px"
    },
    helperText: {
        textTransform: "none"
    }
});

export interface SelectOption {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    label: string | React.ReactNode;
}

export interface SelectFieldProps {
    options: SelectOption[];
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    variant?: "standard" | "outlined" | "filled";
    id?: string;
    helperText?: string;
    error?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = props => {
    const classes = useStyles();
    const { placeholder, id } = props;

    const placeholderItem = (
        <MenuItem id={`${id}_placeholder`} value="" disabled>
            {placeholder ?? "Select"}
        </MenuItem>
    );
    return (
        <TextField
            id={`select-field-${props.id ?? ""}`}
            select
            value={props.value}
            helperText={props.helperText}
            onChange={props.onChange}
            variant={props.variant ?? "outlined"}
            classes={{ root: classes.text }}
            InputProps={{ classes: { input: classes.selectInput }, error: props.error }}
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
            SelectProps={{
                displayEmpty: props.value ? false : true
            }}
        >
            {placeholderItem}
            {props.options.map((option, index) => (
                <MenuItem id={`${id}_menu_${index}`} key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export interface SelectMenuFieldProps {
    name: string;
    options: SelectOption[];
    helperText?: string;
    placeholder?: string;
    label: string;
    dataWarning?: {
        id: string;
        defaultMessage?: string;
    };
    display?: string;
    message?: string;
    defaultValue?: string;
    disabled?: boolean;
    componentClasses?: Record<string, string>;
    selectAllOption?: SelectData;
}

const SelectMenuField = (props: SelectMenuFieldProps): JSX.Element => {
    const { name, options, helperText, placeholder, label, defaultValue, dataWarning } = props;
    const fieldProps: { name: string; defaultValue?: string } = { name }

    if (!isNilOrEmptyString(defaultValue)) {
        fieldProps.defaultValue = defaultValue
    }

    return (
        <Field
            {...fieldProps}
        >
            {({ input }) => {
                return (
                    <>
                        <Grid item >
                            <FieldLabel id={`${name}_label`} labelText={label} />
                        </Grid>
                        <Grid item>
                            <SelectField
                                id={`${name}`}
                                options={options}
                                {...input}
                                helperText={helperText}
                                placeholder={placeholder}
                                value={
                                    (isNilOrEmptyString(input.value) && !isNilOrEmptyString(defaultValue))
                                        ? defaultValue : input.value
                                }
                            />
                        </Grid>
                        <Error name={name} />
                        {   !isEmpty(dataWarning) && (
                            <DataWarningMessage
                                message={dataWarning.defaultMessage}
                                data={options}
                            />
                        )
                        }
                    </>
                )
            }}
        </Field>
    );
}

export default SelectMenuField;
