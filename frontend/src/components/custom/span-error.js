import { jsx as _jsx } from "react/jsx-runtime";
export default function SpanError(props) {
    const errorFieldSplited = props.errorField.split(".");
    let message = props.errors[errorFieldSplited.shift()];
    while (errorFieldSplited.length) {
        const key = errorFieldSplited.shift();
        message = message?.[key];
    }
    if (message)
        return _jsx("span", { className: "text-destructive", children: message.message });
    return null;
}
