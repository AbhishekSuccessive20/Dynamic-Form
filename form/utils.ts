import { ReactNode } from "react";
import TranslateFn from "../../i18n/translate";

import { FormSchema, ResolveSchema } from "./";

export function isNil(value: unknown): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return value === undefined || value === null || Number.isNaN(value as any);
}

export function isNilOrEmptyString(value: unknown): boolean {
    return isNil(value) || value === "";
}

export const isObj = (variable: unknown): boolean => (typeof variable === "object" && variable !== null);

export function isEmpty(variable: unknown): boolean {
    if (variable === undefined || variable === null) {
        return true;
    }
    if (isObj(variable)) {
        return Object.keys(variable).length === 0;
    }
    if (Array.isArray(variable)) {
        return variable.length === 0;
    }
    if (typeof variable === "string") {
        return variable === "";
    }
    return false;
}

export interface TransformerData {
    label: ReactNode;
    value: unknown;
    disabled?: boolean;
    indeterminate?: boolean;
}

export type TransformerObject = { [key: string]: (params: unknown) => unknown }

// eslint-disable-next-line @typescript-eslint/ban-types
export function evaluateExpression(code: string): Function {
    "use strict";
    return (new Function(`return (
        ${code}
        );`))();
}

const getTranslation = (id) => !isNilOrEmptyString(id) ? TranslateFn.getInstance().formatMessage({ id }) : id;

const translatedSchema = (schema, definitionType) => {
    const schemaTranslate = { ...schema };

    switch (definitionType) {
    case "root":
    case "page":
    case "section":
    case "group":
        schemaTranslate.title = getTranslation(schemaTranslate.title);
        break;
    case "field":
        schemaTranslate.message = getTranslation(schemaTranslate.message);
        schemaTranslate.label = getTranslation(schemaTranslate.label);
        schemaTranslate.placeholder = getTranslation(schemaTranslate.placeholder);
        schemaTranslate.helperText = getTranslation(schemaTranslate.helperText);
        if (!isEmpty(schemaTranslate.validator)) {
            schemaTranslate.validator.forEach((validation, index) => {
                schemaTranslate.validator[index].message = getTranslation(validation.message)
            })
        }
        if (!isEmpty(schemaTranslate.options)) {
            schemaTranslate.options.forEach((option, index) => {
                schemaTranslate.options[index].label = getTranslation(option.label)
            })
        }
        if (!isEmpty(schemaTranslate.dataWarning)) {
            const translatedValue = getTranslation(schemaTranslate.dataWarning.id);
            if (translatedValue !== schemaTranslate.dataWarning.id
                || isEmpty(schemaTranslate.dataWarning.defaultMessage)
            ) {
                schemaTranslate.dataWarning.defaultMessage = translatedValue;
            }
        }
        break;
    }
    return schemaTranslate;
}

/**
 * Returns simplified FormSchema that is placing all the required details at the top.
 *
 * @param {FormSchema} schema Schema to simplify.
 * @param {boolean} isAdd to tell the mode for schema need to be simplify.
 * @param {TransformerObject} transformerObj for transforming the data as per the field's need .
 * @return {FormSchema} simplified schema.
 */
export function transformDefinition(
    schema: FormSchema,
    isAdd: boolean,
    transformerObj: TransformerObject
): FormSchema {
    let queries = [];
    const validations = {};

    /**
     * Returns simplified FormSchema that is placing all the required details at the top by
     * recursively calling the properties array on each level.
     *
     * @param {FormSchema} schema Schema to simplify.
     * @param {boolean} isAdd to tell the mode for schema need to be simplify.
     * @param {TransformerObject} transformerObj for transforming the data as per the field's need .
     * @return {FormSchema} simplified schema.
     */
    const serializer = (
        schema: ResolveSchema,
        isAdd: boolean,
        transformerObj: TransformerObject
    ): ResolveSchema => {
        // serializing add/edit values
        let def = { ...schema };
        if (isAdd) {
            def = { ...schema, ...schema?.["add"] };
        } else {
            def = { ...schema, ...schema?.["edit"] };
        }

        delete def?.["add"];
        delete def?.["edit"];

        // collecting all the queries that will be call to fetch the data
        // & validation to be apply once the form will be creat
        if (schema?.["layout"] === "field") {
            const fieldQuery = getFormQueries(def);
            if (!isEmpty(fieldQuery) && queries.indexOf(fieldQuery) === -1) {
                queries = [...queries, fieldQuery]
            }
            if (!isEmpty(def?.["validator"])) {
                validations[def?.["name"]] = def?.["validator"]
            }
        }

        def = translatedSchema(def, def?.["layout"]);

        if (!isEmpty(schema?.["properties"])) {
            return {
                ...def,
                properties: schema?.["properties"].map((properties) =>
                    serializer(properties, isAdd, transformerObj))
            };
        } else {
            return { ...def };
        }
    }
    const updatedSchema = serializer(
        translatedSchema(schema, "root"),
        isAdd,
        transformerObj
    );
    return {
        ...updatedSchema,
        queries: queries.map((item) => ({
            "queryId": item
        })),
        validations: validations
    } as unknown as FormSchema;
}

export function getFormQueries(schema: ResolveSchema): string | null {
    if (!isEmpty(schema?.["dataOptions"]) && !isEmpty(schema?.["dataOptions"]?.query)) {
        return schema?.["dataOptions"].query;
    }
    return null;
}
