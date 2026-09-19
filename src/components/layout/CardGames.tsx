import style from "./css/CardGames.module.css"
import { ReactNode } from "react";

interface CardGamesProps{img:string; game:string; desc:string; children?: ReactNode;}

export default function CardGames({img, game, desc, children}: CardGamesProps){
    return (
        <article className={`${style.cardGame} d-flex flex-column overflow-hidden rounded-4 shadow`}>
            <img src={img} alt={`Illustration du jeu ${game}`} className="object-fit-cover"/>
            <div className={`d-flex flex-column align-items-center flex-grow-1 text-center py-3 px-lg-4`}>
                <h4>{game}</h4>
                <p>{desc}</p>
                {children ? (
                    children
                ) : (
                    <button className={`${style.playBtn} px-5 py-2 rounded-pill fw-bold`}>Jouer</button>
                )}
            </div>
        </article>
    )
}