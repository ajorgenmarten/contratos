import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router";
import Layout from "../layout";
import { ArrowLeft, ChevronDownIcon, FileText, Plus, Trash } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LabelRequired from "@/components/custom/label-required";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import useAddContract from "./hooks/add";
import { format } from "date-fns";
import SpanError from "@/components/custom/span-error";
import Supplement from "./components/supplement";
import { Textarea } from "@/components/ui/textarea";
import ContractDataInput from "./components/contract-data-input";
import SelectInput from "./components/select";
const clientDenominations = [
    { value: "MIPYME", label: "MIPYME" },
    { value: "CNA", label: "CNA" },
    { value: "EMPRESA_ESTATAL", label: "Empresa estatal" },
    { value: "EMPRESA_100_EXTRANJERA", label: "Empresa 100% extranjera" },
    { value: "EMPRESA_100_CUBANA", label: "Empresa 100% cubana" },
    { value: "EMPRESA_MIXTA", label: "Empresa mixta" },
    { value: "CCS", label: "CCS" },
    { value: "UBPC", label: "UBPC" },
    { value: "OTRAS_FORMAS", label: "Otras formas" },
];
const clientCategories = [
    { value: "Cliente", label: "Cliente" },
    { value: "Proveedor", label: "Proveedor" },
];
export default function ContractAdd() {
    const { contractDetails, contractTypes, contractContainer, register, setValue, getValues, watch, formState, fields, remove, append, onSubmit, control, reset, } = useAddContract();
    const agreementDate = watch("agreementDate");
    const onOpenChangeAgreementDate = () => {
        setValue("agreementDate", getValues("agreementDate"), {
            shouldTouch: true,
            shouldValidate: true,
        });
    };
    const addSupplement = () => {
        append({
            supplementNumber: "",
            supplementDate: new Date(),
            supplementObject: "",
            supplementValidity: new Date(),
        });
    };
    return (_jsx(Layout, { children: _jsx("div", { className: "min-h-[calc(100vh-8rem)] bg-muted/30 px-4 py-8", children: _jsxs("div", { className: "mx-auto max-w-2xl", children: [_jsx("div", { className: "mb-6", children: _jsxs(Link, { to: "/contracts", className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Ir a contratos"] }) }), _jsxs(Card, { className: "border-0 shadow-lg", children: [_jsxs(CardHeader, { className: "rounded-t-lg border-b pb-6 text-center", children: [_jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10", children: _jsx(FileText, { className: "h-7 w-7 text-primary" }) }), _jsx(CardTitle, { className: "text-2xl", children: "Agregar Nuevo Contrato" }), _jsx(CardDescription, { className: "text-base", children: "Completa los campos para registrar un nuevo contrato en el sistema" })] }), _jsx(CardContent, { className: "pt-8 pb-8", children: _jsxs("form", { className: "space-y-6", onSubmit: onSubmit, children: [_jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { htmlFor: "clientName", text: "Nombre del cliente", isRequired: true }), _jsx(Input, { ...register("clientName") }), _jsx(SpanError, { errorField: "clientName", errors: formState.errors })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Denominaci\u00F3n del cliente", isRequired: true }), _jsx(SelectInput, { control: control, fieldName: "clientDenomination", placeholder: "Seleccione la denominacion del cliente", values: clientDenominations }), _jsx(SpanError, { errorField: "clientDenomination", errors: formState.errors })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Categor\u00EDa del cliente", isRequired: true }), _jsx(SelectInput, { control: control, fieldName: "clientCategory", placeholder: "Seleccione el tipo de cliente", values: clientCategories }), _jsx(SpanError, { errorField: "clientCategory", errors: formState.errors })] })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "N\u00FAmero de acuerdo", isRequired: true }), _jsx(Input, { ...register("agreementNumber") }), _jsx(SpanError, { errorField: "agreementNumber", errors: formState.errors })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Fecha del acuerdo", isRequired: true }), _jsxs(Popover, { onOpenChange: onOpenChangeAgreementDate, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex w-full items-center justify-between", children: [agreementDate ? (format(agreementDate, "PPP")) : (_jsx("span", { children: "Selecciona la fecha" })), _jsx(ChevronDownIcon, {})] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: agreementDate, onSelect: (value) => setValue("agreementDate", value ?? agreementDate) }) })] }), _jsx(SpanError, { errorField: "agreementDate", errors: formState.errors })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Nacionalidad de la compa\u00F1\u00EDa" }), _jsx(Input, { ...register("nationalityCompany") }), _jsx(SpanError, { errorField: "nationalityCompany", errors: formState.errors })] }), _jsx(ContractDataInput, { control: control, formState: formState, register: register, watch: watch, setValue: setValue, contractContainer: contractContainer, contractDetails: contractDetails, contractType: contractTypes }), _jsx("div", { className: "flex flex-col gap-6", children: _jsx("div", { className: "flex items-center justify-end", children: _jsxs(Button, { type: "button", onClick: addSupplement, children: [_jsx(Plus, {}), " Agregar suplemento"] }) }) }), _jsx("div", { className: "space-y-2", children: fields.map((field, index) => (_jsx(Supplement, { index: index, field: field, formState: formState, register: register, watch: watch, remove: remove, setValue: setValue }, `supplement-${index}-${field.id}`))) }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Observaciones" }), _jsx(Textarea, { rows: 4, ...register("observations") }), _jsx(SpanError, { errorField: "observations", errors: formState.errors })] }), _jsxs("div", { className: "flex gap-2 space-y-2", children: [_jsxs(Button, { children: [_jsx(Plus, {}), " Agregar contrato"] }), _jsxs(Button, { variant: "outline", type: "button", onClick: () => reset(), children: [_jsx(Trash, {}), " Resetear"] })] })] }) })] })] }) }) }));
}
