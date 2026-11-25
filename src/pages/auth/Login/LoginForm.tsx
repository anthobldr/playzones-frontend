import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import style from "../css/Auth.module.css";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    async function handleLogin(){
        setError("");
        setLoading(true);

        try {
            const data = await login(email, password);
            setUser(data.user);
            navigate("/account/dashboard");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Connexion impossible pour le moment.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="container mb-4">
            <div className="row">
                <div className="col-12 bg-white rounded-4 shadow ms-lg-5 px-5 py-3">
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            <i className="bi bi-exclamation-circle text-danger pe-2" aria-hidden="true"></i>
                            {error}
                        </div>
                    )}
                    <h2 className="my-4 fw-bold">Connexion</h2>
                    <form className="d-flex flex-column gap-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className="d-flex flex-column">
                            <label className={`fw-bold ${style.formLabel}`} htmlFor="login_email">Adresse e-mail</label>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2" aria-hidden="true">
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input id="login_email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control border-start-0 border-2" placeholder="exemple@playzone.com" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label className={`fw-bold ${style.formLabel}`} htmlFor="login_password">Mot de passe</label>
                            <div className="input-group pt-2 mb-3">
                                <span className="input-group-text bg-transparent border-end-0 border-2" aria-hidden="true">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input id="login_password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control border-start-0 border-2" placeholder="*******" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <Link className="text-decoration-none" to="/auth/forgot-password">Mot de passe oublié ?</Link>
                            <button type="submit" disabled={loading} className={`text-white my-4 py-2 rounded-4 border-0 ${style.submitButton}`}>
                                {loading ? "Connexion…" : "Se connecter"}
                                {!loading && <i className="bi bi-arrow-right-circle-fill ms-2" aria-hidden="true"></i>}
                            </button>
                        </div>
                    </form>
                    <p className="text-center">
                        Pas encore de compte ? <Link to="/auth/register">Créer un compte</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}