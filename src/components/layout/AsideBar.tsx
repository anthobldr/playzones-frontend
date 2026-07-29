import { Link, useLocation } from "react-router-dom"
import style from "./css/AsideBar.module.css"
export default function AsideBar(){
    const location = useLocation();
    const pathname = location.pathname;
    const items = [
        {icon: "bi bi-house", label: "Tableau de bord", to: "/account/dashboard"},
        {icon: "bi bi-controller", label: "Découvrir", to: "/decouvrir"},
        {icon: "bi bi-dice-3", label: "Mes jeux", to: "/mygames"},
        {icon: "bi bi-flag", label: "Défis", to: "/defis"},
        {icon: "bi bi-trophy", label: "Classements", to: "/scoreboard"},
        {icon: "bi bi-people", label: "Amis", to: "/friends"},
        {icon: "bi bi-chat-dots", label: "Messages", to: "/messages"},
        {icon: "bi bi-person", label: "Profil", to: "/account/profil"},
        {icon: "bi bi-gear", label: "Paramètres", to: "/settings"},
    ]
    return (
        <aside className="d-flex flex-column bg-body h-100">
            <div className="d-flex align-items-center my-3">
                <img src="/logo.png" alt="Logo PlayZone" width="150" className="ms-4" />
            </div>
            <ul className="d-flex flex-column gap-3 list-unstyled mx-3 my-4">
                {
                    items.map((item,index) => (
                        <li className={`d-flex align-items-center rounded-3 px-3 py-1 ${pathname === item.to ? style.menuActive : ""}`} key={index}>
                            <i className={`${item.icon} menu-icon me-3 ${pathname === item.to ? "text-white" : ""}`}></i>
                            <Link className={`text-decoration-none ${pathname === item.to ? "text-white" : ""}`} to={item.to}>{item.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )
}