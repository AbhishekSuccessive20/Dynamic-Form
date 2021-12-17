import React, { ReactNode } from "react";
import {
    Switch as MUISwitch,
    SwitchProps as MuiSwitchProps,
    FormControlProps,
    FormControlLabel,
    FormControlLabelProps,
    FormGroup,
    FormGroupProps,
    FormHelperTextProps,
    FormLabelProps,
    Grid
} from "@material-ui/core";
import { withStyles, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Field } from "react-final-form";

import { FieldLabel } from "../FormUtility";
import { SwitchIcon } from "../images"

const useStyles = makeStyles({
    labelColor: {
        color: "#A3A3A3"
    },
    selectedLabelColor: {
        color: "#006FCC"
    }
})

const Switch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 30,
            height: 16,
            padding: 0,
            display: "flex",
        },
        switchBase: {
            padding: 2,
            color: theme.palette.common.white,
            "&$checked": {
                transform: "translateX(16px)",
                color: theme.palette.common.white,
                "& + $track": {
                    opacity: 1,
                    backgroundColor: "#006FCC",
                    borderColor: "#006FCC",
                },
            },
        },
        thumb: {
            width: 13,
            height: 13,
            boxShadow: "none",
            backgroundColor: "#fff",
            backgroundImage: "url(\"" + `${SwitchIcon}` + "\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        },
        track: {
            border: "1px solid #006FCC",
            borderRadius: 14 / 2,
            opacity: 1,
            backgroundColor: "#006FCC",
        },
        checked: {},
    }),
)(MUISwitch);

interface SwitchFieldProps {
    rightLabel?: string;
    leftLabel?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    id?: string;
    name?: string;
}

const CustomSwitch: React.FC<SwitchFieldProps> = props => {
    const classes = useStyles();
    const { selectedLabelColor, labelColor } = classes;
    const { checked, name, leftLabel, rightLabel, onChange } = props;
    return (
        <Grid container alignItems="center" spacing={1}>
            <Grid item className={!checked ? selectedLabelColor : labelColor}>{leftLabel}</Grid>
            <Grid item>
                <Switch
                    inputProps={{ style: { position: "absolute" } }}
                    checked={checked}
                    onChange={onChange}
                    id={`${name}_field`}
                />
            </Grid>
            <Grid item className={checked ? selectedLabelColor : labelColor}>{rightLabel}</Grid>
        </Grid>
    )
}

CustomSwitch.defaultProps = {
    rightLabel: "",
    leftLabel: "",
    checked: false,
};

export default CustomSwitch;

export interface SwitchData {
    label?: string;
    leftLabel?: string;
    rightLabel?: string;
    value: unknown;
    disabled?: boolean;
}

export interface SwitchGroupProps extends Partial<Omit<MuiSwitchProps, "onChange">> {
    name: string;
    options: SwitchData | SwitchData[];
    label?: ReactNode;
    required?: boolean;
    helperText?: string;
    formControlProps?: Partial<FormControlProps>;
    formGroupProps?: Partial<FormGroupProps>;
    formLabelProps?: Partial<FormLabelProps>;
    formControlLabelProps?: Partial<FormControlLabelProps>;
    formHelperTextProps?: Partial<FormHelperTextProps>;
}

export function SwitchGroupField(props: SwitchGroupProps): JSX.Element {
    const {
        name,
        options: data,
        label,
        required,
        helperText,
        formControlProps,
        formGroupProps,
        formLabelProps,
        formControlLabelProps,
        formHelperTextProps,
        ...restSwitches
    } = props;

    const itemsData = Array.isArray(data) ? data : [data];
    const single = Array.isArray(data) ? false : true;

    return (
        <Grid id={`${name}_container`} container alignItems="center" spacing={1}>
            <Grid item>
                {Boolean(label) && (
                    <FieldLabel id={`${name}_label`} labelText={label} />
                )}
            </Grid>
            <Grid item>
                <FormGroup {...formGroupProps}>
                    {itemsData.map((item: SwitchData, idx: number) => (
                        <FormControlLabel
                            key={idx}
                            name={name}
                            label={item.label}
                            value={single ? undefined : item.value}
                            disabled={item.disabled}
                            control={
                                <Field
                                    type="checkbox"
                                    name={name}
                                    render={({ input: { name, value, onChange, checked, ...restInput } }) => (
                                        <CustomSwitch
                                            value={value}
                                            leftLabel={item.leftLabel}
                                            rightLabel={item.rightLabel}
                                            onChange={onChange}
                                            checked={checked}
                                            disabled={item.disabled}
                                            inputProps={{ required, ...restInput }}
                                            {...restSwitches}
                                        />
                                    )}
                                />
                            }
                            {...formControlLabelProps}
                        />
                    ))}
                </FormGroup>
            </Grid>
        </Grid>
    );
}
