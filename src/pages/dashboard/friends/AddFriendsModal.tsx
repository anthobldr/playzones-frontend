import { useEffect, useState } from "react";
import * as friendshipService from "../../../services/friendship.service";
import type { Player } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";
import { getAvatarUrl } from "../../../services/avatar.service";
import style from "./css/Friends.module.css"
interface AddFriendsModalProps {
  onFriendAdded: () => void;
  friends: Player[];
}

export default function AddFriendsModal({ onFriendAdded, friends }: AddFriendsModalProps) {
    const { user } = useAuth();
    const [searchPlayer, setSearchPlayer] = useState<string>("")
    const [suggestions, setSuggestions] = useState<Player[]>([])
    const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [sendingId, setSendingId]= useState<number | null>(null);
    const handleSendRequest = async (playerId: number) => {
        try{
            setSendingId(playerId)
            await friendshipService.sendFriendRequest(playerId);
            setSentRequests((prev) => new Set(prev).add(playerId));
            onFriendAdded();
        } catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchSuggestions = async (): Promise<void> => {
            try {
                setLoading(true)
                const response = await fetch("http://localhost:8000/players/getPlayers", {
                    credentials: "include",
                });
                
                if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
                
                const data: Player[] = await response.json();
                setSuggestions(data);
                setError(null);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
                setError(errorMessage);
                console.error("Erreur:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, []);
    const friendIds = new Set(friends.map((f) => f.id));
    const filteredSuggestions: Player[] = suggestions.filter((player) =>
        player.name.toLowerCase().includes(searchPlayer.toLowerCase()) &&
    player.id !== user?.id && !friendIds.has(player.id)
    );

    return (
        <div className="modal fade" id="addFriendsModal" tabIndex={-1} aria-labelledby="addFriendsModalLabel" aria-hidden="true">
            <div className="modal-dialog rounded-4">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column justify-content-center text-center">
                            <h1 className="modal-title fs-4 fw-bold" id="addFriendsModalLabel">
                                Ajouter des amis
                            </h1>
                            <p className="text-secondary">Rechercher des joueurs avec leur nom d'utilisateur et envoyez-leur une invitation.</p>
                        </div>
                        <div className="position-relative mx-3">
                            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
                            <input type="search" className="form-control ps-5 rounded-pill" placeholder="Rechercher un jeu, un joueur..." value={searchPlayer} onChange={(e) => setSearchPlayer(e.target.value)} />
                        </div>
                        <div className="my-4">
                            <h2 className="fs-5">Suggestions de joueurs</h2>
                            {loading && (
                                <div className="text-center my-3">
                                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                                        <span className="visually-hidden">Chargement...</span>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger my-3" role="alert">
                                    {error}
                                </div>
                            )}
                            {!loading && !error && (
                                <ul className="d-flex flex-column gap-2 list-unstyled my-3">
                                    {filteredSuggestions.length > 0 ? (
                                        filteredSuggestions.map((player) => (
                                            <li key={player.id} className="border d-flex gap-3 rounded-4 py-2 px-3 align-items-center">
                                                <div>
                                                    <img src={getAvatarUrl(player.avatar)} width={50} alt={`Avatar de ${player.name}`} className="rounded-circle"/>
                                                </div>
                                                <div className="d-flex flex-column lh-sm">
                                                    <span>{player.name}</span>
                                                    {player.online ? (
                                                        <small className="text-success">En ligne</small>
                                                    ) : (
                                                        <small className="text-secondary">Hors ligne</small>
                                                    )}
                                                </div>
                                                <div className="ms-auto">
                                                    {sentRequests.has(player.id) ? (
                                                        <button id={style.modalAddFriend} className="btn text-success border rounded-pill px-3" disabled>
                                                            <i className="bi bi-check-lg me-2"></i>Demande envoyée
                                                        </button>
                                                    ) : (
                                                        <button id={style.modalAddFriend} className="btn text-white border rounded-pill px-3" onClick={() => handleSendRequest(player.id)} disabled={sendingId === player.id}>
                                                            {sendingId === player.id ? (
                                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            ) : (
                                                                <i className="bi bi-plus-lg me-2"></i>
                                                            )}
                                                            {sendingId === player.id ? "Envoi..." : "Ajouter"}
                                                        </button>
                                                    )}
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-secondary text-center">Aucun joueur trouvé</p>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}