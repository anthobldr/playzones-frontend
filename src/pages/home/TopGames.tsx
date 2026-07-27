import style from "./css/TopGames.module.css";
import { games } from "../../data/games";

export default function TopGames() {
    return (
        <section className={`container-fluid ${style.topGames} py-5 mt-5`}>
            <div className="text-center mb-5">
                <h2>
                    <i className="bi bi-controller me-2" aria-hidden="true"></i>
                    Nos jeux populaires
                </h2>

                <p className="text-secondary">
                    Choisis ton jeu et lance-toi dans l'aventure !
                </p>
            </div>

            <div className="d-flex justify-content-center gap-4 gap-lg-5 flex-wrap">
                {games.map((game) => (
                <article key={game.name} className={style.cardGame}>
                    <img src={game.img} alt={`Illustration du jeu ${game.name}`} />

                    <div className={style.cardContent}>
                        <h4>{game.name}</h4>

                        <p>{game.desc}</p>

                        <button className={style.playBtn}>Jouer</button>
                    </div>
                </article>
                ))}
            </div>
            <div className="text-center my-5">
                <a href="#" className={`text-decoration-none py-3 px-5 rounded-5 ${style.btnAllGames}`}>
                    Voir tous les jeux <i className="ps-3 fw-bold bi bi-grid" aria-hidden="true"></i>
                </a>
            </div>
        </section>
    );
}
