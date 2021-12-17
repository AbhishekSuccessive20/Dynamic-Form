import React, { MouseEvent } from "react";
import { makeStyles, Grid, Button } from "@material-ui/core";

import { LayoutBuilder } from "./layouts";
import { BaseSchemaType, MutatorsFunction } from "./types";

enum Color {
    inherit= "inherit", primary="primary", secondary="secondary", default="default"
}

enum Variant {
    contained= "contained", outlined="outlined", text="text"
}

enum Size {
    small= "small", medium="medium", large="large"
}

export interface FormBuilderProps {
    schema: BaseSchemaType;
    mutatorsFn: MutatorsFunction;
    submitText?: string;
    color?: Color;
    variant?: Variant;
    size?: Size;
    allValues: Record<string, unknown>;
    isDialog?: boolean;
    handleAction?: (event: MouseEvent<HTMLButtonElement>) => null;
    handleButtonSubmit?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    addUserButton: {
        textTransform: "none",
        color: "#FFFFFF",
        backgroundColor: "#2686CB",
    },
});

// Rendering complete form & appending submit button, if it is a plain form
function FormBuilder(props: FormBuilderProps): JSX.Element {
    const {
        schema,
        mutatorsFn,
        allValues,
        isDialog,
        color,
        variant,
        size,
        submitText,
        handleButtonSubmit
    } = props;

    const classes = useStyles();

    return (
        <Grid container className={classes.root} >
            <LayoutBuilder
                schema={schema}
                mutatorsFn={mutatorsFn}
                allValues={allValues}
            />
            { isDialog === false &&
                <Grid item >
                    <Button
                        className={classes.addUserButton}
                        color={color}
                        variant={variant}
                        size={size}
                        onClick={handleButtonSubmit}
                    >
                        {submitText}
                    </Button>
                </Grid>
            }
        </Grid>
    );
}

FormBuilder.defaultProps = {
    variant: Variant.contained,
    size: Size.medium,
    color: Color.primary,
    submitText: "Submit Button"
}

export default FormBuilder;
