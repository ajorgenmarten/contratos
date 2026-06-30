import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useController } from "react-hook-form";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
export default function SelectInput(props) {
    const { field } = useController({
        name: props.fieldName,
        control: props.control,
    });
    const onChange = (event) => {
        if (props.onChange)
            props.onChange(event.target.value);
        field.onChange(event.target.value);
    };
    return (_jsxs(NativeSelect, { className: "w-full", value: field.value, onChange: onChange, onBlur: field.onBlur, children: [_jsx(NativeSelectOption, { value: "", children: props.placeholder }), props.values.map((item) => (_jsx(NativeSelectOption, { value: item.value, children: item.label })))] }));
}
