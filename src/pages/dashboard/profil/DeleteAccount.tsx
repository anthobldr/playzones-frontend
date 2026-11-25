import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { deleteAccount } from "@/services/auth.service";

export default function DeleteAccount() {
    const [password, setPassword] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    async function handleDelete() {
        setError("");
        setDeleting(true);

        try {
            await deleteAccount(password);
            setUser(null);
            navigate("/", { replace: true });
        } catch (error) {
            setError(error instanceof Error ? error.message : "Impossible de supprimer le compte.");
            setDeleting(false);
        }
    }

    return (
        <section className="bg-white rounded-4 shadow-sm p-4 mt-4 border border-danger" aria-labelledby="delete-account-title">
            <h2 id="delete-account-title" className="h4 text-danger">Supprimer mon compte</h2>
            <p>
                Cette action est <strong>définitive</strong> : ton profil, ton avatar, tes amis et tes messages seront effacés.
            </p>

            <form className="d-flex flex-column gap-3" onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
                <div>
                    <label className="fw-semibold" htmlFor="delete_password">Confirme avec ton mot de passe</label>
                    <input id="delete_password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mt-1" />
                </div>

                <div className="form-check">
                    <input id="delete_confirm" className="form-check-input" type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} required />
                    <label className="form-check-label" htmlFor="delete_confirm">
                        Je comprends que mon compte et toutes mes données seront supprimés définitivement.
                    </label>
                </div>

                {error && <p className="text-danger mb-0" role="alert">{error}</p>}

                <div>
                    <button type="submit" className="btn btn-danger" disabled={!confirmed || deleting}>
                        {deleting ? "Suppression…" : "Supprimer définitivement mon compte"}
                    </button>
                </div>
            </form>
        </section>
    );
}