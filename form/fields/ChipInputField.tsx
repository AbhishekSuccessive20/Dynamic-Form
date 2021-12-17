import React from "react";
import { Field } from "react-final-form";
import ChipInput from "material-ui-chip-input";
import { makeStyles } from "@material-ui/core/styles";

import { isNil } from "../utils";
import { Error, FieldLabel } from "../FormUtility";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles({
    text: {
        width: "100%",
    },
    inputExclamation: {
        "&:after": {
            content: "\"❗\"",
            backgroundColor: "#da4747",
            color: "transparent",
            textShadow: "0 0 0 white",
            fontSize: "10px",
            width: "18px",
            height: "18px",
            padding: "0 0 0 3px",
            borderRadius: "9px",
        }
    },
    chip: {
        height: "30px",
        margin: "4px 3px 0 3px",
        backgroundColor: "#ececec",
    },
    empty: {
    },
    inputCheck: {
        "&:after": {
            content: "\"✔️\"",
            backgroundColor: "#31aa35",
            color: "transparent",
            textShadow: "0 0 0 white",
            fontSize: "10px",
            width: "18px",
            height: "18px",
            padding: "0 0 0 3px",
            borderRadius: "9px",
        }
    },
    inputChip: {
        border: "1px solid #DBDBDB",
        borderRadius: "4px",
        padding: "0 6px",
    },
});

export interface ChipInputProps {
    value?: string;
    placeholder?: string;
    variant?: "standard" | "outlined" | "filled";
    id?: string;
    helperText?: string;
    error?: boolean;
    disabled?: boolean;
    name?: string;
    label?: string;
}

// Custom chip renderer to have custom design for the Chip
const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => (
    <Chip
        id={`${chip}_${key}`}
        className={className}
        key={key}
        label={chip}
        onClick={handleClick}
        onDelete={handleDelete}
    />
);

const ChipInputField = (props: ChipInputProps): JSX.Element => {
    const {
        inputExclamation,
        empty,
        inputCheck,
        chip,
        inputChip,
    } = useStyles();
    const { disabled, helperText, label, name } = props;
    return (
        <Field
            name={name}
        >
            {
                ({ input, meta }) => {
                    const showError = Boolean(meta?.data?.error);
                    const rootClass = showError === true ? inputExclamation :
                        (isNil(input.value) || input.value.length === 0) ?
                            empty : inputCheck

                    return (
                        <>
                            <FieldLabel id={`${name}_label`} labelText={label} />
                            <ChipInput
                                id={`${name}_field`}
                                classes={{
                                    root: inputChip,
                                    chip,
                                    inputRoot: rootClass
                                }}
                                onBlur={input.onBlur}
                                onFocus={input.onFocus}
                                onChange={input.onChange}
                                disabled={disabled}
                                disableUnderline={true}
                                fullWidth={true}
                                newChipKeyCodes={[32]}
                                blurBehavior="add"
                                helperText={helperText}
                                chipRenderer={chipRenderer}
                            />
                            <Error name={name} />
                        </>
                    )
                }
            }
        </Field>
    );
}

export default ChipInputField;
