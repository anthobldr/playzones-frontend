import { useAuth } from "../../hooks/useAuth";
import AsideBar from "../../components/layout/AsideBar";
import TopBar from "./TopBar";
import ProfilStatCard from "./ProfilStatCard";
import style from "./css/ProfilStatCard.module.css"
import HistoryGames from "./HistoryGames";
import CardChallanges from "./CardChallenge";
import Activity from "./Activity";
import TrophyClassement from "./TrophyClassement";
import Footer from "../../components/layout/Footer";

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
                        <div className="col-lg-8">
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
        </div>
    )
}