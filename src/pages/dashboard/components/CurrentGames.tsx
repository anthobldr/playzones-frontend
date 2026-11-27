import { Link } from "react-router-dom";
import { getAvatarUrl } from "@/services/avatar.service";
import type { TicTacToeGame } from "@/types";
import { getGameLabel } from "@/utils/gameLabel";

interface CurrentGamesProps {
    games: TicTacToeGame[];
}

export default function CurrentGames({ games }: CurrentGamesProps) {
    return (
        <section className="bg-white shadow-sm rounded-4 py-4 px-4 mt-4 m-lg-0 h-100" aria-labelledby="current-games-title">
            <div className="d-flex justify-content-between align-items-center">
                <h2 id="current-games-title">Parties en cours</h2>
                <Link to="/account/games" className="text-decoration-none">Voir tout</Link>
            </div>
            {games.length === 0 ? (
                <p className="text-secondary my-3">Aucune partie en cours.</p>
            ) : (
                <ul className="list-unstyled d-flex flex-column gap-3 my-3">
                    {games.map((game) => (
                        <li key={game.id} className="border rounded-4 p-3 d-flex align-items-center gap-3">
                            <img src={getAvatarUrl(game.opponent.avatar)} width={40} height={40} alt="" className="rounded-circle" />
                            <div className="d-flex flex-column lh-sm">
                                <span className="fw-semibold">{game.opponent.username}</span>
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
        </section>
    );
}
