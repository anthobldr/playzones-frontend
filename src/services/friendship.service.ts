import type { FriendshipRequest, Player } from "../types";

const API_URL = "http://localhost:8000";

export async function getFriends(): Promise<Player[]>{
    const response = await fetch(`${API_URL}/friends/getFriends`, {
        credentials: "include",
    });
    if(!response.ok) throw new Error("Erreur lors de la récupérations des amis.")

    return response.json();
}

export async function getPendingRequests(): Promise<FriendshipRequest[]>{
    const response = await fetch(`${API_URL}/friends/pending-requests`, {
        credentials: "include",
    });
    if(!response.ok) throw new Error("Erreur lors de la récupérations des demandes en attente.");

    return response.json();
}

export async function acceptFriendRequest(requestId: number): Promise<void>{
    const response = await fetch(`${API_URL}/friends/pending-requests/accept/${requestId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }  
    });
    if(!response.ok) throw new Error("Erreur lors de l'acceptation de la demande d'amis.");
}

export async function rejectFriendRequest(requestId: number): Promise<void>{
    const response = await fetch(`${API_URL}/friends/pending-requests/reject/${requestId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if(!response.ok) throw new Error("Erreur lors du refus de la demande d'amis");
}

export async function sendFriendRequest(friendId: number): Promise<void>{
    const response = await fetch(`${API_URL}/friends/send-request/${friendId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    if (!response.ok) {
        console.error("Erreur Symfony :", data);

        throw new Error(
            data.error || "Erreur lors de l'envoi de la demande d'ami."
        );
    }
}

export async function removeFriend(friendId: number): Promise<void>{
    const response = await fetch(`${API_URL}/friends/remove/${friendId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if(!response.ok) throw new Error("Erreur lors de la supression de l'ami.");
}