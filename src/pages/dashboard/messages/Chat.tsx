import { useEffect, useEffectEvent, useRef, useState } from "react";
import { getAvatarUrl } from "@/services/avatar.service";
import { useRealtimeEvent } from "@/hooks/useRealtimeEvent";
import * as messageService from "@/services/message.service";
import type { ChatMessage, ConversationSummary } from "@/types";
import { formatMessageTime } from "@/utils/formatMessageTime";

const MAX_LENGTH = 2000;

interface ChatProps {
    conversation: ConversationSummary | null;
    currentUserId: number;
    onMessage: (conversationId: number, message: ChatMessage) => void;
    onRead: (conversationId: number) => void;
}

function appendOnce(messages: ChatMessage[], message: ChatMessage): ChatMessage[] {
    return messages.some((existing) => existing.id === message.id) ? messages : [...messages, message];
}

export default function Chat({ conversation, currentUserId, onMessage, onRead }: ChatProps) {
    const conversationId = conversation?.id ?? null;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const notifyRead = useEffectEvent(onRead);

    useEffect(() => {
        if (conversationId === null) return;
        let ignore = false;

        async function loadMessages(id: number) {
            try {
                const data = await messageService.getConversationMessages(id);
                if (ignore) return;
                setMessages(data.messages);
                notifyRead(id);
            } catch (err) {
                if (!ignore) setError(err instanceof Error ? err.message : "Impossible de charger les messages.");
            }
        }

        loadMessages(conversationId);
        return () => { ignore = true; };
    }, [conversationId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: "end" });
    }, [messages]);

    useRealtimeEvent((event) => {
        if (event.type === "message.created" && event.conversationId === conversationId) {
            setMessages((current) => appendOnce(current, event.message));
            if (event.message.senderId !== currentUserId) {
                messageService.markConversationAsRead(conversationId).catch(() => {});
            }
        }
        if (event.type === "realtime.reconnected" && conversationId !== null) {
            messageService.getConversationMessages(conversationId).then((data) => setMessages(data.messages)).catch(() => {});
        }
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (conversationId === null || content.trim() === "") return;

        setError("");
        setSending(true);
        try {
            const message = await messageService.sendMessage(conversationId, content);
            setMessages((current) => appendOnce(current, message));
            onMessage(conversationId, message);
            setContent("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Message non envoyé.");
        } finally {
            setSending(false);
        }
    }

    if (!conversation) {
        return (
            <section className="col-12 col-lg-7 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-center">
                <p className="text-secondary m-0 py-3 py-lg-0">Sélectionne une conversation</p>
            </section>
        );
    }

    const { otherUser } = conversation;

    return (
        <section className="col-12 col-lg-7 bg-white rounded-4 shadow-sm d-flex flex-column" style={{ height: "70vh" }} aria-labelledby="chat-title">
            <header className="d-flex gap-3 align-items-center py-4 px-4 border-bottom">
                <img src={getAvatarUrl(otherUser.avatar)} width={50} height={50} alt="" className="rounded-circle" />
                <h2 id="chat-title" className="h5 fw-bold m-0">{otherUser.username}</h2>
            </header>

            <div className="flex-grow-1 overflow-y-auto px-4 py-3" role="log" aria-live="polite" aria-label={`Messages avec ${otherUser.username}`}>
                {messages.length === 0 && <p className="text-secondary text-center">Aucun message. Dis bonjour !</p>}
                {messages.map((message) => {
                    const isMine = message.senderId === currentUserId;

                    return (
                        <div key={message.id} className={`d-flex flex-column mb-3 ${isMine ? "align-items-end" : "align-items-start"}`}>
                            <span className="visually-hidden">{isMine ? "Toi" : otherUser.username} :</span>
                            <p className={`rounded-4 px-3 py-2 m-0 text-break ${isMine ? "bg-primary text-white" : "bg-light"}`} style={{ whiteSpace: "pre-wrap", maxWidth: "75%" }}>
                                {message.content}
                            </p>
                            <small className="text-secondary mt-1">
                                <time dateTime={message.createdAt}>{formatMessageTime(message.createdAt)}</time>
                            </small>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <form className="border-top px-4 py-3" onSubmit={handleSubmit}>
                {error && <p role="alert" className="text-danger small mb-2">{error}</p>}
                <div className="d-flex gap-2 align-items-center">
                    <label htmlFor="message-content" className="visually-hidden">Ton message à {otherUser.username}</label>
                    <input
                        id="message-content"
                        type="text"
                        className="form-control rounded-4 border-2"
                        placeholder="Écrire un message..."
                        autoComplete="off"
                        maxLength={MAX_LENGTH}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: "45px", height: "45px" }}
                        disabled={sending || content.trim() === ""}
                    >
                        <i className="bi bi-send" aria-hidden="true"></i>
                        <span className="visually-hidden">Envoyer</span>
                    </button>
                </div>
            </form>
        </section>
    );
}
