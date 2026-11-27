import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRealtimeEvent } from "@/hooks/useRealtimeEvent";
import * as gameService from "@/services/game.service";
import type { GameStats, TicTacToeGame } from "@/types";
import AsideBar from "../../components/layout/AsideBar";
import TopBar from "./components/TopBar";
import HistoryGames from "./components/HistoryGames";
import CurrentGames from "./components/CurrentGames";
import Footer from "../../components/layout/Footer";
import style from "./css/ProfilStatCard.module.css"

export default function Dashboard(){
    const { user } = useAuth();
    const [stats, setStats] = useState<GameStats | null>(null);
    const [games, setGames] = useState<TicTacToeGame[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function loadDashboard() {
            try {
                const [statsData, gamesData] = await Promise.all([gameService.getMyStats(), gameService.getMyGames()]);
                if (ignore) return;
                setStats(statsData);
                setGames(gamesData);
            } catch (err) {
                if (!ignore) setError(err instanceof Error ? err.message : "Impossible de charger ton tableau de bord.");
            }
        }

        loadDashboard();
        return () => { ignore = true; };
    }, []);

    useRealtimeEvent((event) => {
        if (event.type.startsWith("game.") || event.type === "realtime.reconnected") {
            gameService.getMyStats().then(setStats).catch(() => {});
            gameService.getMyGames().then(setGames).catch(() => {});
        }
    });

    const statCards = [
        {icon: "bi bi-dice-6-fill", colorClass: "gamesIcon", label: "Parties jouées", value: stats?.played},
        {icon: "bi bi-trophy-fill", colorClass: "trophyIcon", label: "Victoires", value: stats?.won},
        {icon: "bi bi-dash-circle-fill", colorClass: "scoreIcon", label: "Matchs nuls", value: stats?.draws},
        {icon: "bi bi-x-circle-fill", colorClass: "badgeIcon", label: "Défaites", value: stats?.lost},
    ];
    const finishedGames = games.filter((game) => game.status === "won" || game.status === "draw").slice(0, 3);
    const currentGames = games.filter((game) => game.status === "pending" || game.status === "in_progress");

    return (
        <div className="container-fluid p-0">
            <div className="row mb-5">
                <div className="col-lg-2">
                    <AsideBar />
                </div>
                <div className="col-lg-10">
                    <TopBar />
                    <div className="row">
                        <div className="col-12 col-lg-8 px-4 px-lg-3">
                            <h1>Bonjour, {user?.username} ! 👋</h1>
                            <span>Prêt pour une nouvelle partie ?</span>
                        </div>
                        {error && <p role="alert" className="text-danger mt-3">{error}</p>}
                        <div className="d-flex gap-2 flex-wrap mt-3">
                            {statCards.map((stat) => (
                                <ProfilStatCard key={stat.label} icon={stat.icon} colorClass={style[stat.colorClass]} label={stat.label} value={stats ? String(stat.value) : "…"} />
                            ))}
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-lg-7">
                                <HistoryGames games={finishedGames} />
                            </div>
                            <div className="col-12 col-lg-5">
                                <CurrentGames games={currentGames} />
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