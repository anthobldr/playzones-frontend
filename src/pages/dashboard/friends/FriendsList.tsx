import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Player } from "../../../types";
import { getAvatarUrl } from "../../../services/avatar.service";
import * as friendshipService from "../../../services/friendship.service";
import * as gameService from "@/services/game.service";
import * as messageService from "@/services/message.service";
import style from "./css/Friends.module.css"

interface FriendsListProps {
  friends: Player[];
  onFriendRemoved: () => void;
}

export default function FriendsList({ friends, onFriendRemoved }: FriendsListProps){
    const navigate = useNavigate();
    const [challengingId, setChallengingId] = useState<number | null>(null);
    const [challengeError, setChallengeError] = useState("");

    const handleChallenge = async (friendId: number) => {
        setChallengeError("");
        setChallengingId(friendId);
        try {
            const game = await gameService.challengeFriend(friendId);
            navigate(`/account/games/tic-tac-toe/${game.id}`);
        } catch (error) {
            setChallengeError(error instanceof Error ? error.message : "Impossible de lancer le défi.");
            setChallengingId(null);
        }
    }
    
    const handleMessage = async (friendId: number) => {
        setChallengeError("");
        try {
            const conversation = await messageService.openConversation(friendId);
            navigate(`/account/messages/${conversation.id}`);
        } catch (error) {
            setChallengeError(error instanceof Error ? error.message : "Impossible d'ouvrir la conversation.");
        }
    }

    const handleRemoveFriend = async (friendId: number) => {
        try {
            await friendshipService.removeFriend(friendId);
            onFriendRemoved()
        } catch(error){
            console.log(error);
        }
    }

    return (
        <div className="col-lg-5 bg-white d-flex flex-column gap-3 shadow-sm rounded-4 py-4">
            <div className="d-flex align-items-center justify-content-between px-2">
                <h2>Ma liste d'amis</h2>
                <small id={style.friendCount} className="rounded-4 px-2">{friends.length} amis</small>
            </div>
            {challengeError && <p role="alert" className="text-danger px-2 mb-0">{challengeError}</p>}
            {friends.length > 0 ? (
                <ul className="list-unstyled d-flex flex-column gap-3">
                    {friends.map((friend) => (
                        <li key={friend.id} className="border d-flex gap-3 rounded-4 py-3 px-3 align-items-center">
                            <div>
                                <img src={getAvatarUrl(friend.avatar)} width={50} alt={`Avatar de ${friend.username}`} className="rounded-circle"/>
                            </div>
                            <div className="d-flex flex-column lh-sm">
                                <span>{friend.username}</span>
                                <small className="text-success">En ligne</small>
                            </div>
                            <div className="d-flex gap-2 ms-auto">
                                <button type="button" className={`btn border rounded-4 ${style.battle}`} onClick={() => handleChallenge(friend.id)} disabled={challengingId !== null}>
                                    <i className="bi bi-controller me-2" aria-hidden="true"></i>
                                    Défier<span className="visually-hidden"> {friend.username}</span>
                                </button>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                       <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 p-2 mt-2">
                                        <li>
                                           <button type="button" className="dropdown-item btn" onClick={() => handleMessage(friend.id)}>
                                                <i className="bi bi-chat-dots me-2" aria-hidden="true"></i>
                                                Envoyer un message
                                            </button>
                                        </li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li>
                                            <button className="dropdown-item rounded-3 text-danger" onClick={() => handleRemoveFriend(friend.id)}>
                                                <i className="bi bi-trash3 me-2"></i>
                                                Supprimer
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="border rounded-4 text-center py-4 mx-2">
                    <img src="/cta-icon.png" alt="" width={350}/>
                    <h2>Vous n'avez pas encore d'amis</h2>
                    <p className="text-secondary">Ajoutez des joueurs pour <br />partager vos mielleurs moments !</p>
                    <div className="d-flex justify-content-center">
                        <button id={style.addFriendSecondary} className="btn rounded-4 fw-bold" data-bs-toggle="modal" data-bs-target="#addFriendsModal">
                            <i className="bi bi-plus-lg me-2"></i>Ajouter des amis
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}