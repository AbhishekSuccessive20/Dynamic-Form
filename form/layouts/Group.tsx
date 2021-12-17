import React from "react";
import Grid from "@material-ui/core/Grid";

import { LayoutBuilder } from "./";
import { AllValues, BaseSchemaType, MutatorsFunction } from "../types";

interface GroupLayoutProps {
    schema: BaseSchemaType;
    mutatorsFn: MutatorsFunction;
    allValues: AllValues;
}

const GroupLayout = (props: GroupLayoutProps): JSX.Element => {
    const { schema, mutatorsFn, allValues } = props;

    return (
        <Grid container item spacing={2}>
            {schema.label && (
                <Grid item xs={12}>
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

export default GroupLayout;
