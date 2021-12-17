import React from "react";

import { LayoutBuilder } from "./";
import { AllValues, BaseSchemaType, MutatorsFunction } from "../types";

interface PageLayoutProps {
    schema: BaseSchemaType;
    mutatorsFn: MutatorsFunction;
    allValues: AllValues;
}

const PageLayout = (props: PageLayoutProps): JSX.Element => {
    const { schema, mutatorsFn, allValues } = props;

    return (
        <LayoutBuilder
            schema={schema}
            mutatorsFn={mutatorsFn}
            allValues={allValues}
        />
    );
};

export default PageLayout;
