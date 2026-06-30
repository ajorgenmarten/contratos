import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { Link } from "react-router";
export default function NotFound() {
    return (_jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center gap-6 text-muted", children: ["404 | P\u00E1gina no encontrada", _jsx(Link, { to: "/", children: _jsxs(Button, { children: [_jsx(House, {}), "Ir a inicio"] }) })] }));
}
