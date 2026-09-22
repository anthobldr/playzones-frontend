import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/auth/login");
    }, [navigate, setUser]);

    return <p>Déconnexion...</p>;
}