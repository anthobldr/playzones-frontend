import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.services"
import { useAuth } from "../../hooks/useAuth";

import"./css/Auth.module.css" 

export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const { setUser } = useAuth();

    async function handleLogin(){
        try {
            const data = await login(email, password);
            setUser(data.user);
            navigate("/profil");
        } catch(error){
            if(error instanceof Error){
                setError(error.message);
            }
        }
    }
    
    return(
        <section className="container">
            <div className="row">
                <div className="col-lg-12 bg-body rounded-4 shadow ms-lg-5 px-5 py-3">
                    {error && <div className="alert alert-danger mt-3"><i className="bi bi-exclamation-circle text-danger pe-2"></i>{error}</div>}
                    <h2 className="my-4 fw-bold">Connexion</h2>
                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_email">Adresse e-mail</label>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2" id="input_email">
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control border-start-0 border-2" placeholder="exemple@playzone.com" aria-label="Adresse email" aria-describedby="input_email"/>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_password">Mot de passe</label>
                            <div className="input-group pt-2 mb-3">
                                <span className="input-group-text bg-transparent border-end-0 border-2" id="input_password">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control border-start-0 border-2" placeholder="*******" aria-label="Adresse email" aria-describedby="input_password" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <a className="text-decoration-none" href="#">Mot de passe oublié ?</a>
                            <button onClick={handleLogin} className="text-white my-4 py-2 rounded-4 border-0">
                                Se connecter <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}