import style from "./css/Conversation.module.css"
import type { ConversationData } from "../../../types/conversation"

interface ConversationProps {
  conversations: ConversationData[];
  selectedConversation: number | null;
  setSelectedConversation: (index: number) => void;
}

export default function Conversation({conversations, selectedConversation, setSelectedConversation}: ConversationProps){
  return (
    <div className="col-12 col-lg-4 bg-white rounded-4 shadow-sm py-lg-3 px-lg-3 d-flex flex-column gap-4">
      <div className="d-flex align-items-center justify-content-between py-3 py-lg-0 ">
        <h5 className="m-0">Mes conversations</h5>
        <button id={style.newMessage} className="btn text-white rounded-4">
          <i className="bi bi-pencil me-2"></i>Nouveau message
        </button>
      </div>
      <ul className="d-flex flex-column gap-3 list-unstyled">
        {conversations.length > 0 ? (
          conversations.map((conv: ConversationData, index: number) => (
            <li key={index} className={`d-flex gap-3 py-3 px-3 ${selectedConversation === index ? style.selectedConversation : ''} rounded-4 cursor-pointer`} onClick={() => setSelectedConversation(index)}>
              <img src={conv.avatar} width={50} className="rounded-circle"/>
              <div className="d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">{conv.name}</span>
                  <small className="text-secondary">{conv.time}</small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-secondary lh-1">{conv.message}</small>
                  {conv.unread >= 1 && (
                    <small className={`${style.unreadMessage} text-white px-2`}>{conv.unread}</small>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="text-center py-4 mx-2">
            <h2>Aucune conversation</h2>
            <p className="text-secondary">Vous n'avez pas encore de messages.</p>
            <div className="d-flex justify-content-center">
                <button id={style.addFriendSecondary} className="btn rounded-4 fw-bold" data-bs-toggle="modal" data-bs-target="#addFriendsModal">
                    <i className="bi bi-plus-lg me-2"></i>Ajouter des amis
                </button>
            </div>
          </div>
        )}
      </ul>
    </div>
  )
}