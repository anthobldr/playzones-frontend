import style from "./Layout.module.css"
import { navLinks } from "../../data/navLinks";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/auth.service";
import { getAvatarUrl } from "../../services/avatar.service";

export default function Navbar() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        setUser(null);
        navigate("/");
    }

    return (
        <>
            {!user && (
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <img src="/logo.png" alt="Logo PlayZone" width="150" className="ms-4" />
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Ouvrir le menu de navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className={`d-flex navbar-nav mx-auto mb-2 mb-lg-0 gap-3 ${style.navList}`}>
                                {navLinks.map((link, index) => (
                                    <li className="nav-item" key={link.label}>
                                        <Link className={`nav-link ${index === 0 ? style.active : ""}`} to={link.to}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex gap-3 me-3 flex-wrap justify-content-center">
                                <Link to="/auth/login" className={`btn rounded-5 px-3 py-2 ${style.btnConnexion}`}>
                                    <i className="bi bi-person me-2" aria-hidden="true"></i>Se connecter
                                </Link>
                                <Link to="/auth/register" className={`btn rounded-5 px-3 py-2 ${style.btnInscription}`}>
                                    <i className="bi bi-person-plus me-2" aria-hidden="true"></i>S'inscrire
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            )}

            {user && (
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <img src="/logo.png" alt="Logo PlayZone" width="150" className="ms-4" />
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Ouvrir le menu de navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className={`d-flex navbar-nav mx-auto mb-2 mb-lg-0 gap-3 ${style.navList}`}>
                                {navLinks.map((link, index) => (
                                    <li className="nav-item" key={link.label}>
                                        <Link className={`nav-link ${index === 0 ? style.active : ""}`} to={link.to}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex gap-3 me-3 flex-wrap justify-content-center align-items-center">
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
                                        <li>
                                            <Link to="/account/dashboard" className="dropdown-item rounded-3">
                                                Tableau de bord
                                            </Link>
                                        </li>
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
                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}