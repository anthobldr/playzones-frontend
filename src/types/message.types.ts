import type { Avatar } from "./avatar.types";

export interface ChatMessage {
    id: number;
    senderId: number;
    content: string;
    createdAt: string;
}

export interface ConversationSummary {
    id: number;
    otherUser: { id: number; username: string; avatar: Avatar | null };
    lastMessage: ChatMessage | null;
    unreadCount: number;
}

export interface ConversationDetail {
    conversation: ConversationSummary;
    messages: ChatMessage[];
}