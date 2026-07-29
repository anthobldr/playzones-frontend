import { useAuth } from "../../hooks/useAuth";
import "./css/Profil.css";

const profilMenu = [
    { label: "Mon profil", icon: "bi-person", action: "profile" },
    { label: "Paramètres", icon: "bi-gear", action: "settings" },
];

export default function TopBar() {
    const { user } = useAuth();

    const handleMenuClick = (action: string) => {
        console.log(action);
    };

    return (
        <header className="topbar d-flex justify-content-end align-items-center gap-4 my-2 me-5">
            <div className="position-relative">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
                <input type="search" className="form-control ps-5 rounded-pill" placeholder="Rechercher un jeu, un joueur..." style={{ width: "300px" }}/>
            </div>
            <button className="notification-btn btn bg-white border rounded-circle d-flex align-items-center justify-content-center position-relative" aria-label="Notifications">
                <i className="bi bi-bell fs-5"></i>
                <span className="badge-notification position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
            </button>
            <div className="dropdown">
                <button className="profile-btn btn rounded-pill d-flex align-items-center border-0 p-2 pe-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={"/profil/m-avatar.svg"} alt={`Avatar de ${user?.username ?? "Invité"}`} className="rounded-circle" width="48" height="48"/>
                    <div className="text-start ms-3">
                        <div className="fw-semibold">{user?.username ?? "Invité"}</div>
                        <small className="text-muted">Joueur</small>
                    </div>
                    <div className="border rounded-circle ms-4 d-flex align-items-center justify-content-center arrow-btn">
                        <i className="bi bi-chevron-down dropdown-arrow"></i>
                    </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 p-2 mt-2">
                    {profilMenu.map((item) => (
                        <li key={item.action}>
                            <button className="dropdown-item rounded-3" onClick={() => handleMenuClick(item.action)}>
                                <i className={`bi ${item.icon} me-2`}></i>
                                {item.label}
                            </button>
                        </li>
                    ))}
                    <li><hr className="dropdown-divider"/></li>
                    <li>
                        <button className="dropdown-item rounded-3 text-danger">
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Déconnexion
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}