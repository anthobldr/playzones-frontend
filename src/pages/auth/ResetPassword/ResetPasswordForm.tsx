import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import style from "./ResetPassword.module.css";
import { resetPassword } from "@/services/auth.service";

export default function ResetPasswordForm(){
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function handleResetPassword(){
        if(password === confirmPassword){
            try{
                await resetPassword(token, password, confirmPassword);
                navigate("/auth/login");
            }catch(error){
                setError(error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.");
            }
        } else {
            setError("Les mots de passe ne correspondent pas.");
        }
    }
    return (
        <section className="container mb-4">
            <div className="row">
                <div className="col-12 bg-white shadow-sm rounded-4 py-4 py-lg-5 px-4">
                    <div className="d-flex justify-content-center mb-2">
                        <i className={`bi bi-lock-fill d-flex justify-content-center align-items-center rounded-circle ${style.securityIcon}`} />
                    </div>
                    <div className="text-center">
                        <span>{token}</span>
                        <h2>Définis ton nouveau <br /><span className={style.primaryText}>mot de passe</span></h2>
                        <p className="lh-sm">
                            Ton mot de passe doit contenir au moins 8 caractères, <br className="d-none d-lg-block"/> avec une majuscule, une minuscule et un chiffre.
                        </p>
                    </div>
                    <form className="d-flex flex-column gap-3 gap-lg-4" onSubmit={(e) => {e.preventDefault(); handleResetPassword();}}>
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_password">Nouveau mot de passe</label>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input id="input_password" type="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control border-start-0 border-2" placeholder="Saisi un nouveau mot de passe" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_confirmPassword">Confirme ton mot de passe</label>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input id="input_confirmPassword" type="password" autoComplete="new-password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="form-control border-start-0 border-2" placeholder="Confirme ton mot de passe" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <button type="submit" className="text-white my-4 py-2 rounded-4 border-0">
                               <i className="bi bi-lock-fill me-2"></i>Réinitialiser mon mot de passe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}