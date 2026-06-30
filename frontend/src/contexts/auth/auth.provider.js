import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { AuthContext } from "./auth.context";
import http from "@/configs/http";
import useAuthStore from "@/stores/auth.store";
import { toast } from "react-toastify";
export function useAuth() {
    const authStore = useAuthStore();
    const logout = () => {
        http
            .delete("/v1/auth/logout")
            .then((resposne) => {
            toast.success(resposne.data.message);
            authStore.setAccessToken(null);
            authStore.setUser(null);
        })
            .catch(() => {
            toast.error("Ha ocurrido un error al cerrar sesión");
        });
    };
    const login = (username, password) => {
        http
            .post("/v1/auth/login", { username, password })
            .then((response) => {
            authStore.setAccessToken(response.data.accessToken);
            authStore.setUser(response.data.user);
        })
            .catch((err) => {
            toast.error(err.response.data.message);
        });
    };
    const refreshToken = () => {
        http
            .get("/v1/auth/refresh-token")
            .then((response) => {
            authStore.setAccessToken(response.data.accessToken);
        })
            .catch((err) => {
            if (err.status === 403 ||
                err.status === 401) {
                authStore.setAccessToken(null);
                authStore.setUser(null);
            }
        });
    };
    useEffect(() => {
        if (!authStore.user)
            return;
        const time = 12 * 1000 * 60;
        const interval = setInterval(refreshToken, time);
        return () => clearInterval(interval);
    }, [authStore.user]);
    return { logout, login, refreshToken };
}
export default function AuthProvider(props) {
    return (_jsx(AuthContext.Provider, { value: useAuth(), children: props.children }));
}
