import style from "./css/Footer.module.css";
import { navLinks } from "../../data/navLinks";

const legalLinks = [
    "Conditions d'utilisation",
    "Politique de confidentialité",
    "Mentions légales",
];

const socialLinks = [
    { icon: "bi-discord", label: "Discord", href: "#" },
    { icon: "bi-facebook", label: "Facebook", href: "#" },
    { icon: "bi-instagram", label: "Instagram", href: "#" },
    { icon: "bi-twitter-x", label: "Twitter / X", href: "#" },
];

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className="row py-5 px-4 px-lg-5 M-0">
                <div className="col-12 col-lg-3 mb-4 mb-lg-0">
                    <h2 className="text-white">Play<span className="text-warning">Zone</span></h2>
                    <p className="text-white">
                        La meilleure expérience de jeux de société en ligne. Amuse-toi, défie, gagne !
                    </p>
                </div>
                <div className="col-6 col-lg-3 mb-4 mb-lg-0">
                    <h5 className="text-white text-center">Navigation</h5>
                    <ul className="list-unstyled d-flex flex-column gap-2 text-center">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} className="text-white text-decoration-none">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-6 col-lg-3 mb-4 mb-lg-0">
                    <h5 className="text-white text-center">Légal</h5>
                    <ul className="list-unstyled d-flex flex-column gap-2 text-center">
                        {legalLinks.map((label) => (
                            <li key={label}>
                                <a href="#" className="text-white text-decoration-none">{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className="d-lg-none text-warning"/>
                <div className="col-12 col-lg-3">
                    <h5 className="text-white text-center text-lg-start">Suivez-nous</h5>
                    <div className="d-flex justify-content-center justify-content-lg-start gap-4 my-3">
                        {socialLinks.map((social) => (
                            <a key={social.icon} href={social.href} aria-label={social.label} className="text-white">
                                <i className={`bi ${social.icon} fs-2`} aria-hidden="true"></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
