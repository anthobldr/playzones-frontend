import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import styles from "./css/EmailConfirmation.module.css";

const CODE_LENGTH = 6;

export default function EmailConfirmation() {
    const email = "dev.anthobldr@gmail.com";

    return (
        <>
            <Navbar />
            <main className="row justify-content-center my-lg-5">
                <section className="col-lg-6 shadow-sm bg-white rounded-4 text-center py-lg-5">
                    <div className="mb-lg-2 d-flex justify-content-center">
                        <i className={`bi bi-envelope-fill ${styles.emailIcon}`} />
                    </div>
                    <h1>Vérifie ton adresse <span className={styles.primaryText}>e-mail</span></h1>
                    <p className="text-secondary lh-1">On vient de t'envoyer un code de confirmation par e-mail.<br />Entre-le ci-dessous pour valider ton adresse et activer ton compte.</p>
                    <div className={`${styles.emailSection} col-lg-9 mx-auto d-flex gap-3 text-start align-items-center rounded-4 py-lg-3 px-lg-4 my-lg-4`}>
                        <i className={`bi bi-envelope-fill ${styles.emailIconFilled}`} />
                        <div className="d-flex flex-column">
                            <small className="text-secondary">Tu as reçu l'e-mail sur :</small>
                            <strong>{email}</strong>
                        </div>
                        <button type="button" className={`${styles.editEmail} ms-auto`}>Modifier<i className="ms-2 bi bi-pencil-fill"></i></button>
                    </div>
                    <form className="col-lg-9 mx-auto">
                        <div className="d-flex gap-2 justify-content-center">
                            {Array.from({ length: CODE_LENGTH }, (_, index) => <input key={index} type="text" maxLength={1} inputMode="numeric" aria-label={`Chiffre ${index + 1}`} className={styles.codeInput} />)}
                        </div>
                        <div className="d-flex flex-column gap-2 mt-lg-4">
                            <button type="submit" className="btn bg-primary text-white rounded-pill py-lg-2"><i className="bi bi-envelope-check-fill me-2" />Valider mon adresse e-mail</button>
                            <button type="button" className={styles.resendButton}><i className="bi bi-arrow-clockwise me-2" />Renvoyer le code</button>
                            <small className="text-secondary">(dans 01:45)</small>
                        </div>
                    </form>
                    <div className={`${styles.emailSection} col-lg-9 mx-auto d-flex gap-3 text-start align-items-center rounded-4 py-lg-3 px-lg-4 my-lg-4`}>
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
