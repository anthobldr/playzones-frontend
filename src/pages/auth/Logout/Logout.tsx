import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/auth.service";

export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        async function performLogout(){
            try{
                await logout();
            }catch(error){
                console.error(error);
            }finally{
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                setUser(null);
                navigate("/auth/login");
            }
        }
        performLogout()
    }, [navigate, setUser]);

    return <p>Déconnexion...</p>;
}