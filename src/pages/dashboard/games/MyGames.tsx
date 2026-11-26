import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AsideBar from "@/components/layout/AsideBar";
import TopBar from "../components/TopBar";
import { useRealtimeEvent } from "@/hooks/useRealtimeEvent";
import { getAvatarUrl } from "@/services/avatar.service";
import * as gameService from "@/services/game.service";
import type { TicTacToeGame } from "@/types";

function getGameLabel(game: TicTacToeGame): string {
    switch (game.status) {
        case "pending":
            return game.yourSymbol === "X" ? "Invitation envoyée" : "Invitation reçue";
        case "draw":
            return "Match nul";
        case "won":
            return game.winnerId === game.opponent.id ? "Défaite" : "Victoire";
        default:
            return game.isYourTurn ? "À toi de jouer" : `Tour de ${game.opponent.username}`;
    }
}

export default function MyGames() {
    const [games, setGames] = useState<TicTacToeGame[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        async function loadGames() {
            try {
                const data = await gameService.getMyGames();
                if (!ignore) setGames(data);
            } catch (err) {
                if (!ignore) setError(err instanceof Error ? err.message : "Impossible de charger tes parties.");
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        loadGames();
        return () => { ignore = true; };
    }, []);

    // La liste se met à jour toute seule dès qu'une partie change
    useRealtimeEvent(() => {
        gameService.getMyGames().then(setGames).catch(() => {});
    });

    return (
        <div className="container-fluid p-0">
            <div className="row mb-5">
                <div className="col-lg-2">
                    <AsideBar />
                </div>
                <div className="col-lg-10 px-4">
                    <TopBar />
                    <div className="py-3">
                        <h1>Mes parties</h1>
                        <p>Retrouve les défis lancés par tes amis et tes parties en cours.</p>
                    </div>

                    {loading && <p>Chargement…</p>}
                    {error && <p role="alert" className="text-danger">{error}</p>}

                    {!loading && !error && games.length === 0 && (
                        <p>
                            Aucune partie pour l'instant. <Link to="/account/friends">Défie un ami</Link> pour commencer !
                        </p>
                    )}

                    {games.length > 0 && (
                        <ul className="list-unstyled d-flex flex-column gap-3 bg-white shadow-sm rounded-4 p-4">
                            {games.map((game) => (
                                <li key={game.id} className="border rounded-4 p-3 d-flex align-items-center gap-3">
                                    <img src={getAvatarUrl(game.opponent.avatar)} width={48} alt="" className="rounded-circle" />
                                    <div className="d-flex flex-column lh-sm">
                                        <span className="fw-semibold">Tic Tac Toe contre {game.opponent.username}</span>
                                        <small className={game.isYourTurn ? "text-success fw-semibold" : "text-secondary"}>{getGameLabel(game)}</small>
                                    </div>
                                    <Link to={`/account/games/tic-tac-toe/${game.id}`} className="btn border rounded-4 ms-auto">
                                        {game.isYourTurn ? "Jouer" : "Voir"}
                                        <span className="visually-hidden"> la partie contre {game.opponent.username}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
