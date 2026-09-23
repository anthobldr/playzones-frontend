import Footer from "@/components/layout/Footer"
import Hero from "@/components/layout/Hero"
import Navbar from "@/components/layout/Navbar"
import RegisterForm from "./RegisterForm"
import CTABanner from "@/pages/home/components/CTABanner"

export default function Register(){
    return (
            <>
            <Navbar />
            <Hero
                title="Rejoins"
                titleAccent="l'aventure !"
                text={
                    <div className="lh-sm">
                        Crée ton compte et découvre
                        <br className="d-none d-md-block" />
                        un monde de jeux et de défis.
                    </div>
                }
                imageSrc="/hero-cover.png"
                imageAlt="Illustration de deux joueurs s'affrontant sur un plateau de jeu"
            >
                <RegisterForm />
                </Hero>
                <CTABanner />
                <Footer />
            </>
        )
}