import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/auth.service";
import checkPassword, { passwordsMatch } from "../../../utils/passwordValidator";

type FieldStatus = "" | "is-valid" | "is-invalid";
const COLORS = ["#dc3545", "#dc3545", "#fd7e14", "#ffc107", "#198754"];
const LABELS = ["", "Faible", "Moyenne", "Bonne", "Excellente"];

export default function RegisterForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [passwordStatus, setPasswordStatus] = useState<FieldStatus>("");
    const [passwordScore, setPasswordScore] = useState(0);
    const [confirmStatus, setConfirmStatus] = useState<FieldStatus>("");

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setPassword(value);

        const result = checkPassword(value);
        setPasswordStatus(result.isValid ? "is-valid" : "is-invalid");
        setPasswordScore(result.score);

        if (confirmPassword) {
            setConfirmStatus(passwordsMatch(value, confirmPassword) ? "is-valid" : "is-invalid");
        }
    }

    function handleConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmStatus(passwordsMatch(password, value) ? "is-valid" : "is-invalid");
    }
    
    async function handleRegister() {
        setError("");

        // Respecte les conditions ?
        if (passwordStatus !== "is-valid") {
            setError("Le mot de passe ne respecte pas les critères requis.");
            return;
        }

        // Les deux mots de passe correspondent ?
        if (!passwordsMatch(password, confirmPassword)) {
            setError("Les mots de passe ne correspondent pas.");
            setConfirmStatus("is-invalid");
            return;
        }

        try{
            await register(email, username, password, confirmPassword);

            navigate("/auth/confirmation?email=" +encodeURIComponent(email));
        } catch(error){
            setError(error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.");
        }
    }

    return (
        <section className="container mb-4">
            <div className="row">
                <div className="col-12 bg-white rounded-4 shadow ms-lg-5 px-4 px-lg-5 py-2 py-lg-3">
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert" aria-live="polite">
                            <i className="bi bi-exclamation-circle text-danger pe-2"></i>
                            {error}
                        </div>
                    )}
                    <h2 className="my-4 fw-bold">Inscription</h2>
                    <form className="d-flex flex-column gap-4" onSubmit={(e) => {e.preventDefault(); handleRegister();}}>
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_email">Adresse e-mail</label>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2">
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input id="input_email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control border-start-0 border-2" placeholder="exemple@playzone.com" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_pseudo">Pseudo</label>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2">
                                    <i className="bi bi-person"></i>
                                </span>
                                <input id="input_pseudo" type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control border-start-0 border-2" placeholder="pseudo" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_password">Mot de passe</label>
                            <div className="input-group pt-2">
                                <span className={`input-group-text bg-transparent border-end-0 border-2 ${passwordStatus === "is-valid" ? "border-success" : passwordStatus === "is-invalid" ? "border-danger" : ""}`}>
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input id="input_password" type="password" autoComplete="new-password" value={password} onChange={handlePasswordChange} className={`form-control border-start-0 border-2 ${passwordStatus}`} placeholder="*******"/>
                            </div>
                        </div>
                        <PasswordStrengthBar score={passwordScore} />
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_confirm_password">Confirmer le mot de passe</label>
                            <div className="input-group pt-2 mb-3">
                                <span className={`input-group-text bg-transparent border-end-0 border-2 ${confirmStatus === "is-valid" ? "border-success" : confirmStatus === "is-invalid" ? "border-danger" : ""}`}>
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input id="input_confirm_password" type="password" autoComplete="new-password" value={confirmPassword} onChange={handleConfirmChange} className={`form-control border-start-0 border-2 ${confirmStatus}`} placeholder="*******" />
                            </div>
                        </div>

                        <div className="d-flex flex-column">
                            <a className="text-decoration-none" href="#">Mot de passe oublié ?</a>
                            <button type="submit" className="text-white my-4 py-2 rounded-4 border-0">
                                Créer mon compte <i className="bi bi-person-circle ms-2"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

function PasswordStrengthBar({ score }:{score: number}) {
    const color = COLORS[score];

    return (
        <div className="d-flex align-items-center gap-2">
            <div className="d-flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                    <span key={i} style={{width: "28px", height: "6px", borderRadius: "4px", backgroundColor: i < score ? color : "#e9ecef", transition: "background-color 0.3s ease",}} />
                ))}
            </div>
            <small>Sécurité : <span style={{ color, fontWeight: 600 }}>{LABELS[score]}</span></small>
        </div>
    );
}