import AsideBar from "./AsideBar";
import ProfilStatCard from "./ProfilStatCard";
import { useAuth } from "../../hooks/useAuth"
import TopBar from "./TopBar";
import "./css/Profil.css"
import style from "./css/ProfilStatCard.module.css"
import HistoryGames from "./GamesHistory";
import CardChallanges from "./CardChallenge";

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
        {icon: "bi bi-people-fill", name: "Inviter un ami", desc: "0/1 ami invité.", value: "20", progress: 0, color: "#E8558D"}
    ] 

    return (
        <div className="row g-0">
            <div className="col-lg-2">
                <AsideBar />
            </div>
            <div className="col-lg-10 ps-4">
                <TopBar />
                <div className="row mb-4">
                    <div className="col-lg-8">
                        <h1>Bonjour, {user.username} ! 👋</h1>
                        <span>Prêt pour une nouvelle partie ?</span>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="d-flex gap-2 flex-wrap mb-4">
                    {stats.map((stat,index) => (
                        <ProfilStatCard key={index} icon={stat.icon} colorClass={style[stat.colorClass]} label={stat.label} value={stat.value} />
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-7">
                        <HistoryGames />
                    </div>
                    <div className="col-lg-5">
                        <div className="d-flex justify-content-between px-2">
                            <h2>Défis du jour</h2>
                            <a href="#" className="text-decoration-none">Voir tout</a>
                        </div>
                        <div className="d-flex flex-column gap-2 my-2">
                            {challenges.map((challenge,index) =>(
                                <CardChallanges key={index} icon={challenge.icon} name={challenge.name} desc={challenge.desc} value={challenge.value} progress={challenge.progress} color={challenge.color}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}