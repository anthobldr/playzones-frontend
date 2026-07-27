import Footer from "../../components/layout/Footer"
import Navbar from "../../components/layout/Navbar"
import Hero from "../../components/layout/Hero"
import StatCard from "./StatCard";
import TopGames from "../../pages/home/TopGames"
import Features from "../../pages/home/Features"
import CTABanner from "../../pages/home/CTABanner"
import style from "./css/Home.module.css";

export default function Home() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Hero
                    title="Joue. Amuse-toi."
                    titleAccent="Gagne."
                    text={
                        <div className="lh-sm">
                            Découvre tes jeux de société préférés
                            <br className="d-none d-md-block" />
                            en ligne et défie des joueurs du monde entier !
                        </div>
                    }
                    imageSrc="/hero-cover.png"
                    imageAlt="Illustration de deux joueurs s'affrontant sur un plateau de jeu"
                >
                    <div className="d-flex gap-3 flex-wrap">
                        <button className={`btn ${style.btnPlay} text-white fw-semibold rounded-4 shadow px-4 py-3`}>
                            Jouer maintenant
                            <i className="bi bi-play-circle-fill ms-2" aria-hidden="true"></i>
                        </button>
                        <button className={`btn ${style.btnDiscover} bg-white border-0 fw-semibold rounded-4 shadow-sm px-4 py-3`}>
                            Découvrir les jeux
                            <i className="bi bi-controller ms-2" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="d-flex gap-3 flex-wrap mt-5">
                        <StatCard icon="bi bi-people-fill" colorClass={style.statIconPurple} label="Joueurs en ligne" value="1 248" />
                        <StatCard icon="bi bi-trophy-fill" colorClass={style.statIconYellow} label="Parties jouées" value="15 892" />
                    </div>
                </Hero>
                <TopGames />
                <Features />
                <CTABanner />
            </main>
            <Footer />
        </>
    )
}