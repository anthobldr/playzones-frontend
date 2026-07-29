import style from "./css/HistoryCardGames.module.css"
interface HistoryCardGames{img:string; game:string; desc:string; win:boolean;}

export default function HistoryGames(){
    const history = [
        { img: "/games/tictactoe.png", name: "Tic Tac Toe", desc: "Contre Adila", win: true},
        { img: "/games/dames.png", name: "Dames", desc: "Contre Lucas", win: false},
        { img: "/games/puissance4.png", name: "Puissance 4", desc: "Contre Sarah", win: false},
    ];

    return (
        <div className="bg-white shadow-sm rounded-4 py-3 px-4">
            <h2>Historique de vos parties</h2>
            <div className="d-flex gap-4 gap-lg-4 flex-wrap my-3">
                {history.map((card,index) => (
                    <HistoryCardGames key={index} img={card.img} game={card.name} desc={card.desc} win={card.win}/>
                ))}        
            </div>
        </div>
    )
}

function HistoryCardGames({img, game, desc, win}: HistoryCardGames){
    return (
        <article className={style.cardGame}>
            <img src={img} alt={`Illustration du jeu ${game}`} />
            <div className={style.cardContent}>
                <h4>{game}</h4>
                <div className="d-flex align-items-center gap-2">
                    <span className={`${win ? `${style.win}` : `${style.loose}`} ${style.cardStatus} rounded-circle`}></span>
                    <small>{desc}</small>
                </div>
            </div>
        </article>
    )
}