import TopBar from "../components/TopBar"
import AsideBar from "../../../components/layout/AsideBar"
import Conversation from "./Conversation"
import type { ConversationData } from "@/types/conversation";
import Chat from "./Chat"
import { useState } from "react"

export default function Messages(){
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const conversations: ConversationData[] = [];
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
                    <div className="row gap-4">
                        <Conversation conversations={conversations} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
                        <Chat conversation={selectedConversation !== null ? conversations[selectedConversation] : null} />
                    </div>
                </div>
            </div>
        </div>
    )
}