import { Link, useLocation } from "react-router-dom"
import "./css/Profil.css"
export default function AsideBar(){
    const location = useLocation();
    const pathname = location.pathname;
    const items = [
        {icon: "bi bi-house", label: "Tableau de bord", to: "/profil"},
        {icon: "bi bi-controller", label: "Découvrir", to: "/decouvrir"},
        {icon: "bi bi-dice-3", label: "Mes jeux", to: "/mygames"},
        {icon: "bi bi-flag", label: "Défis", to: "/defis"},
        {icon: "bi bi-trophy", label: "Classements", to: "/scoreboard"},
        {icon: "bi bi-people", label: "Amis", to: "/friends"},
        {icon: "bi bi-chat-dots", label: "Messages", to: "/messages"},
        {icon: "bi bi-person", label: "Profil", to: "/profile"},
        {icon: "bi bi-gear", label: "Paramètres", to: "/settings"},
    ]
    return (
        <aside className="d-flex flex-column bg-body h-100">
            <div className="d-flex align-items-center my-3">
                <img src="/logo.png" alt="Logo PlayZone" width="150" className="ms-4" />
            </div>
            <ul className="d-flex flex-column gap-2">
                {
                    items.map((item,index) => (
                        <li className={`d-flex align-items-center rounded-3 px-3 py-1 ${pathname === item.to ? "menu-active" : ""}`} key={index}>
                            <i className={`${item.icon} menu-icon me-2 ${pathname === item.to ? "text-white" : ""}`}></i>
                            <Link className={`text-decoration-none ${pathname === item.to ? "text-white" : ""}`} to={item.to}>{item.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )
}