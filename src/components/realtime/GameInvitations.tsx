import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRealtimeEvent } from "@/hooks/useRealtimeEvent";
import { getAvatarUrl } from "@/services/avatar.service";
import * as gameService from "@/services/game.service";
import type { TicTacToeGame } from "@/types";
import style from "./css/GameInvitations.module.css";

interface Notice {
    id: number;
    message: string;
}

let nextNoticeId = 0;

const isReceivedInvitation = (game: TicTacToeGame) => game.status === "pending" && game.yourSymbol === "O";
const gamePath = (gameId: number) => `/account/games/tic-tac-toe/${gameId}`;

// Invitations reçues et messages de jeu, affichés sur toutes les pages
export default function GameInvitations() {
    const navigate = useNavigate();
    const [invitations, setInvitations] = useState<TicTacToeGame[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [busyId, setBusyId] = useState<number | null>(null);

    // Invitations reçues pendant que l'utilisateur n'était pas connecté
    useEffect(() => {
        let ignore = false;

        async function loadInvitations() {
            try {
                const games = await gameService.getMyGames();
                if (!ignore) setInvitations(games.filter(isReceivedInvitation));
            } catch {
                // Pas bloquant : les nouvelles invitations arriveront en temps réel
            }
        }

        loadInvitations();
        return () => { ignore = true; };
    }, []);

    const addNotice = (message: string) => {
        setNotices((current) => [...current, { id: ++nextNoticeId, message }]);
    };

    const removeFromList = (gameId: number) => {
        setInvitations((current) => current.filter((game) => game.id !== gameId));
    };

    useRealtimeEvent((event) => {
        switch (event.type) {
            case "game.invited":
                setInvitations((current) => [...current.filter((game) => game.id !== event.game.id), event.game]);
                break;
            case "game.invitation_removed": {
                const wasReceived = invitations.some((game) => game.id === event.gameId);
                removeFromList(event.gameId);
                addNotice(wasReceived ? `${event.by} a annulé son défi.` : `${event.by} a refusé ton défi.`);
                break;
            }
            case "game.started":
                // Les deux joueurs rejoignent la partie dès qu'elle est acceptée
                removeFromList(event.game.id);
                if (window.location.pathname !== gamePath(event.game.id)) {
                    navigate(gamePath(event.game.id));
                }
                break;
            case "realtime.reconnected":
                gameService.getMyGames()
                    .then((games) => setInvitations(games.filter(isReceivedInvitation)))
                    .catch(() => {});
                break;
        }
    });

    async function handleAccept(game: TicTacToeGame) {
        setBusyId(game.id);
        try {
            await gameService.acceptInvitation(game.id);
            removeFromList(game.id);
            navigate(gamePath(game.id));
        } catch (error) {
            addNotice(error instanceof Error ? error.message : "Impossible d'accepter le défi.");
            removeFromList(game.id);
        } finally {
            setBusyId(null);
        }
    }

    async function handleDecline(game: TicTacToeGame) {
        setBusyId(game.id);
        try {
            await gameService.removeInvitation(game.id);
        } catch {
            // L'invitation n'existe déjà plus : rien à faire
        } finally {
            removeFromList(game.id);
            setBusyId(null);
        }
    }

    return (
        // Zone "live" toujours présente : les lecteurs d'écran annoncent ce qui y apparaît
        <div className={style.stack} aria-live="polite">
            {invitations.map((game) => (
                <section key={game.id} className={`${style.card} shadow rounded-4 p-3`} aria-label={`Défi de ${game.opponent.username}`}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <img src={getAvatarUrl(game.opponent.avatar)} width={40} alt="" className="rounded-circle" />
                        <p className="mb-0"><strong>{game.opponent.username}</strong> te défie au Tic Tac Toe !</p>
                    </div>
                    <div className="d-flex gap-2 justify-content-end">
                        <button type="button" className="btn btn-outline-secondary btn-sm rounded-4" onClick={() => handleDecline(game)} disabled={busyId === game.id}>
                            Refuser
                        </button>
                        <button type="button" className="btn btn-primary btn-sm rounded-4" onClick={() => handleAccept(game)} disabled={busyId === game.id}>
                            Accepter
                        </button>
                    </div>
                </section>
            ))}

            {notices.map((notice) => (
                <div key={notice.id} className={`${style.card} shadow rounded-4 p-3 d-flex align-items-center gap-2`}>
                    <p className="mb-0">{notice.message}</p>
                    <button type="button" className="btn-close ms-auto" aria-label="Fermer le message" onClick={() => setNotices((current) => current.filter((n) => n.id !== notice.id))}></button>
                </div>
            ))}
        </div>
    );
}
