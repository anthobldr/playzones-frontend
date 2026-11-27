import { Link } from "react-router-dom";
import type { TicTacToeGame } from "@/types";
import { getGameLabel } from "@/utils/gameLabel";
import style from "../css/HistoryCardGames.module.css";

interface HistoryGamesProps {
    games: TicTacToeGame[];
}

export default function HistoryGames({ games }: HistoryGamesProps) {
    return (
        <section className="bg-white shadow-sm rounded-4 py-4 py-lg-3 px-3 px-lg-4 h-100" aria-labelledby="history-title">
            <h2 id="history-title">Tes dernières parties</h2>
            {games.length === 0 ? (
                <p className="text-secondary my-3">
                    Aucune partie terminée. <Link to="/account/friends">Défie un ami</Link> pour commencer !
                </p>
            ) : (
                <ul className="list-unstyled d-flex gap-2 gap-lg-4 flex-wrap my-3">
                    {games.map((game) => {
                        const label = getGameLabel(game);
                        const statusClass = label === "Victoire" ? style.win : label === "Défaite" ? style.loose : style.draw;

                        return (
                            <li key={game.id}>
                                <Link to={`/account/games/tic-tac-toe/${game.id}`} className={`d-block text-decoration-none text-reset shadow-sm ${style.cardGame}`}>
                                    <img src="/games/tictactoe.png" alt="" />
                                    <div className={style.cardContent}>
                                        <h3 className="h5">Tic Tac Toe</h3>
                                        <small>Contre {game.opponent.username}</small>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className={`${statusClass} ${style.cardStatus} rounded-circle`} aria-hidden="true"></span>
                                            <small className="fw-semibold">{label}</small>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
