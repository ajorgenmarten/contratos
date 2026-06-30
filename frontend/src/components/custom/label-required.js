import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "../ui/label";
import { Label as LabelPrimitive } from "radix-ui";
export default function LabelRequired({ text, isRequired, ...props }) {
    return (_jsxs(Label, { ...props, children: [text, isRequired && _jsx("span", { className: "text-destructive", children: "*" })] }));
}
