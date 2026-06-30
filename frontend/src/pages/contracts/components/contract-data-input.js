import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LabelRequired from "@/components/custom/label-required";
import {} from "react-hook-form";
import { Input } from "@/components/ui/input";
import SpanError from "@/components/custom/span-error";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import SelectInput from "./select";
export default function ContractDataInput({ register, formState, watch, setValue, contractContainer, contractDetails, contractType, control, }) {
    const [showContractProduct, setShowContractProduct] = useState(false);
    const [showContractContainer, setShowContractContainer] = useState(false);
    const contractDateWatched = watch("contractDate");
    const contractValidityWatched = watch("contractValidity");
    const contractTypeIdWatched = watch("contractTypeId");
    useEffect(() => {
        const contractDetail = contractDetails.find((detail) => detail.id === contractTypeIdWatched);
        setShowContractContainer(contractDetail?.haveContainer ?? false);
        setShowContractProduct(contractDetail?.haveType ?? false);
    }, [contractTypeIdWatched, contractDetails]);
    const onOpenChangeContractDate = () => setValue("contractDate", contractDateWatched, {
        shouldTouch: true,
        shouldValidate: true,
    });
    const onSelectContractDate = (date) => setValue("contractDate", date, { shouldTouch: true, shouldValidate: true });
    const onSelectContractValidity = (date) => setValue("contractValidity", date, {
        shouldTouch: true,
        shouldValidate: true,
    });
    return (_jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "N\u00FAmero de contrato", htmlFor: "contractNumber", isRequired: true }), _jsx(Input, { ...register("contractNumber") }), _jsx(SpanError, { errorField: "contractNumber", errors: formState.errors })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Fecha de contrato", htmlFor: "contractDate", isRequired: true }), _jsxs(Popover, { onOpenChange: onOpenChangeContractDate, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex w-full items-center justify-between", children: [contractDateWatched && format(contractDateWatched, "PPP"), !contractDateWatched && "Seleccione una fecha", _jsx(ChevronDownIcon, {})] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: contractDateWatched, onSelect: onSelectContractDate }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Tipo de contrato" }), _jsx(SelectInput, { control: control, fieldName: "contractTypeId", placeholder: "Seleccione un tipo de contrato", values: contractDetails.map((detail) => ({
                            value: detail.id,
                            label: detail.name,
                        })) }), _jsx(SpanError, { errorField: "contractTypeId", errors: formState.errors })] }), showContractProduct && (_jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Tipo de producto", isRequired: true }), _jsx(SelectInput, { control: control, fieldName: "contractType", placeholder: "Seleccione un tipo de producto", values: Object.keys(contractType ?? {}).map((ct) => ({
                            value: ct,
                            label: ct,
                        })) }), _jsx(SpanError, { errorField: "contractType", errors: formState.errors })] })), showContractContainer && (_jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Tipo de contenedor" }), _jsx(SelectInput, { control: control, fieldName: "contractContainer", placeholder: "Seleccione un tipo de contenedor", values: Object.keys(contractContainer ?? {}).map((ct) => ({
                            value: ct,
                            label: ct,
                        })) }), _jsx(SpanError, { errorField: "contractContainer", errors: formState.errors })] })), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Vigencia de contrato" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex w-full items-center justify-between", children: [contractValidityWatched && (_jsx("span", { children: format(contractValidityWatched, "PPP") })), !contractValidityWatched && _jsx("span", { children: "Vigencia de contrato" }), _jsx(ChevronDownIcon, {})] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: contractValidityWatched, onSelect: onSelectContractValidity }) })] }), _jsx(SpanError, { errorField: "contractValidity", errors: formState.errors })] })] }));
}
