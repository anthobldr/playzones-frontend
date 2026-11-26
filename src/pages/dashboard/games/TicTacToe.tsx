import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AsideBar from "@/components/layout/AsideBar";
import TopBar from "../components/TopBar";
import { useRealtimeEvent } from "@/hooks/useRealtimeEvent";
import { getAvatarUrl } from "@/services/avatar.service";
import * as gameService from "@/services/game.service";
import type { TicTacToeGame } from "@/types";
import style from "./css/TicTacToe.module.css";

const EMPTY_CELL = "-";

function getStatusMessage(game: TicTacToeGame): string {
    switch (game.status) {
        case "pending":
            return game.yourSymbol === "X"
                ? `En attente de la réponse de ${game.opponent.username}…`
                : `${game.opponent.username} te défie !`;
        case "draw":
            return "Match nul !";
        case "won":
            return game.winnerId === game.opponent.id ? `${game.opponent.username} a gagné.` : "Tu as gagné ! 🎉";
        default:
            return game.isYourTurn ? `À toi de jouer (${game.yourSymbol}).` : `Tour de ${game.opponent.username}…`;
    }
}

export default function TicTacToe() {
    const { id } = useParams();
    const gameId = Number(id);
    const navigate = useNavigate();
    const [game, setGame] = useState<TicTacToeGame | null>(null);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        let ignore = false;

        async function loadGame() {
            try {
                const data = await gameService.getGame(gameId);
                if (!ignore) setGame(data);
            } catch (err) {
                if (!ignore) setError(err instanceof Error ? err.message : "Partie introuvable.");
            }
        }

        loadGame();
        return () => { ignore = true; };
    }, [gameId]);

    // Le coup de l'adversaire arrive en direct
    useRealtimeEvent((event) => {
        switch (event.type) {
            case "game.started":
            case "game.updated":
                if (event.game.id === gameId) {
                    setGame(event.game);
                    setError("");
                }
                break;
            case "game.invitation_removed":
                if (event.gameId === gameId) {
                    setGame(null);
                    setError("Ce défi a été annulé ou refusé.");
                }
                break;
            case "realtime.reconnected":
                // Un coup a pu être joué pendant la coupure : on relit l'état officiel
                gameService.getGame(gameId).then(setGame).catch(() => {});
                break;
        }
    });

    // Exécute une action sur la partie, affiche la grille renvoyée par l'API ou l'erreur
    async function runAction(action: () => Promise<TicTacToeGame>) {
        setError("");
        setBusy(true);
        try {
            setGame(await action());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Action refusée.");
        } finally {
            setBusy(false);
        }
    }

    async function handleRemoveInvitation() {
        setBusy(true);
        try {
            await gameService.removeInvitation(gameId);
        } catch {
            // L'invitation n'existe déjà plus
        }
        navigate("/account/games");
    }

    async function handleRematch(opponentId: number) {
        setBusy(true);
        try {
            const newGame = await gameService.challengeFriend(opponentId);
            navigate(`/account/games/tic-tac-toe/${newGame.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Impossible de relancer un défi.");
        } finally {
            setBusy(false);
        }
    }

    function handleForfeit() {
        if (window.confirm("Abandonner la partie ? Ton adversaire gagnera.")) {
            runAction(() => gameService.forfeitGame(gameId));
        }
    }

    return (
        <div className="container-fluid p-0">
            <div className="row mb-5">
                <div className="col-lg-2">
                    <AsideBar />
                </div>
                <div className="col-lg-10 px-4">
                    <TopBar />
                    <div className="py-3">
                        <h1>Tic Tac Toe</h1>
                        {game && (
                            <p className="d-flex align-items-center gap-2 mb-0">
                                <img src={getAvatarUrl(game.opponent.avatar)} width={32} alt="" className="rounded-circle" />
                                Contre {game.opponent.username}, tu joues les {game.yourSymbol}
                            </p>
                        )}
                    </div>

                    {error && <p role="alert" className="text-danger">{error}</p>}

                    {!game && !error && <p>Chargement de la partie…</p>}

                    {!game && error && <Link to="/account/games">Retour à mes parties</Link>}

                    {game && (
                        <section className="bg-white shadow-sm rounded-4 p-4 d-flex flex-column align-items-center gap-3" aria-labelledby="game-status">
                            <p id="game-status" role="status" className="fs-5 fw-semibold mb-0">{getStatusMessage(game)}</p>

                            <div className={style.board} role="group" aria-label="Grille de jeu">
                                {[...game.board].map((cell, index) => {
                                    const isEmpty = cell === EMPTY_CELL;
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`${style.cell} ${cell === "X" ? style.x : ""} ${cell === "O" ? style.o : ""}`}
                                            onClick={() => runAction(() => gameService.playMove(game.id, index))}
                                            disabled={!isEmpty || !game.isYourTurn || busy}
                                            aria-label={`Case ${index + 1}, ${isEmpty ? "vide" : cell}`}
                                        >
                                            {isEmpty ? "" : cell}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="d-flex gap-2 flex-wrap justify-content-center">
                                {game.status === "pending" && game.yourSymbol === "O" && (
                                    <>
                                        <button type="button" className="btn btn-primary rounded-4" disabled={busy} onClick={() => runAction(() => gameService.acceptInvitation(game.id))}>
                                            Accepter le défi
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary rounded-4" disabled={busy} onClick={handleRemoveInvitation}>
                                            Refuser
                                        </button>
                                    </>
                                )}
                                {game.status === "pending" && game.yourSymbol === "X" && (
                                    <button type="button" className="btn btn-outline-secondary rounded-4" disabled={busy} onClick={handleRemoveInvitation}>
                                        Annuler le défi
                                    </button>
                                )}
                                {game.status === "in_progress" && (
                                    <button type="button" className="btn btn-outline-danger rounded-4" disabled={busy} onClick={handleForfeit}>
                                        Abandonner
                                    </button>
                                )}
                                {(game.status === "won" || game.status === "draw") && (
                                    <>
                                        <button type="button" className="btn btn-primary rounded-4" disabled={busy} onClick={() => handleRematch(game.opponent.id)}>
                                            Revanche
                                        </button>
                                        <Link to="/account/games" className="btn btn-outline-secondary rounded-4">Mes parties</Link>
                                    </>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
