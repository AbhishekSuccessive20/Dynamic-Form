import React from "react";
import { FieldLabel } from "../FormUtility";
import { Grid, Typography } from "@material-ui/core";
import { Field } from "react-final-form";

export type SeparatorTextProps = {
    label: string;
    options?: {
        value: string;
        label: string;
    }[];
    separator: string;
    name: string;
}

const SeparatorText = (props: SeparatorTextProps): JSX.Element => {
    const { label, options, name, separator } = props;

    return (
        <Grid >
            <Field
                name={name}
                component="input"
                type="hidden"
                defaultValue={options?.map(item => item.value)}
            />
            <FieldLabel id={`${name}_label`} labelText={label} />
            <Typography variant="body2">
                {options?.map(item => item.label)?.join(separator)}
            </Typography>
        </Grid>
    );
}

export default SeparatorText;
