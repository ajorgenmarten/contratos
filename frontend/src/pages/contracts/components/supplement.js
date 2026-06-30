import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import LabelRequired from "@/components/custom/label-required";
import SpanError from "@/components/custom/span-error";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
export default function Supplement({ index, remove, register, formState, setValue, field, watch, }) {
    const supplementDateWatched = watch(`supplements.${index}.supplementDate`);
    const supplementValidityWatched = watch(`supplements.${index}.supplementValidity`);
    const onOpenChangeSupplementDate = () => {
        setValue(`supplements.${index}.supplementDate`, supplementDateWatched, {
            shouldValidate: true,
        });
    };
    const onOpenCangeSupplementValidity = () => {
        setValue(`supplements.${index}.supplementValidity`, supplementValidityWatched, {
            shouldValidate: true,
        });
    };
    return (_jsxs(Card, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsxs(Label, { className: "text-lg text-primary", children: ["Suplemento ", index + 1] }), _jsx(Button, { variant: "ghost", onClick: () => remove(index), children: _jsx(X, {}) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "N\u00FAmero de suplemento", isRequired: true }), _jsx(Input, { ...register(`supplements.${index}.supplementNumber`) }), _jsx(SpanError, { errorField: `supplements.${index}.supplementNumber`, errors: formState.errors })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Objeto de suplemento", isRequired: true }), _jsx(Input, { ...register(`supplements.${index}.supplementObject`) }), _jsx(SpanError, { errorField: `supplements.${index}.supplementObject`, errors: formState.errors })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Fecha de suplemento", isRequired: true }), _jsxs(Popover, { onOpenChange: onOpenChangeSupplementDate, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex w-full items-center justify-between", children: [supplementDateWatched ? (format(supplementDateWatched, "PPP")) : (_jsx("span", { children: "Selecciona la fecha" })), _jsx(ChevronDownIcon, {})] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: supplementDateWatched, onSelect: (value) => setValue(`supplements.${index}.supplementDate`, value ?? supplementDateWatched) }) })] }), _jsx(SpanError, { errorField: `supplements.${index}.supplementDate`, errors: formState.errors })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Vigencia del suplemento", isRequired: true }), _jsxs(Popover, { onOpenChange: onOpenCangeSupplementValidity, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex w-full items-center justify-between", children: [supplementValidityWatched ? (format(supplementValidityWatched, "PPP")) : (_jsx("span", { children: "Selecciona la fecha" })), _jsx(ChevronDownIcon, {})] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: supplementValidityWatched, onSelect: (value) => setValue(`supplements.${index}.supplementValidity`, value ?? supplementValidityWatched) }) })] }), _jsx(SpanError, { errorField: `supplements.${index}.supplementValidity`, errors: formState.errors })] })] }, `supplement-${index}-${field.id}`));
}
