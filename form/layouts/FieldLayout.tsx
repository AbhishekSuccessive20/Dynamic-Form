import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

import FieldManager from "../FieldManager";
import { WhenFieldChanges } from "../FormUtility";
import withFieldValues from "../withFieldValues";
import withFieldDependency from "../withFieldDependency";
import { AllValues, FieldSchema, MutatorsFunction } from "../types";
import isEmpty from "../../../utils/isEmpty";

export interface FieldBuilderProps {
    field: FieldSchema;
    disabled?: boolean;
    componentClasses?: Record<string, string>;
}

const FieldBuilder = (props: FieldBuilderProps): JSX.Element => {
    const { field, disabled, componentClasses } = props;
    const FieldComponent = FieldManager.getField(field.type);
    return (
        <FieldComponent
            name={field.name}
            label={field.label}
            options={field.options}
            separator={field.separator}
            dataWarning={field.dataWarning}
            helperText={field.helperText}
            display={field.display}
            message={field.message}
            type={field.type}
            defaultValue={field.defaultValue}
            placeholder={field.placeholder}
            disabled={field.disabled ? field.disabled : disabled}
            selectAllOption={field.selectAllOption}
            componentClasses={componentClasses}
        />
    );
}

const DependencyMapper = withFieldDependency(FieldBuilder);

const FieldValueMapper = withFieldValues(DependencyMapper);

interface FieldLayoutProps {
    schema: FieldSchema;
    mutatorsFn: MutatorsFunction;
    allValues: AllValues;
}

const defaultStyle = {
    marginBottom: "23.8px"
};


export function FieldLayout(props: FieldLayoutProps): JSX.Element {
    const { schema: field, mutatorsFn, allValues } = props;
    let size = field?.size;
    const fieldStyle = {
        root: { ...defaultStyle }
    }
    if (!isEmpty(field.style?.root)) {
        fieldStyle.root = { ...fieldStyle.root, ...field.style?.root }
    }
    const classes = makeStyles(fieldStyle)();

    if (isEmpty(field.size)) {
        size = {
            xs: 12,
            md: 12
        };
    }
    return (
        <>
            <Grid id={`${field.name}_container`} classes={{ root: classes.root }} item xs={size.xs} >
                <FieldValueMapper
                    field={field}
                    allValues={allValues}
                />
            </Grid>
            {
                field?.dependencies?.map((dependency, index) => (
                    <WhenFieldChanges
                        key={`${field.name}-${index}`}
                        field={dependency.field}
                        becomes={dependency.value}
                        set={field.name}
                        to={dependency.to}
                        setFieldData={mutatorsFn.setFieldData}
                        mode={dependency.mode}
                    />
                ))
            }
        </>
    );
}

export default FieldLayout;
