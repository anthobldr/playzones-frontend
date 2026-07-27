import { Link } from "react-router-dom"
import style from "./css/CTABanner.module.css"

export default function CTABanner() {
    return (
        <div className={`container rounded-5 py-4 mb-5 ${style.ctaBanner}`}>
            <div className="row align-items-center g-4">
                <div className={`col-12 col-md-4 order-2 order-md-1 text-center ${style.imageContainer}`}>
                    <img src="/cta-icon.png" alt="Mascotte de PlayZone" className={style.characterImage} />
                </div>

                <div className="col-12 col-md-4 order-1 order-md-2 text-center">
                    <h2 className="text-white">Prêt à t'amuser ?</h2>
                    <p className="text-white">
                        Rejoins des milliers de joueurs et commence l'aventure maintenant !
                    </p>
                    <Link to="/register" className="btn bg-warning rounded-5 px-4 py-1">
                        Créer un compte <i className="ps-1 bi bi-person-fill-add" aria-hidden="true"></i>
                    </Link>
                </div>

                <div className={`col-12 col-md-4 order-3 text-center ${style.imageContainer}`}>
                    <img src="/image.png" alt="Illustration de joueurs célébrant une victoire" className={style.desImage} />
                </div>
            </div>
        </div>
    )
}
