import style from "./css/CardGames.module.css"

interface CardGamesProps{img:string; game:string; desc:string;}

export default function CardGames({img, game, desc}: CardGamesProps){
    return (
        <article className={style.cardGame}>
            <img src={img} alt={`Illustration du jeu ${game}`} />
            <div className={style.cardContent}>
                <h4>{game}</h4>
                <p>{desc}</p>
                <button className={style.playBtn}>Jouer</button>
            </div>
        </article>
    )
}