import { login,register }  from "../../services/auth.api";
import { useContext }   from "react";
import { AuthContext } from "../auth.context.jsx";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, isLoading, setIsLoading } = context;


async function handleLogin({email, password}) {
    setIsLoading(true);
    const response = await login({email, password});
    setUser(response.user);
    setIsLoading(false);
}

async function handleRegister({email, password}) {
    setIsLoading(true);
    const response = await register({email, password});
    setUser(response.user);
    setIsLoading(false);

}


return {user, isLoading, handleLogin, handleRegister};

}