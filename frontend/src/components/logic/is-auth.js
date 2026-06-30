import { jsx as _jsx } from "react/jsx-runtime";
import useAuthStore from "@/stores/auth.store";
import { Navigate } from "react-router";
export default function IsAuth(props) {
    const authStore = useAuthStore();
    if (!authStore.user)
        return _jsx(Navigate, { to: "/login" });
    return props.children;
}
