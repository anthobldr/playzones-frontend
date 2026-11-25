import { useState } from "react";
import type { Avatar } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { getAvatarUrl, updateAvatar } from "../../../services/avatar.service";
import { avatarStyles } from "../../../data/avatarStyles";
import { avatarColors } from "../../../data/avatarColors";
import "./css/Avatar.css"

interface AvatarEditorProps { initialAvatar: Avatar; username: string; email: string; }

export default function AvatarEditor({ initialAvatar, username, email }: AvatarEditorProps) {
    const [avatar, setAvatar] = useState<Avatar>(initialAvatar);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useAuth();

    function handleStyleChange(event: React.ChangeEvent<HTMLSelectElement>){
        setAvatar({...avatar, style: event.target.value,});
    }

    function handleGenerateAvatar(){
        setAvatar({
            ...avatar,
            seed: crypto.randomUUID(),
        });
    }

    function handleBackgroundColorChange(color: string){
        setAvatar({
            ...avatar,
            options: {
                ...avatar.options,
                backgroundColor: color,
            }
        })
    }

    async function handleSaveAvatar(){
        setSuccess("");
        setError("");
        setSaving(true);

        try {
            const data = await updateAvatar(avatar);
            // Met à jour l'avatar dans la nAVBAR et la TopBar
            setUser((previous) => previous ? { ...previous, avatar: data.avatar } : previous);
            setSuccess(data.message);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Impossible d'enregistrer l'avatar.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="bg-white rounded-4 shadow-sm p-4">
            <div className="row">
                <div className="col-12 col-lg-7 pe-4">
                    <h3>Avatar</h3>
                    <p>Choisis ton avatar avec DiceBear</p>
                    <div className="row">
                        <div className="col-lg-5 d-flex flex-column align-items-center">
                            <img src={getAvatarUrl(avatar)} alt="Apperçu de ton avatar" className="avatar-preview mb-4 rounded-circle" />
                            <button type="button" className="btn btn-outline-primary rounded-pill" onClick={handleGenerateAvatar}><span className="fs-7">Générer un nouvel avatar</span></button>
                            <small className="text-muted mt-3">Propulsé par <a href="https://www.dicebear.com/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">DiceBear <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i></a></small>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="mb-4">
                                <label className="fw-semibold mb-2 d-block" htmlFor="avatar_style">Catégorie</label>
                                <select id="avatar_style" className="form-select rounded-4" value={avatar.style} onChange={handleStyleChange}>
                                    {avatarStyles.map((style, index) =>(
                                        <option key={index} value={style.id}>{style.label}</option>
                                    ))}
                                </select>
                            </div>
                            <fieldset>
                                <legend className="fw-semibold mb-2 fs-6">Couleur de fond</legend>
                                <div className="d-flex gap-2">
                                    {avatarColors.map((color) => (
                                        <button type="button" key={color} className="color rounded-circle border-0" aria-label={`Fond #${color}`} style={{backgroundColor: `#${color}`}} aria-pressed={avatar.options.backgroundColor === color} onClick={() => handleBackgroundColorChange(color)} />
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-5 ps-4 border rounded-4 shadow-sm py-3 mt-4 mt-lg-0">
                    <h3>Informations personnelles</h3>
                    <div className="mb-3">
                        <label htmlFor="profil_username">Nom d'utilisateur</label>
                        <input id="profil_username" className="form-control" type="text" value={username} readOnly/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profil_email">Email</label>
                        <input id="profil_email" className="form-control" type="email" value={email} readOnly/>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={handleSaveAvatar} disabled={saving}>
                    {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
                {success && <p className="text-success mt-2 mb-0" role="status">{success}</p>}
                {error && <p className="text-danger mt-2 mb-0" role="alert">{error}</p>}
            </div>
        </div>
    );
}