import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AsideBar from "@/components/layout/AsideBar";
import TopBar from "../components/TopBar";
import { getAvatarUrl } from "@/services/avatar.service";
import * as gameService from "@/services/game.service";
import type { TicTacToeGame } from "@/types";
import style from "./css/TicTacToe.module.css";

const EMPTY_CELL = "-";

function getStatusMessage(game: TicTacToeGame): string {
    if (game.status === "draw") return "Match nul !";
    if (game.status === "won") {
        return game.winnerId === game.opponent.id ? `${game.opponent.username} a gagné.` : "Tu as gagné ! 🎉";
    }
    return game.isYourTurn ? `À toi de jouer (${game.yourSymbol}).` : `Tour de ${game.opponent.username}…`;
}

export default function TicTacToe() {
    const { id } = useParams();
    const gameId = Number(id);
    const [game, setGame] = useState<TicTacToeGame | null>(null);
    const [error, setError] = useState("");
    const [playing, setPlaying] = useState(false);

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

    async function handlePlay(cell: number) {
        if (!game) return;

        setError("");
        setPlaying(true);
        try {
            // On affiche la grille renvoyée par l'API : c'est elle qui fait foi
            setGame(await gameService.playMove(game.id, cell));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Coup refusé.");
        } finally {
            setPlaying(false);
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

                    {!game && error && <Link to="/account/friends">Retour à mes amis</Link>}

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
                                            onClick={() => handlePlay(index)}
                                            disabled={!isEmpty || !game.isYourTurn || playing}
                                            aria-label={`Case ${index + 1}, ${isEmpty ? "vide" : cell}`}
                                        >
                                            {isEmpty ? "" : cell}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}