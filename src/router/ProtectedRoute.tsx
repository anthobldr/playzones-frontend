import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({children}){
    const { user, loading } = useAuth();

    // Mettre en attente pendantr la vérification
    if(loading){
        return <p>Chargement de vos informations...</p>;
    }

    // Pas connecté ou token invalide
    if(!user){
        return <Navigate to="/auth/login" />;
    }

    return children;
}