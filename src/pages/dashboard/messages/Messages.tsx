import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import AsideBar from "@/components/layout/AsideBar";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeEvent } from "@/hooks/useRealtimeEvent";
import * as messageService from "@/services/message.service";
import type { ChatMessage, ConversationSummary } from "@/types";
import Conversation from "./Conversation";
import Chat from "./Chat";

export default function Messages() {
    const { conversationId } = useParams();
    const selectedId = conversationId ? Number(conversationId) : null;
    const { user } = useAuth();
    const [conversations, setConversations] = useState<ConversationSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function loadConversations() {
            try {
                const data = await messageService.getConversations();
                if (!ignore) setConversations(data);
            } catch (err) {
                if (!ignore) setError(err instanceof Error ? err.message : "Impossible de charger les conversations.");
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        loadConversations();
        return () => { ignore = true; };
    }, []);

    function reloadConversations() {
        messageService.getConversations().then(setConversations).catch(() => {});
    }

    function applyNewMessage(conversationId: number, message: ChatMessage) {
        setConversations((current) => {
            const target = current.find((conversation) => conversation.id === conversationId);
            if (!target || target.lastMessage?.id === message.id) return current;

            const isUnread = message.senderId !== user?.id && conversationId !== selectedId;
            const updated = {
                ...target,
                lastMessage: message,
                unreadCount: isUnread ? target.unreadCount + 1 : target.unreadCount,
            };

            return [updated, ...current.filter((conversation) => conversation.id !== conversationId)];
        });
    }

    useRealtimeEvent((event) => {
        if (event.type === "message.created") {
            if (conversations.some((conversation) => conversation.id === event.conversationId)) {
                applyNewMessage(event.conversationId, event.message);
            } else {
                reloadConversations();
            }
        }
        if (event.type === "realtime.reconnected") {
            reloadConversations();
        }
    });

    function markAsReadLocally(conversationId: number) {
        setConversations((current) => current.map((conversation) =>
            conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation
        ));
    }

    const selected = conversations.find((conversation) => conversation.id === selectedId) ?? null;

    return (
        <div className="container-fluid p-0">
            <div className="row mb-5">
                <div className="col-lg-2">
                    <AsideBar />
                </div>
                <div className="col-lg-10 px-4">
                    <TopBar />
                    <div className="py-3">
                        <h1>Messages</h1>
                        <p>Reste connecté avec le reste de la communauté.</p>
                    </div>
                    {error && <p role="alert" className="text-danger">{error}</p>}
                    <div className="row gap-4">
                        <Conversation conversations={conversations} selectedId={selectedId} loading={loading} />
                        {user && (
                            <Chat
                                key={selectedId ?? "none"}
                                conversation={selected}
                                currentUserId={user.id}
                                onMessage={applyNewMessage}
                                onRead={markAsReadLocally}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
