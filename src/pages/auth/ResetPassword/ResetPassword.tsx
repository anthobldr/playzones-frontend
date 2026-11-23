import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword(){
    return (
        <>
        <header>
            <Navbar />
        </header>
        <main>
            <Hero
                title="Nouveau"
                titleAccent="mot de passe"
                text={
                    <div className="lh-sm">
                        Choisis un nouveau mot de passe sécurisé
                        <br />
                        pour retrouver l'accès à ton compte PlayZone.
                    </div>
                }
                imageSrc="/hero-cover.png"
                imageAlt="Illustration de deux joueurs s'affrontant sur un plateau de jeu"
            >
            <ResetPasswordForm />
            </Hero>
        </main>
    </>
    )
}