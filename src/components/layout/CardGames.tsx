import style from "./css/CardGames.module.css"
import { ReactNode } from "react";

interface CardGamesProps{img:string; game:string; desc:string; children?: ReactNode;}

export default function CardGames({img, game, desc, children}: CardGamesProps){
    return (
        <article className={style.cardGame}>
            <img src={img} alt={`Illustration du jeu ${game}`} />
            <div className={style.cardContent}>
                <h4>{game}</h4>
                <p>{desc}</p>
                {children ? (
                    children
                ) : (
                    <button className={style.playBtn}>Jouer</button>
                )}
            </div>
        </article>
    )
}