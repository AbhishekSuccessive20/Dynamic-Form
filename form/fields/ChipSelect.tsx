import React, { ReactNode } from "react";

import { Field } from "react-final-form";
import MultiChipSelect from "../../filter-picker/MultiChipSelect";

export interface SelectData {
    id?: number | string;
    label?: ReactNode | string;
    value?: number | string;
    rightLabel?: unknown;
    disabled?: boolean;
    indeterminate?: boolean;
}

export interface ChipSelectProps {
    name: string;
    label?: ReactNode;
    helperText?: string;
    disabled?: boolean;
    options?: SelectData[];
    componentClasses?: Record<string, string>;
    selectAllOption?: SelectData;
}

const ChipSelectField = (props: ChipSelectProps): JSX.Element => {
    const { name, options, selectAllOption } = props;
    return (
        <Field
            name={name}
        >
            {() => {
                return (
                    <Field
                        name={name}
                        type={"select"}
                        render={({ input }) => (
                            <MultiChipSelect
                                {...input}
                                options={options}
                                name={name}
                                selectAllOption= {selectAllOption}
                            />
                        )}
                    />
                )
            }}
        </Field>
    );
}

export default ChipSelectField
