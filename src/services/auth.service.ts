import { apiFetch } from "./api";
import type { User } from "@/types";

interface UserResponse { message?: string; user: User; }
interface MessageResponse { message: string; }

export function register(email: string, username: string, password: string, confirmPassword: string,  acceptTerms: boolean) {
    return apiFetch<UserResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, username, password, confirmPassword, acceptTerms }),
    });
}

export function verifyEmail(email: string, code: string) {
    return apiFetch<UserResponse>("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ email, code }),
    });
}

export function resendCode(email: string) {
    return apiFetch<MessageResponse>("/auth/resend-code", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export function login(email: string, password: string) {
    return apiFetch<UserResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export function sendForgotPasswordEmail(email: string) {
    return apiFetch<MessageResponse>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export function resetPassword(token: string, password: string, confirmPassword: string) {
    return apiFetch<MessageResponse>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password, confirmPassword }),
    });
}

export async function getCurrentUser() {
    try {
        return await apiFetch<UserResponse>("/auth/me");
    } catch {
        return null;
    }
}

export function logout() {
    return apiFetch<void>("/auth/logout", { method: "POST" });
}