
import React from "react";
import { Field } from "react-final-form";
import { FieldBuilderProps } from "./layouts";

import { FieldSchema, AllValues } from "./types";

interface FieldLayoutSchema {
    field: FieldSchema;
    allValues?: AllValues;
}

type ComponentType = (props: FieldLayoutSchema) => JSX.Element;

const withFieldDependency = (WrappedComponent: React.ComponentType<FieldBuilderProps>): ComponentType => {
    const Component = (props: FieldLayoutSchema): JSX.Element => {
        const { field } = props;
        return (
            <Field name={field.name} subscription={{ data: true }}>
                {
                    ({ meta }) => (meta?.data?.hide !== true || meta?.data?.hide !== "true") && (
                        <WrappedComponent {...props} disabled={meta?.data?.disabled} />
                    )
                }
            </Field>
        )
    };
    return Component;
};

export default withFieldDependency;
