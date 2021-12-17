import React, { MouseEvent } from "react";
import { Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";

import { isEmpty } from "./utils";
import { FormProvider } from "./FormProvider";
import FormBuilder from "./FormBuilder";
import withDialog from "./withDialog";
import { FormSchema, TransformerType, CustomValidatorsType } from "./types";
import ValidatorSpy, { genericValidator } from "./ValidatorSpy";

export interface CloseRequestCallback {
    (): void;
}

export interface FormProps {
    context: { [key: string]: unknown };
    transformerObj: TransformerType;
    customValidators: CustomValidatorsType;
    initialState: Record<string, unknown>;
    onSubmit: (values: Record<string, unknown>) => unknown;
    queryResults: Record<string, unknown>;
    schema: FormSchema;
    isLoading: boolean;
    isOpen: boolean;
    isDialog: boolean;
    onCloseRequest: CloseRequestCallback;
}

// If form needs to open in a modal, wrapping a dialog on top of our form using HoC
const FormDialogMapper = withDialog(FormBuilder);

function Form(props: FormProps): JSX.Element {
    const {
        context,
        transformerObj,
        initialState,
        onSubmit,
        queryResults,
        customValidators,
        onCloseRequest,
        isOpen,
        isLoading,
        isDialog,
        schema
    } = props;

    // variable to keep the reference of form in helper functions
    let formRef = undefined;

    const isValidData = (fields, allValues, ) => {
        let isError = false;
        if(!isEmpty(fields)) {
            for ( const fieldName in fields) {
                const error = genericValidator(fields[fieldName], allValues[fieldName], customValidators, allValues);
                isError = isError || (error !== undefined);
                // setting error to specific field
                formRef.form.mutators.setFieldData(fieldName, { error, validating: false });
            }
        }
        return !isError;
    }

    // Dialog Submit Handler
    const handleAction = async (action: string, args: { autoClose: boolean; }) => {
        if (action === "btn:ok") {
            args.autoClose = false;
            const isValid = isValidData(schema.validations, formRef.values);
            if (isValid) {
                onSubmit?.(formRef.values);
            } else {
                formRef.handleSubmit();
            }
        }
    };

    // Normal Form Submit Handler
    const handleButtonSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
        const isValid = isValidData(schema.validations, formRef.values);
        if (isValid) {
            onSubmit?.(formRef.values);
        } else {
            formRef.handleSubmit();
        }
    }

    // Null Function to be consume by Final Form
    const handleFormSubmit = (): null => null;

    return (
        <FormProvider value={{
            "store": { ...context },
            "queryResults": { ...queryResults },
            "transformers": { ...transformerObj }
        }}>
            <FinalForm
                onSubmit={handleFormSubmit}
                handleAction={handleFormSubmit}
                initialValues={initialState}
                mutators={{ setFieldData }}
            >
                {
                    (formProps) => {
                        const { form, values } = formProps;
                        formRef = formProps;
                        return (
                            <>
                                {
                                    !isLoading &&
                                    <ValidatorSpy
                                        rules={schema.validations}
                                        customValidators={customValidators}
                                    />
                                }
                                <FormDialogMapper
                                    mutatorsFn={form.mutators}
                                    handleAction={handleAction}
                                    handleButtonSubmit={handleButtonSubmit}
                                    allValues={values}
                                    onCloseRequest={onCloseRequest}
                                    isOpen={isOpen}
                                    isLoading={isLoading}
                                    schema={schema}
                                    isDialog={isDialog}
                                />
                            </>
                        )
                    }
                }
            </FinalForm>
        </FormProvider>
    );
}

export default Form;
