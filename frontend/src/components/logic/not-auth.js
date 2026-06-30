import { jsx as _jsx } from "react/jsx-runtime";
import useAuthStore from "@/stores/auth.store";
import { Navigate } from "react-router";
export default function NotAuth(props) {
    const authStore = useAuthStore();
    if (authStore.user)
        return _jsx(Navigate, { to: "/" });
    return props.children;
}
