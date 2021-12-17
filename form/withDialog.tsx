
import React, { MouseEvent } from "react";
import { makeStyles } from "@material-ui/core";

import { Dialog } from "../Dialog";
import { FormSchema, MutatorsFunction, AllValues } from "./types";
import { FormBuilderProps } from "./FormBuilder";

const useStyles = makeStyles({
    actionBtn: {
        textTransform: "none",
        color: "#FFFFFF",
        backgroundColor: "#2686CB",
    },
    cancelBtn: {
        textTransform: "none",
        color: "#2686CB",
        backgroundColor: "#FFFFFF",
    },
})

interface ActionArgs {
    autoClose: boolean;
}

interface OnActionCallback {
    (action: string, args: ActionArgs): void;
}

export interface CloseRequestCallback {
    (): void;
}

type DialogType = {
    isLoading: boolean;
    schema: FormSchema;
    isOpen: boolean;
    isDialog: boolean;
    mutatorsFn?: MutatorsFunction;
    allValues: AllValues;
    handleAction: OnActionCallback;
    onCloseRequest: CloseRequestCallback;
    handleButtonSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}

type ComponentType = (props: DialogType) => JSX.Element;

const withDialog = (WrappedComponent: React.ComponentType<FormBuilderProps>): ComponentType => {
    const Component = (props: DialogType): JSX.Element => {

        const {
            actionBtn,
            cancelBtn,
        } = useStyles();

        const {
            handleAction,
            schema,
            isLoading,
            isOpen,
            isDialog,
            onCloseRequest,
            mutatorsFn,
            allValues,
            handleButtonSubmit
        } = props;

        if (!isDialog) {
            // if no dialog, wait for loading and send the plain form component
            return isLoading ?
                <div id="loading" >Loading...</div>
                :
                (
                    <WrappedComponent
                        schema={schema}
                        mutatorsFn={mutatorsFn}
                        allValues={allValues}
                        isDialog={false}
                        handleButtonSubmit={handleButtonSubmit}
                    />
                )
        }

        if (!isOpen) {
            return null;
        }
        return (
            <Dialog
                {...props}
                open={isOpen}
                title={isLoading ? "" : schema?.title }
                onAction={handleAction}
                onCloseRequest={onCloseRequest}
                actionBtnClass={actionBtn}
                cancelBtnClass={cancelBtn}
                btnOkText={"Submit"}
            >
                {
                    isLoading ?
                        <div id="loading" >Loading...</div>
                        :
                        (
                            <WrappedComponent
                                schema={schema}
                                mutatorsFn={mutatorsFn}
                                allValues={allValues}
                            />
                        )
                }
            </Dialog>
        )
    };
    return Component;
};

export default withDialog;
