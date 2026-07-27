import Footer from "../../components/layout/Footer"
import Hero from "../../components/layout/Hero"
import Navbar from "../../components/layout/Navbar"
import CTABanner from "../home/CTABanner"
import LoginForm from "./LoginForm"

export default function Login(){
    return (
        <>
        <Navbar />
        <Hero
            title="Content de te"
            titleAccent="revoir !"
            text={
                <div className="lh-sm">
                    Reconnecte-toi et replonge dans
                    <br className="d-none d-md-block" />
                    l'univers du jeu et du fun.
                </div>
            }
            imageSrc="/hero-cover.png"
            imageAlt="Illustration de deux joueurs s'affrontant sur un plateau de jeu"
        >
            <LoginForm />
            </Hero>
            <CTABanner />
            <Footer />
        </>
    )
}