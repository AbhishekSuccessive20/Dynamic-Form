import React from "react";

import FieldLayout from "./FieldLayout";
import {
    BaseSchemaType,
    FieldSchema,
    FormLayout,
    MutatorsFunction,
    AllValues
} from "../types";
import GroupLayout from "./Group";
import SectionLayout from "./Section";
import PageLayout from "./Page";

interface LayoutBuilderProps {
    schema: BaseSchemaType;
    mutatorsFn: MutatorsFunction;
    allValues: AllValues;
}

interface FormComponentsProps {
    schema: BaseSchemaType;
    mutatorsFn: MutatorsFunction;
    allValues: AllValues;
}

// FormComponent is the manager to return the actual layout based on the property
const FormComponents = (props: FormComponentsProps): JSX.Element => {
    const { schema, mutatorsFn, allValues } = props;

    switch (schema.layout) {
    case FormLayout.GROUP:
        return (
            <GroupLayout
                schema={schema}
                mutatorsFn={mutatorsFn}
                allValues={allValues}
            />
        )
    case FormLayout.SECTION:
        return (
            <SectionLayout
                schema={schema}
                mutatorsFn={mutatorsFn}
                allValues={allValues}
            />
        )
    case FormLayout.PAGE:
        return (
            <PageLayout
                schema={schema}
                mutatorsFn={mutatorsFn}
                allValues={allValues}
            />
        )
    case FormLayout.FIELD:
        return (
            <FieldLayout
                schema={schema as unknown as FieldSchema}
                mutatorsFn={mutatorsFn}
                allValues={allValues}
            />
        )
    }
}

// LayoutBuilder for creating Fields of Form components
const LayoutBuilder = (props: LayoutBuilderProps): JSX.Element => {
    const { schema, mutatorsFn, allValues } = props;
    return (
        <>
            {
                schema.properties.map((subSchema, index) => (
                    <FormComponents
                        key={`${schema.id}-${index}`}
                        schema={subSchema}
                        mutatorsFn={mutatorsFn}
                        allValues={allValues}
                    />
                ))
            }
        </>
    );
}

export default LayoutBuilder;
