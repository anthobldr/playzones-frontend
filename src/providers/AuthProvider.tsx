import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUser } from "../services/auth.services";

interface User {
    id:number;
    email:string;
    username:string;
}

interface AuthProviderProps {
    children:ReactNode;
}

export function AuthProvider({children}: AuthProviderProps){
    const [user,setUser] = useState<User | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        getCurrentUser().then(data=>{
            setUser(data.user);
        }).finally(()=>{
            setLoading(false);
        });
    },[]);

    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
}