import { Link } from "react-router-dom";
import { getAvatarUrl } from "@/services/avatar.service";
import type { ConversationSummary } from "@/types";
import { formatMessageTime } from "@/utils/formatMessageTime";
import style from "./css/Conversation.module.css";

interface ConversationProps {
    conversations: ConversationSummary[];
    selectedId: number | null;
    loading: boolean;
}

export default function Conversation({ conversations, selectedId, loading }: ConversationProps) {
    return (
        <nav className="col-12 col-lg-4 bg-white rounded-4 shadow-sm py-lg-3 px-lg-3 d-flex flex-column gap-4" aria-labelledby="conversations-title">
            <h2 id="conversations-title" className="h5 m-0 py-3 py-lg-0">Mes conversations</h2>

            {loading ? (
                <p className="text-secondary" role="status">Chargement…</p>
            ) : conversations.length > 0 ? (
                <ul className="d-flex flex-column gap-3 list-unstyled m-0">
                    {conversations.map((conversation) => {
                        const isSelected = conversation.id === selectedId;
                        const { otherUser, lastMessage, unreadCount } = conversation;

                        return (
                            <li key={conversation.id}>
                                <Link to={`/account/messages/${conversation.id}`} aria-current={isSelected ? "page" : undefined} className={`d-flex gap-3 py-3 px-3 rounded-4 text-decoration-none text-reset ${isSelected ? style.selectedConversation : ""}`}>
                                    <img src={getAvatarUrl(otherUser.avatar)} width={50} height={50} alt="" className="rounded-circle" />
                                    <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                                        <div className="d-flex justify-content-between gap-2">
                                            <span className="fw-bold">{otherUser.username}</span>
                                            {lastMessage && <small className="text-secondary text-nowrap">{formatMessageTime(lastMessage.createdAt)}</small>}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center gap-2">
                                            <small className="text-secondary text-truncate">
                                                {lastMessage ? lastMessage.content : "Aucun message pour l'instant"}
                                            </small>
                                            {unreadCount > 0 && (
                                                <small className={`${style.unreadMessage} text-white px-2`}>
                                                    {unreadCount}<span className="visually-hidden"> non lu{unreadCount > 1 ? "s" : ""}</span>
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="text-center py-4 mx-2">
                    <p className="fw-bold">Aucune conversation</p>
                    <p className="text-secondary">Écris à un ami depuis ta liste d'amis.</p>
                    <Link to="/account/friends" className="btn btn-primary rounded-4 fw-bold">
                        <i className="bi bi-people me-2" aria-hidden="true"></i>Voir mes amis
                    </Link>
                </div>
            )}
        </nav>
    );
}
