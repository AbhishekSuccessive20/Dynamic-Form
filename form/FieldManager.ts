import { isNil } from "./utils";
import {
    ChipInputField,
    SelectMenuField,
    RadioGroupField,
    CheckboxGroupField,
    MessageField,
    TextField,
    SwitchGroupField,
    MaskField,
    SeparatorText,
    ChipSelect
} from "./fields";

export enum FieldType {
    Text = "text",
    Radio = "radio",
    Checkbox = "checkbox",
    Select = "select",
    Message = "message",
    ChipInput = "chipInput",
    Switch = "switch",
    Password = "password",
    Email = "email",
    Number = "number",
    MaskInput = "maskInput",
    Separator = "separator",
    ChipSelect = "chipSelect"
}

class FieldManager {
    private static instance: FieldManager;

    private constructor() {/** */}

    public static getInstance(): FieldManager {
        if (isNil(this.instance)) {
            this.instance = new this();
        }
        return this.instance;
    }

    public getField(field: FieldType) {
        switch (field) {
        case FieldType.Select:
            return SelectMenuField;
        case FieldType.Radio:
            return RadioGroupField;
        case FieldType.Checkbox:
            return CheckboxGroupField;
        case FieldType.ChipInput:
            return ChipInputField;
        case FieldType.Message:
            return MessageField;
        case FieldType.Switch:
            return SwitchGroupField;
        case FieldType.Text:
        case FieldType.Password:
        case FieldType.Email:
        case FieldType.Number:
            return TextField;
        case FieldType.MaskInput:
            return MaskField;
        case FieldType.Separator:
            return SeparatorText;
        case FieldType.ChipSelect:
            return ChipSelect;
        }
    }
}

export default FieldManager.getInstance();
