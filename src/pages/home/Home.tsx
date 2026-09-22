import Footer from "../../components/layout/Footer"
import Navbar from "../../components/layout/Navbar"
import Hero from "../../components/layout/Hero"
import TopGames from "./components/TopGames"
import Features from "./components/Features"
import CTABanner from "./components/CTABanner"
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
                    <div className="d-flex gap-3">
                        <button className={`btn btn-sm ${style.btnPlay} text-white fw-semibold rounded-4 shadow px-4 px-lg-4 py-3 py-lg-3`}>
                            <i className="bi bi-play-circle-fill me-2" aria-hidden="true"></i>
                            Jouer maintenant
                        </button>
                        <button className={`btn btn-sm ${style.btnDiscover} bg-white border-0 fw-semibold rounded-4 shadow-sm px-4 px-lg-4 py-3 py-lg-3`}>
                            <i className="bi bi-controller me-2" aria-hidden="true"></i>
                            Découvrir les jeux
                        </button>
                    </div>
                    <div className="d-flex gap-3 flex-wrap  mt-4 mt-lg-5">
                        <StatCard icon="bi bi-people-fill" colorClass={style.statIconPurple} label="Joueurs en ligne" value="1 248" />
                        <StatCard icon="bi bi-trophy-fill" colorClass={style.statIconYellow} label="Parties jouées" value="15 892" />
                    </div>
                </Hero>
                <TopGames />
                <Features />
                <CTABanner />
                <Footer />
            </main>
        </>
    )
}

interface StatCardProps {icon: string; colorClass: string; label: string; value: string;}

function StatCard({ icon, colorClass, label, value }: StatCardProps) {
    return (
        <div className={`${style.statCard} d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm px-2 px-lg-4 py-3 py-lg-3`}>
            <div className={`${style.statIcon} ${colorClass} rounded-circle d-flex justify-content-center align-items-center text-white flex-shrink-0`}>
                <i className={icon} aria-hidden="true"></i>
            </div>
            <div>
                <small className="text-muted">{label}</small>
                <p className={`${style.statValue} mb-0 fw-bold`}>{value}</p>
            </div>
        </div>
    );
}