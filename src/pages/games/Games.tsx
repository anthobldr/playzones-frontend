import Navbar from "../../components/layout/Navbar"
import Hero from "../../components/layout/Hero"
import CardGames from "../../components/layout/CardGames"
import Footer from "../../components/layout/Footer";
import { games } from "../../data/games";
import style from "./css/Games.module.css"
export default function Games(){
    const filtres = [
        {icon: "bi bi-grid", name: "Tous les jeux"},
        {icon: "bi bi-stars", name: "Classiques"},
        {icon: "bi bi-bullseye", name: "Stratégie"},
    ]
    return(
        <>
        <header>
            <Navbar />
        </header>
        <main>
            <Hero
                title="Découvrez nos"
                titleAccent="Jeux."
                text={
                    <div className="lh-sm">
                        Explore des jeux de société incroyables,
                        <br className="d-none d-md-block" />
                        relève des défis et deviens le champion !
                    </div>
                }
                imageSrc="/hero-cover.png"
                imageAlt="Illustration de deux joueurs s'affrontant sur un plateau de jeu"
            >
                <div className="position-relative mb-5">
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
                    <input type="search" className="form-control ps-5 rounded-pill shadow-sm" placeholder="Rechercher un jeu..." style={{ width: "400px" }}/>
                </div>
            </Hero>
            <section className="container d-flex flex-column gap-3 mb-5">
                <div className="d-flex gap-3">
                    {filtres.map((filtre,index) =>(
                        <button key={index} className="btn bg-body border"><i className={`${filtre.icon} me-2`}> {filtre.name}</i></button>
                    ))}
                </div>
                <h2>Jeux populaires</h2>
                <div className="d-flex justify-content-between mb-0">
                    {games.map((game, index) => (
                        <CardGames key={index} img={game.img} game={game.name} desc={game.desc}>
                            <div className="d-flex justify-content-between mb-4">
                                <div className="border rounded-pill px-2 me-2">
                                    <i className="bi bi-people"></i><small>2 joueurs</small>
                                </div>
                                <div className="border rounded-pill px-2">
                                    <i className="bi bi-reception-2"></i><small>Facile</small>
                                </div>
                            </div>
                            <button className={style.playBtn}>Jouer</button> 
                        </CardGames>
                    ))}
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}