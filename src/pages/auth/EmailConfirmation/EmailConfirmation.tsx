import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import styles from "./EmailConfirmation.module.css";
import { useEffect, useState } from "react";
import { resendCode, verifyEmail } from "@/services/auth.service";

const CODE_LENGTH = 6;
const RESEND_DELAY = 120;

export default function EmailConfirmation() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(() => localStorage.getItem("registerEmail") ?? "");
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY);

    useEffect(() => {
        if(secondsLeft <= 0) return;
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000)

        return () => clearInterval(interval);
    }, [secondsLeft]);

    function formatTime(totalSeconds: number) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    async function handleResendCode(){
        if(secondsLeft > 0) return;

        try{
            await resendCode(email, username);
            setSecondsLeft(RESEND_DELAY);
        } catch(error){
            setError(error instanceof Error ? error.message : "Impossible de renvoyer le code.")
        }
    }

    function handleCodeInput(index: number, value: string) {
        if (value.length > 1) value = value[0];
        
        const codeArray = code.padEnd(CODE_LENGTH, ' ').split('');
        codeArray[index] = value;
        setCode(codeArray.join('').trim());
        
        // Focus sur l'input suivant (optionnel)
        if (value && index < CODE_LENGTH - 1) {
            document.querySelector(`input[aria-label="Chiffre ${index + 2}"]`)?.focus();
        }
    }

    async function handleVerifyCode(){
        setError("");

        if(!code){
            setError("Veuillez entrer le code");
            return
        }

        try{
            const data = await verifyEmail(email, code);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/account/dashboard");
        } catch(error){
            if(error instanceof Error){
                setError(error.message);
            }
        }
    }

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="row justify-content-center align-items-center text-center my-5">
                <section className="col-11 col-lg-6 bg-white rounded-4 shadow-sm py-4 py-lg-5">
                    <div className="d-flex justify-content-center mb-3">
                        <i className={`bi bi-envelope-fill d-flex justify-content-center align-items-center rounded-circle ${styles.emailIcon}`} />
                    </div>
                    <h2>Vérifie ton adresse <span className={styles.primaryText}>e-mail</span></h2>
                    <p className="text-secondary lh-1">On vient de t'envoyer un code de confirmation par e-mail.<br />Entre-le ci-dessous pour valider ton adresse et activer ton compte.</p>
                    <div className={`${styles.emailSection} col-12 col-lg-9 mx-auto d-flex gap-2 align-items-center text-start rounded-4 px-2 px-lg-3 py-3`}>
                        <i className={`bi bi-envelope-fill ${styles.emailIconFilled}`} />
                        <div className="d-flex flex-column lh-sm">
                            <small className="text-secondary">Tu as reçu l'e-mail sur :</small>
                            <strong>{email}</strong>
                        </div>
                        <button type="button" className={`${styles.editEmail} ms-auto`}>Modifier</button>
                    </div>
                    <form className="col-12 col-lg-9 mx-auto" onSubmit={(e) => {e.preventDefault(); handleVerifyCode();}}>
                        <div className="d-flex gap-2 justify-content-center my-4">
                            {Array.from({ length: CODE_LENGTH }, (_, index) => <input key={index} type="text" maxLength={1} inputMode="numeric" aria-label={`Chiffre ${index + 1}`} className={styles.codeInput} value={code[index] || ""} onChange={(e) => handleCodeInput(index, e.target.value)}/>)}
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <button type="submit" className="btn bg-primary text-white rounded-pill py-lg-2"><i className="bi bi-envelope-check-fill me-2" />Valider mon adresse e-mail</button>
                            <button type="button" className={`${styles.resendButton}`} onClick={(e) => {e.preventDefault(); handleResendCode();}} disabled={secondsLeft > 0}><i className="bi bi-arrow-clockwise me-2" />Renvoyer le code</button>
                            <small className="text-secondary">(dans {formatTime(secondsLeft)})</small>
                        </div>
                    </form>
                    <div className={`${styles.emailSection} col-12 col-lg-9 text-start mx-auto d-flex gap-3 rounded-4 px-2 px-lg-3 py-3 mt-3`}>
                        <span className={styles.helpIcon}>💡</span>
                        <div className="d-flex flex-column">
                            <strong>Tu n'as pas reçu le code ?</strong>
                            <small className="text-secondary">Vérifie tes spams ou demande un nouveau code dans quelques minutes.</small>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
