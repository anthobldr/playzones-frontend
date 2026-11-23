import type { Avatar } from "./avatar.types";

export interface FriendshipRequest {
    id: number;
    sender: { id: number; username: string; avatar: Avatar | null };
    receiver: { id: number; username: string; };
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
}