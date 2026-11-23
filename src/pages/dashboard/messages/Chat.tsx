import { useState } from "react";
import style from "./css/Conversation.module.css"
import type { ConversationData } from "../../../types/conversation"

interface ChatProps {
  conversation: ConversationData | null;
}

export default function Chat({ conversation }: ChatProps) {
  const [inputValue, setInputValue] = useState("");
  if (!conversation) {
    return (
      <div className="col-12 col-lg-7 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-center">
        <p className="text-secondary m-0 py-3 py-lg-0">Sélectionnez une conversation</p>
      </div>
    );
  }
  return (
    <div className="col-lg-6 bg-white rounded-4 shadow-sm d-flex flex-column h-100">
        <div className="d-flex justify-content-between align-items-center py-4 px-4 border-bottom">
            <div className="d-flex gap-3 align-items-center">
                <img src={conversation.avatar} width={50} className="rounded-circle"/>
                <div className="d-flex flex-column">
                    <span className="fw-bold">{conversation.name}</span>
                    <small className="text-secondary">En ligne</small>
                </div>
            </div>
            <button className="btn btn-link text-dark">
            <i className="bi bi-three-dots-vertical"></i>
            </button>
        </div>
        <div className="flex-grow-1 overflow-y-auto px-4 py-3">
            <div className="d-flex justify-content-center mb-3">
            <small className={`${style.messageDate} px-2 py-1 rounded-5`}>Aujourd'hui</small>
            </div>
            {conversation.messages.map((msg, index) => (
                msg.sender === "me" ? (
                    <div key={index} className="d-flex gap-2 mb-3 justify-content-end">
                    <div className="d-flex flex-column align-items-end">
                        <div className="bg-primary text-white rounded-4 px-3 py-2">
                        <small>{msg.text}</small>
                        </div>
                        <small className="text-secondary mt-1">{msg.time}</small>
                    </div>
                    <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=user123" width={40} className="rounded-circle" />
                    </div>
                ) : (
                    <div key={index} className="d-flex gap-2 mb-3">
                        <img src={conversation.avatar} width={40} className="rounded-circle"/>
                        <div className="d-flex flex-column">
                            <div className="bg-light rounded-4 px-3 py-2">
                            <small>{msg.text}</small>
                            </div>
                            <small className="text-secondary mt-1">{msg.time}</small>
                        </div>
                    </div>
                )
            ))}
        </div>
        <div className="border-top px-4 py-3">
            <div className="d-flex gap-2 align-items-center mb-2">
                <input type="text" className="form-control rounded-4 border-2" placeholder="Écrire un message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className="btn btn-primary bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '45px', height: '45px'}} >
                    <i className="bi bi-send"></i>
                </button>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-link text-muted p-0">
                    <i className="bi bi-emoji-smile" style={{fontSize: '1.2rem'}}></i>
                </button>
                <button className="btn btn-link text-muted p-0">
                    <i className="bi bi-image" style={{fontSize: '1.2rem'}}></i>
                </button>
                <button className="btn btn-link text-muted p-0">
                    <i className="bi bi-controller" style={{fontSize: '1.2rem'}}></i>
                </button>
            </div>
        </div>
    </div>
  );
}