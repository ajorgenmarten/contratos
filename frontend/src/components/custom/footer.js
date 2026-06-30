import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText } from "lucide-react";
import { Link } from "react-router";
export default function Footer() {
    return (_jsx("footer", { className: "border-t border-border bg-muted/40", children: _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx("div", { className: "grid gap-8", children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-5 w-5 text-primary" }), _jsx("span", { className: "font-bold", children: "Contratos App" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Gestiona tus contratos y usuarios de forma sencilla y eficiente." })] }) }), _jsx("div", { className: "mt-8 border-t border-border pt-6", children: _jsxs("p", { className: "text-center text-sm text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " Contratos. Hecho por Alejandro Jorgen Mart\u00E9n"] }) })] }) }));
}
