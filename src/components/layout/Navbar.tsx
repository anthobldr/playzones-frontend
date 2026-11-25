import { Link, NavLink } from "react-router-dom";
import { navLinks } from "@/data/navLinks";
import { useAuth } from "@/hooks/useAuth";
import { getAvatarUrl } from "@/services/avatar.service";
import type { User } from "@/types";
import style from "./css/Navbar.module.css";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg" aria-label="Navigation principale">
            <div className="container-fluid">
                <Link to="/" className="d-flex align-items-center">
                    <img src="/logo.png" alt="PlayZone, retour à l'accueil" width="150" className="ms-lg-4" />
                </Link>

                {/* Bureau */}
                <div className="d-none d-lg-flex flex-grow-1 align-items-center">
                    <MainLinks className={`navbar-nav mx-auto gap-3 ${style.navList}`} />
                    {user ? <ProfileDropdown user={user} /> : <AuthButtons />}
                </div>

                {/* Mobile */}
                <button className="navbar-toggler bg-white shadow-sm menuBurger" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Ouvrir le menu de navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse d-lg-none shadow mobileMenu" id="mainMenu">
                    <MainLinks className={`navbar-nav mx-auto gap-3 px-3 ${style.navList}`} withIcons />
                    <hr className="my-5 mx-2" />
                    {user ? <MobileAccountLinks /> : <AuthButtons />}
                    <div className="text-center mt-4">
                        <img src="/responsive-navbar-img.png" alt="" width={200} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

function MainLinks({ className, withIcons = false }: { className: string; withIcons?: boolean }) {
    return (
        <ul className={className}>
            {navLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                    <NavLink
                        to={link.to}
                        end
                        className={({ isActive }) => `nav-link ${withIcons ? "ps-3" : ""} ${isActive ? `${style.active} rounded-4` : ""}`}
                    >
                        {withIcons && <i className={`${link.icon} menu-icon me-3`} aria-hidden="true"></i>}
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

function AuthButtons() {
    return (
        <div className="d-flex flex-column flex-lg-row gap-3 me-lg-3 px-3 px-lg-0 justify-content-center">
            <Link to="/auth/login" className={`btn rounded-5 px-3 py-2 ${style.btnConnexion}`}>
                <i className="bi bi-person me-2" aria-hidden="true"></i>Se connecter
            </Link>
            <Link to="/auth/register" className={`btn rounded-5 px-3 py-2 ${style.btnInscription}`}>
                <i className="bi bi-person-plus me-2" aria-hidden="true"></i>S'inscrire
            </Link>
        </div>
    );
}

function ProfileDropdown({ user }: { user: User }) {
    return (
        <div className="dropdown me-3">
            <button className="profile-btn btn rounded-pill d-flex align-items-center border-0 p-2 pe-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={getAvatarUrl(user.avatar)} alt="" className="rounded-circle" width="48" height="48" />
                <span className="text-start ms-3 lh-1">
                    <span className="d-block fw-semibold">{user.username}</span>
                    <small className="text-muted">Joueur</small>
                </span>
                <span className="border rounded-circle ms-4 d-flex align-items-center justify-content-center arrow-btn" aria-hidden="true">
                    <i className="bi bi-chevron-down dropdown-arrow"></i>
                </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 p-2 mt-2">
                <li>
                    <Link to="/account/dashboard" className="dropdown-item rounded-3">Tableau de bord</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                    <Link to="/auth/logout" className="dropdown-item rounded-3 text-danger">
                        <i className="bi bi-box-arrow-right me-2" aria-hidden="true"></i>Déconnexion
                    </Link>
                </li>
            </ul>
        </div>
    );
}

function MobileAccountLinks() {
    return (
        <ul className="d-flex flex-column gap-4 list-unstyled ps-3">
            <li>
                <Link to="/account/dashboard" className="text-decoration-none">Tableau de bord</Link>
            </li>
            <li>
                <Link to="/auth/logout" className="text-decoration-none text-danger">
                    <i className="bi bi-box-arrow-right me-2" aria-hidden="true"></i>Déconnexion
                </Link>
            </li>
        </ul>
    );
}