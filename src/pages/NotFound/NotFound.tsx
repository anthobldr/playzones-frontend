import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
    return (
        <>
            <header><Navbar /></header>
            <main className="container text-center my-5">
                <h1>Page introuvable</h1>
                <p>La page que tu cherches n'existe pas ou a été déplacée.</p>
                <Link to="/" className="btn bg-primary text-white rounded-pill">Retour à l'accueil</Link>
            </main>
            <Footer />
        </>
    );
}