import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar";
export default function Layout(props) {
    return (_jsxs("div", { className: "flex min-h-screen flex-col", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1", children: props.children }), _jsx(Footer, {})] }));
}
