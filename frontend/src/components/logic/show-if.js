import useAuthStore from "@/stores/auth.store";
export default function ShowIf(props) {
    const authStore = useAuthStore();
    if (props.allow?.includes(authStore.user?.role || ""))
        return props.children;
    return null;
}
