import { useState } from "react";
import checkPassword, { passwordsMatch } from "../../utils/passwordValidator";
import PasswordStrengthBar from "../../components/PasswordBar";

type FieldStatus = "" | "is-valid" | "is-invalid";

export default function RegisterForm() {
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
    // Fonction d'envoie de requête vers l'API Symfony
    async function handleRegister() {
        setError("");

        if (!passwordsMatch(password, confirmPassword)) {
            setError("Les mots de passe ne correspondent pas.");
            setConfirmStatus("is-invalid");
            return;
        }

        const res = await fetch("http://localhost:8001/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password, checkPassword: confirmPassword }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));
        } else {
            setError(data.error || "Erreur lors de l'inscription");
        }
    }

    return (
        <section className="container">
            <div className="row">
                <div className="col-lg-12 bg-body rounded-4 shadow ms-lg-5 px-5 py-3">
                    {error && (
                        <div className="alert alert-danger mt-3">
                            <i className="bi bi-exclamation-circle text-danger pe-2"></i>
                            {error}
                        </div>
                    )}
                    <h2 className="my-4 fw-bold">Inscription</h2>

                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_email">Adresse e-mail</label>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2">
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input id="input_email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control border-start-0 border-2" placeholder="exemple@playzone.com" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_email">Pseudo</label>
                            <div className="input-group pt-2">
                                <span className="input-group-text bg-transparent border-end-0 border-2">
                                    <i className="bi bi-person"></i>
                                </span>
                                <input id="input_email" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control border-start-0 border-2" placeholder="pseudo" />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_password">Mot de passe</label>
                            <div className="input-group pt-2">
                                <span className={`input-group-text bg-transparent border-end-0 border-2 ${passwordStatus === "is-valid" ? "border-success" : passwordStatus === "is-invalid" ? "border-danger" : ""}`}>
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input id="input_password" type="password" value={password} onChange={handlePasswordChange} className={`form-control border-start-0 border-2 ${passwordStatus}`} placeholder="*******"/>
                            </div>
                        </div>
                        <PasswordStrengthBar score={passwordScore} />

                        <div className="d-flex flex-column">
                            <label className="fw-bold" htmlFor="input_confirm_password">Confirmer le mot de passe</label>
                            <div className="input-group pt-2 mb-3">
                                <span className={`input-group-text bg-transparent border-end-0 border-2 ${confirmStatus === "is-valid" ? "border-success" : confirmStatus === "is-invalid" ? "border-danger" : ""}`}>
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input id="input_confirm_password" type="password" value={confirmPassword} onChange={handleConfirmChange} className={`form-control border-start-0 border-2 ${confirmStatus}`} placeholder="*******" />
                            </div>
                        </div>

                        <div className="d-flex flex-column">
                            <a className="text-decoration-none" href="#">Mot de passe oublié ?</a>
                            <button onClick={handleRegister} className="text-white my-4 py-2 rounded-4 border-0">
                                Créer mon compte <i className="bi bi-person-circle ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}