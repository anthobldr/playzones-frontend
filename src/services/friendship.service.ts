import { apiFetch } from "./api";
import type { FriendshipRequest, Player } from "@/types";

export const getPlayers = () =>
    apiFetch<Player[]>("/players/getPlayers");

export const getFriends = () =>
    apiFetch<Player[]>("/friends/getFriends");

export const getPendingRequests = () =>
    apiFetch<FriendshipRequest[]>("/friends/pending-requests");

export const sendFriendRequest = (friendId: number) =>
    apiFetch<void>(`/friends/send-request/${friendId}`, { method: "POST" });

export const acceptFriendRequest = (requestId: number) =>
    apiFetch<void>(`/friends/pending-requests/accept/${requestId}`, { method: "POST" });

export const rejectFriendRequest = (requestId: number) =>
    apiFetch<void>(`/friends/pending-requests/reject/${requestId}`, { method: "PATCH" });

export const removeFriend = (friendId: number) =>
    apiFetch<void>(`/friends/remove/${friendId}`, { method: "DELETE" });