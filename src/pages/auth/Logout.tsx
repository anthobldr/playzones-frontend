import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/auth.service";

export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        async function handleLogout() {
            try {
                await logout();
            } finally {
                setUser(null);
                navigate("/auth/login");
            }
        }

        handleLogout();
    }, [navigate, setUser]);

    return <p>Déconnexion...</p>;
}
