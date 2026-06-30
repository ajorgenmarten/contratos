import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LabelRequired from "@/components/custom/label-required";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useLogin from "./hooks/login";
import SpanError from "@/components/custom/span-error";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
export default function Login() {
    const { register, formState, onSubmit } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center", children: _jsxs(Card, { className: "w-full max-w-lg shadow-lg", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Iniciar Sesi\u00F3n" }), _jsx(CardDescription, { children: "Ingresa tus credenciales para iniciar sesi\u00F3n" })] }), _jsx(CardContent, { children: _jsxs("form", { className: "space-y-6", onSubmit: onSubmit, children: [_jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Nombre de usuario" }), _jsx(Input, { ...register("username") }), _jsx(SpanError, { errors: formState.errors, errorField: "username" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(LabelRequired, { text: "Contrase\u00F1a" }), _jsxs("div", { className: "relative flex", children: [_jsx(Input, { ...register("password"), type: showPassword ? "text" : "password", className: "pr-12" }), _jsxs(Button, { type: "button", variant: "ghost", className: "absolute right-0", onClick: () => setShowPassword(!showPassword), children: [showPassword && _jsx(EyeOff, {}), !showPassword && _jsx(Eye, {})] })] }), _jsx(SpanError, { errors: formState.errors, errorField: "password" })] }), _jsx(CardAction, { children: _jsxs(Button, { children: ["Entrar ", _jsx(ArrowRight, {})] }) })] }) })] }) }));
}
