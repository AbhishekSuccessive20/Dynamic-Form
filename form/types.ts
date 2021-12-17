import { FilterState } from "../../state-manager/redux-types";
import { GridSize } from "@material-ui/core";

import { FieldType } from "./FieldManager";
import { SelectOption } from "../input/SelectField";
import { SelectData } from "./fields/ChipSelect";

export type TransformerType = { [key: string]: (...args: unknown[]) => unknown };

export type CustomValidatorsType = { [key: string]: (...args: unknown[]) => undefined | string };

export enum FormLayout {
    PAGE = "page",
    SECTION = "section",
    GROUP = "group",
    FIELD = "field",
}

export type AllValues = Record<string, unknown>;

export interface Options extends SelectOption {
    id?: string;
    text?: string;
    name?: string;
}

export type FieldValue = unknown | unknown[];

export interface Option {
    value: string;
    label: string;
}

export type QueryRequest = {
    queryId: string;
    transformHandler?: string;
};

export interface GroupSchema {
    name?: string;
    title?: string;
    layout: string;
    properties?: FieldSchema[];
}

export interface SectionSchema {
    name?: string;
    title?: string;
    layout: string;
    properties?: GroupSchema[] | FieldSchema[];
}

export interface PageSchema {
    name?: string;
    title?: string;
    layout: string;
    properties: SectionSchema[] | GroupSchema[] | FieldSchema[];
}

export interface FormSchema {
    id: string;
    category?: string;
    title: string;
    queries?: QueryRequest[];
    properties: PageSchema[] | SectionSchema[] | GroupSchema[] | FieldSchema[];
    validations: {
        [key: string]: Rule[];
    }
}

export type ResolveSchema = FormSchema
    | PageSchema
    | GroupSchema
    | SectionSchema
    | FieldSchema

export interface BaseSchemaType {
    add?: Record<string, unknown>;
    edit?: Record<string, unknown>;
    layout?: string;
    name?: string;
    label?: string;
    category?: string;
    type?: FieldType;
    id?: string;
    filters?: FilterState;
    title?: string;
    display?: string,
    dataOptions?: {
        transformer?: string;
        query?: string;
        store?: string;
    };
    value?: string;
    queries?: QueryRequest[];
    properties?: BaseSchemaType[];
}

export type Rule = {
    type: string;
    message: string;
    when?: {
        [key: string]: string;
    },
}

export interface FieldSchema {
    add?: Record<string, unknown>;
    edit?: Record<string, unknown>;
    layout?: string;
    name?: string;
    dataWarning?: {
        id: string;
        defaultMessage?: string;
    };
    label?: string;
    separator?: string;
    textType?: string;
    type?: FieldType;
    validator?: Rule[];
    id?: string;
    options?: Option[];
    display?: string;
    size?: { [key: string]: GridSize | boolean };
    dataOptions?: {
        transformer?: string;
        query?: string;
        store?: string;
    };
    defaultSelection?: boolean;
    defaultValue?: string;
    message?: string;
    dependencies?: {
        field: string,
        value: string,
        to: unknown,
        mode: string
    }[]
    helperText?: string;
    disabled?: boolean;
    placeholder?: string;
    selectAllOption?: SelectData;
    style?: {
        root?: {
            [key: string]: string | number;
        };
        component
        ?: {
            [key: string]: string | number;
        };
    }
}

export interface CustomRule {
    name: string;
    message: string;
}

export interface EnableCondition {
    name: string;
    value: string;
    operator: string;
}

export type Mutator = (...args: unknown[]) => unknown

export interface MutatorsFunction {
    [key: string]: Mutator;
}
