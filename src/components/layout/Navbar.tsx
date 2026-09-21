import { navLinks } from "../../data/navLinks";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/auth.service";
import { getAvatarUrl } from "../../services/avatar.service";
import style from "./css/Navbar.module.css"

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
                            <img src="/logo.png" alt="Logo PlayZone" width="150" className="ms-lg-4" />
                        </div>
                        <div className="d-none d-lg-flex flex-grow-1">
                            <ul className={`navbar-nav mx-auto text-lg-start ps-3 ps-lg-0 mt-5 my-lg-0 mb-lg-0 gap-3 ${style.navList}`}>
                                {navLinks.map((link, index) => (
                                    <li className="nav-item" key={link.label}>
                                        <Link className={`nav-link ${index === 0 ? style.active : ""}`} to={link.to}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <hr className="d-lg-none my-5"/>
                            <div className="d-flex flex-column flex-lg-row gap-3 me-lg-3 px-3 px-lg-0 flex-wrap justify-content-center">
                                <Link to="/auth/login" className={`btn rounded-5 px-3 py-2 ${style.btnConnexion}`}>
                                    <i className="bi bi-person me-2" aria-hidden="true"></i>Se connecter
                                </Link>
                                <Link to="/auth/register" className={`btn rounded-5 px-3 py-2 ${style.btnInscription}`}>
                                    <i className="bi bi-person-plus me-2" aria-hidden="true"></i>S'inscrire
                                </Link>
                            </div>
                        </div>
                        {/* Menu burger + Responsive navbar */}
                        <button className={`navbar-toggler bg-white shadow-sm menuBurger`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Ouvrir le menu de navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse d-lg-none shadow mobileMenu`} id="navbarSupportedContent">
                            <ul className={`navbar-nav mx-auto gap-3 px-3 ${style.navList}`}>
                                {navLinks.map((link, index) => (
                                    <li className="nav-item" key={link.label}>
                                        <Link className={`nav-link ps-3 ${index === 0 ? `${style.active} rounded-4 py-3 text-decoration-none` : ""}`} to={link.to}>
                                            <i className={`${link.icon} menu-icon me-3`}></i>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <hr className="d-lg-none my-5 mx-2"/>
                            <div className="d-flex flex-column flex-lg-row gap-3 me-lg-3 px-3 px-lg-0 flex-wrap justify-content-center">
                                <Link to="/auth/login" className={`btn rounded-5 px-3 py-2 ${style.btnConnexion}`}>
                                    <i className="bi bi-person me-2" aria-hidden="true"></i>Se connecter
                                </Link>
                                <Link to="/auth/register" className={`btn rounded-5 px-3 py-2 ${style.btnInscription}`}>
                                    <i className="bi bi-person-plus me-2" aria-hidden="true"></i>S'inscrire
                                </Link>
                            </div>
                            <div className="text-center mt-5">
                                <img src="/responsive-navbar-img.png" alt="" width={210}/>
                            </div>
                        </div>
                    </div>
                </nav>
            )}

            {user && (
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <button className={`navbar-toggler bg-white shadow-sm menuBurger`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Ouvrir le menu de navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="d-flex">
                            <img src="/logo.png" alt="Logo PlayZone" width="150" className="ms-lg-4" />
                        </div>
                        <button className="d-lg-none btn rounded-pill d-flex align-items-center border-0 p-2 pe-3">
                            <img src={getAvatarUrl(user?.avatar)} alt={`Avatar de ${user?.username ?? "Invité"}`} className={`rounded-circle ${style.navbarAvatar}`} />
                        </button>
                        <div className="d-none d-lg-flex flex-grow-1 align-items-center">
                            <ul className={`navbar-nav mx-auto text-lg-start ps-3 ps-lg-0 mt-5 my-lg-0 mb-lg-0 gap-3 ${style.navList}`}>
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
                        {/* Menu burger + Responsive navbar */}
                        <div className={`collapse d-lg-none shadow mobileMenu`} id="navbarSupportedContent">
                            <ul className={`navbar-nav mx-auto gap-3 px-3 ${style.navList}`}>
                                {navLinks.map((link, index) => (
                                    <li className="nav-item" key={link.label}>
                                        <Link className={`nav-link ps-3 ${index === 0 ? `${style.active} rounded-4 py-3 text-decoration-none` : ""}`} to={link.to}>
                                            <i className={`${link.icon} menu-icon me-3`}></i>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <hr className="d-lg-none my-5 mx-2"/>
                            <div className="d-flex flex-column flex-lg-row gap-3 me-lg-3 px-3 px-lg-0 flex-wrap justify-content-center">
                                <ul className="d-flex flex-column gap-4 list-unstyled">
                                    <li className="ps-3">
                                        <Link to="/account/dashboard" className="dropdown-item rounded-3">Tableau de bord</Link>
                                    </li>
                                    <li className="ps-3 text-danger">
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        <Link to={"/auth/logout"} className="text-decoration-none text-danger">Deconnexion</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center mt-2">
                                <img src="/responsive-navbar-img.png" alt="" width={200}/>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}