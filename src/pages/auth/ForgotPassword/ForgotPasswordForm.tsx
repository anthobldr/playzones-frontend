import { Link } from "react-router-dom"
import { useState } from "react";
import { sendForgotPasswordEmail } from "@/services/auth.service";
import style from "./ForgotPassword.module.css"

export default function ForgotPasswordForm(){
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string>("");
    const [send, setSend] = useState<boolean>(false);
    async function handleSendEmail(){
        try{
            await sendForgotPasswordEmail(email);
            setSend(true);
        }catch(error){
            if(error instanceof Error){
                setError(error.message);
            }
        }
    }

    return (
        <section className="container mb-4">
            <div className="row">
                {!send ? (
                    <div className="col-12 bg-white shadow-sm rounded-4 py-4 py-lg-5 px-4">
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                <i className="bi bi-exclamation-circle text-danger pe-2" aria-hidden="true"></i>
                                {error}
                            </div>
                        )}
                        <div className="d-flex justify-content-center mb-2">
                            <i className={`bi bi-envelope-fill d-flex justify-content-center align-items-center rounded-circle ${style.emailIcon}`} />
                        </div>
                        <div className="text-center">
                            <h2>Récupérer mon<br /> <span className={style.primaryText}>mot de passe</span></h2>
                            <p className="lh-sm">
                                Entrez l'adresse e-mail associée à votre compte PlayZone.
                            </p>
                        </div>
                        <form className="d-flex flex-column gap-3 px-lg-5 mt-lg-4" onSubmit={(e) => {e.preventDefault(); handleSendEmail();}}>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2">
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} className="form-control border-start-0 border-2" placeholder="Adresse e-mail" />
                            </div>
                            <div className="d-flex flex-column gap-3 text-center">
                                <button type="submit" className="btn bg-primary text-white"><i className="bi bi-send-fill me-2"></i>Envoyer le lien</button>
                                <Link className="text-decoration-none text-cenetr" to="/auth/login"><i className="bi bi-arrow-left me-2"></i>Retour à la connexion</Link>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="col-12 col-lg-12 bg-white shadow-sm rounded-4 py-4 py-lg-5 px-3">
                        <div className="d-flex justify-content-center mb-2">
                            <i className={`bi bi-envelope-fill d-flex justify-content-center align-items-center rounded-circle ${style.emailIcon}`} />
                        </div>
                        <div className="text-center">
                            <h2>On a bien reçu<br /> <span className={style.primaryText}>votre demande !</span></h2>
                            <p className="lh-sm">
                                Si cette adresse e-mail est associée à un compte PlayZone, vous vous avons envoyé un lien de réinitialisation de mot de passe.
                            </p>
                        </div>
                        <div className={`${style.emailSection} col-12 col-lg-9 mx-auto d-flex gap-2 align-items-center text-start rounded-4 px-2 px-lg-3 py-3`}>
                            <i className={`bi bi-envelope-fill ${style.emailIconFilled}`} />
                            <div className="d-flex flex-column lh-sm">
                                <small className="text-secondary">Tu as reçu l'e-mail sur :</small>
                                <strong>{email}</strong>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 mx-auto d-flex flex-column gap-2 text-center mt-4">
                            <Link to={"/auth/login"} className="btn bg-primary text-white rounded-4"><i className="bi bi-arrow-left me-2"></i>Retour à la connexion</Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}