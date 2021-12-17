import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

import { LayoutBuilder } from "./";
import { AllValues, BaseSchemaType, MutatorsFunction } from "../types";

const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: 0
    },
    label: {
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        color: "#000000",
        fontWeight: 600,
    }
});

interface SectionLayoutProps {
    schema: BaseSchemaType;
    mutatorsFn: MutatorsFunction;
    allValues: AllValues;
}

const SectionLayout = (props: SectionLayoutProps): JSX.Element => {
    const classes = useStyles();
    const { schema, mutatorsFn, allValues } = props;

    return (
        <Grid container item classes={{ root: classes.root }}>
            {schema.label && (
                <Grid item xs={12} classes={{ root: classes.label }}>
                    {schema.label}
                </Grid>
            )}
            <LayoutBuilder
                schema={schema}
                mutatorsFn={mutatorsFn}
                allValues={allValues}
            />
        </Grid>
    );
}

export default SectionLayout;
