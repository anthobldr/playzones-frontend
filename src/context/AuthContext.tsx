import { createContext } from "react";

interface User {
    id:number;
    email:string;
    username:string;
}


export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading:boolean;
}


/**
 * Context global d'authentification.
 *
 * Il stockera :
 * - l'utilisateur connecté
 * - la fonction pour modifier l'utilisateur
 * - l'état de chargement
 *
 * La valeur initiale est null car au démarrage
 * on ne connaît pas encore l'utilisateur.
 */
export const AuthContext = createContext<AuthContextType | null>(null);