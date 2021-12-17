import React, { useContext } from "react";

const FormContext = React.createContext({
    "store": undefined,
    "queryResults": undefined,
    "transformers": undefined,
});

FormContext.displayName = "FormContext";

export const FormProvider = FormContext.Provider
export const FormConsumer = FormContext.Consumer

export type FormContextProps = {
    store: Record<string, unknown>;
    queryResults: Record<string, unknown>;
    transformers: Record<string, unknown>;
}

export function useFormContext(): FormContextProps {
    return useContext(FormContext)
}

export default FormContext;
