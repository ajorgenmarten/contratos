import { createContext, useContext } from "react";
import { useAuth } from "./auth.provider";
const AuthContext = createContext({
    login: () => { },
    logout: () => { },
    refreshToken: () => { },
});
const useAuthContext = () => useContext(AuthContext);
export { AuthContext, useAuthContext };
