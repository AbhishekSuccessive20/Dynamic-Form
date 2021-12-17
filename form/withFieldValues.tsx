import React, { useContext } from "react";

import FormContext from "./FormProvider";
import { FieldBuilderProps } from "./layouts";
import { Option, FieldSchema, AllValues, MutatorsFunction } from "./types";
import { isEmpty, isNil } from "./utils";

interface FieldLayoutSchema {
    field?: FieldSchema;
    mutatorsFn?: MutatorsFunction;
    allValues?: AllValues;
    componentClasses?: Record<string, string>
}

type ComponentType = (props: FieldLayoutSchema) => JSX.Element;

const withFieldValues = (WrappedComponent: React.ComponentType<FieldBuilderProps>): ComponentType => {
    const Component = (props: FieldLayoutSchema): JSX.Element => {
        const FormStore = useContext(FormContext);

        if (isEmpty(props.field.dataOptions)) {
            return <WrappedComponent {...props} field={props.field} />;
        }

        const { store, queryResults, transformers } = FormStore;
        const { field } = props;
        const definition = { ...field };
        const { type, dataOptions: { store: storeKey, query: queryKey, transformer: transformerKey } } = field;

        const DynamicTypes = ["select", "checkbox", "chipSelect", "message", "separator"];

        if ((queryKey || storeKey) && DynamicTypes.includes(type)) {
            const dynamicData = storeKey ? store[storeKey] : queryResults[queryKey]?.["data"];
            if (isNil(transformerKey)) {
                definition.options = dynamicData;
            } else {
                const transformData = transformers[transformerKey](dynamicData) as Option[] | string;
                if (type === "message") {
                    definition.message = transformData as string;
                } else {
                    definition.options = transformData as Option[];
                }
            }
        }

        if (definition?.defaultSelection && isNil(definition.defaultValue)) {
            definition.defaultValue
                = definition.options?.[0]?.value;
        }
        return <WrappedComponent {...props} field={definition} />;
    };
    return Component;
};

export default withFieldValues;
