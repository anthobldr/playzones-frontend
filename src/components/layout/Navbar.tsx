import style from "./Layout.module.css"
import { navLinks } from "../../data/navLinks";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
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
    )
}
