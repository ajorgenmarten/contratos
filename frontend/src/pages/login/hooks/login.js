import { useAuthContext } from "@/contexts/auth/auth.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
const loginSchema = z.object({
    username: z.string().min(1, "El nombre de usuario es requerido"),
    password: z.string().min(1, "La contraseña es requerida"),
});
export default function useLogin() {
    const { formState, register, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "all",
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const { login } = useAuthContext();
    const onSubmit = handleSubmit((data) => login(data.username, data.password));
    return { formState, register, onSubmit };
}
