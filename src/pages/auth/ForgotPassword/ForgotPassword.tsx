import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Footer from "@/components/layout/Footer";

export default function ForgotPassword(){
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Hero
                    title="Mot de passe"
                    titleAccent="oublié ?"
                    text={
                        <div className="lh-sm">
                            Pas de panique !
                            <br />
                            Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                        </div>
                    }
                    imageSrc="/hero-cover.png"
                    imageAlt="Illustration de deux joueurs s'affrontant sur un plateau de jeu"
                >
                    <ForgotPasswordForm />
                </Hero>
                <Footer />
            </main>
        </>
    )
}