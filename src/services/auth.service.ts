const API_URL = "http://localhost:8000";

export async function verifyEmail(email: string, code: string){
    const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
    })

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error);
    }

    return data;
}

export async function resendCode(email: string, username:string){
    const response = await fetch(`${API_URL}/auth/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, username}),   
    })

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error);
    }

    return data;
}

export async function register(email: string, username: string, password: string, confirmPassword: string){
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email, username: username, password: password, confirmPassword: confirmPassword}),
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error);
    }

    return data;
}

export async function login(email: string, password: string){
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    })

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error);
    }

    return data;
}

export async function getCurrentUser(){
    const response = await fetch(`${API_URL}/auth/me`,{
        credentials: "include"
    });
    if(!response.ok){
        return null;
    }

    return response.json();
}