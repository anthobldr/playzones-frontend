import { apiFetch } from "./api";
import type { ChatMessage, ConversationDetail, ConversationSummary } from "@/types";

const CONVERSATIONS = "/conversations";

export const getConversations = () =>
    apiFetch<ConversationSummary[]>(CONVERSATIONS);

export const openConversation = (userId: number) =>
    apiFetch<ConversationSummary>(CONVERSATIONS, { method: "POST", body: JSON.stringify({ userId }) });

export const getUnreadCount = () =>
    apiFetch<{ count: number }>(`${CONVERSATIONS}/unread-count`);

export const getConversationMessages = (conversationId: number) =>
    apiFetch<ConversationDetail>(`${CONVERSATIONS}/${conversationId}/messages`);

export const sendMessage = (conversationId: number, content: string) =>
    apiFetch<ChatMessage>(`${CONVERSATIONS}/${conversationId}/messages`, { method: "POST", body: JSON.stringify({ content }) });

export const markConversationAsRead = (conversationId: number) =>
    apiFetch<void>(`${CONVERSATIONS}/${conversationId}/read`, { method: "POST" });