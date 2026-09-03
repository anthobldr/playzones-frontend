import type { Avatar } from "./avatar.types";

export interface FriendshipRequest {
    id: number;
    sender: { id: number; username: string };
    receiver: { id: number; username: string, avatar: Avatar };
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
}