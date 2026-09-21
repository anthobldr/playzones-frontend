import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { getAvatarUrl } from "../../../services/avatar.service";
import { items } from "../../../data/dashboardNavLinks";
import "../css/Profil.css";

const profilMenu = [
    { label: "Mon profil", icon: "bi-person", action: "profile" },
    { label: "Paramètres", icon: "bi-gear", action: "settings" },
];

export default function TopBar() {
    const pathname = location.pathname;
    const { user } = useAuth();

    return (
        <section className="py-3 px-2">
            <div className="d-flex d-lg-none justify-content-between">
                <div className="d-flex gap-1 align-items-center">
                    <button className={`navbar-toggler bg-white shadow-sm menuBurger`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Ouvrir le menu de navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse d-lg-none shadow mobileMenu py-4`} id="navbarSupportedContent">
                        <ul className={`navbar-nav mx-auto gap-2 px-3`}>
                            {items.map((item) => (
                            <li className={`py-2 ps-2 rounded-3 text-decoration-none ${pathname === item.to ? "bg-primary" : ""}`}>
                                <Link className={`text-decoration-none text-black ${pathname === item.to ? "text-white" : ""}`} to={item.to}>
                                    <i className={`bi ${item.icon} me-2`}></i>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        </ul>
                        <div className="text-center mt-5">
                            <img src="/responsive-navbar-img.png" alt="" width={200}/>
                        </div>
                    </div>
                    <img src="/logo.png" alt="Logo PlayZone" width="150" />
                </div>
                <div className="d-flex gap-3">
                    <button className="notification-btn btn bg-white border rounded-circle d-flex align-items-center justify-content-center position-relative" aria-label="Notifications">
                        <i className="bi bi-bell fs-5"></i>
                        <span className="badge-notification position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
                    </button>
                    <img src={getAvatarUrl(user?.avatar)} alt={`Avatar de ${user?.username ?? "Invité"}`} className="rounded-circle" width="44" height="44"/>
                </div>
            </div>
            <div className="d-none topbar d-lg-flex justify-content-lg-end align-items-center gap-lg-4 my-lg-2 me-lg-5">
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
                        <img src={getAvatarUrl(user?.avatar)} alt={`Avatar de ${user?.username ?? "Invité"}`} className="rounded-circle" width="48" height="48"/>
                        <div className="text-start ms-3 lh-1">
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
                                <Link to={"/auth/logout"} className="text-decoration-none text-danger">Deconnexion</Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}