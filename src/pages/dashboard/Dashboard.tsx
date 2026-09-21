import { useAuth } from "../../hooks/useAuth";
import AsideBar from "../../components/layout/AsideBar";
import TopBar from "./components/TopBar";
import HistoryGames from "./components/HistoryGames";
import CardChallanges from "./components/CardChallenge";
import Activity from "./components/Activity";
import TrophyClassement from "./components/TrophyClassement";
import Footer from "../../components/layout/Footer";
import style from "./css/ProfilStatCard.module.css"

export default function Profil(){
    const { user } = useAuth();
    const stats = [
        {icon: "bi bi-dice-6-fill", colorClass: "gamesIcon", label: "Parties jouées", value: "2"},
        {icon: "bi bi-trophy-fill", colorClass: "trophyIcon", label: "Victoires", value: "1"},
        {icon: "bi bi-star-fill", colorClass: "scoreIcon", label: "Score actuel", value: "3"},
        {icon: "bi bi-patch-check-fill", colorClass: "badgeIcon", label: "Badge récent", value: "Noob"},
    ]
    const challenges = [
        {icon: "bi bi-trophy-fill", name: "Gagner 3 parties", desc: "2/3 parties gagnées.", value: "50", progress: 66, color: "#FFC72C"},
        {icon: "bi bi-patch-check-fill", name: "Jouer 2 parties de Puissance 4", desc: "1/2 parties jouées.", value: "30", progress: 50, color: "#4DA8DA"},
    ]

    return (
        <div className="container-fluid p-0">
            <div className="row mb-5">
                <div className="col-lg-2">
                    <AsideBar />
                </div>
                <div className="col-lg-10">
                    <TopBar />
                    <div className="row">
                        <div className="col-lg-8 px-4 px-lg-3">
                            <h1>Bonjour, {user.username} ! 👋</h1>
                            <span>Prêt pour une nouvelle partie ?</span>
                        </div>
                        <div className="col-lg-4">
                        </div>
                        <div className="d-flex gap-2 flex-wrap mt-3">
                            {stats.map((stat,index) => (
                                <ProfilStatCard key={index} icon={stat.icon} colorClass={style[stat.colorClass]} label={stat.label} value={stat.value} />
                            ))}
                        </div>
                        <div className="row my-4">
                            <div className="col-lg-7">
                                <HistoryGames />
                            </div>
                            <div className="col-lg-5">
                                <div className="bg-white shadow-sm rounded-4 py-4 px-4 h-100">
                                    <div className="d-flex justify-content-between px-2">
                                        <h2>Défis du jour</h2>
                                        <a href="#" className="text-decoration-none">Voir tout</a>
                                    </div>
                                    <div className="d-flex flex-column gap-lg-4 my-2">
                                        {challenges.map((challenge,index) =>(
                                            <CardChallanges key={index} icon={challenge.icon} name={challenge.name} desc={challenge.desc} value={challenge.value} progress={challenge.progress} color={challenge.color}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-7">
                                <Activity />
                            </div>
                            <div className="col-lg-5">
                                <TrophyClassement />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

interface ProfilStatCardProps {icon: string; colorClass: string; label: string; value: string;}

export function ProfilStatCard({ icon, colorClass, label, value }: ProfilStatCardProps) {
    return (
        <div className={`d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm px-4 py-3`}>
            <div className={`${style.statIcon} ${colorClass} rounded-circle d-flex justify-content-center align-items-center text-white flex-shrink-0`}>
                <i className={icon} aria-hidden="true"></i>
            </div>
            <div>
                <small className="text-muted">{label}</small>
                <p className={`statValue mb-0 fw-bold`}>{value}</p>
            </div>
        </div>
    );
}