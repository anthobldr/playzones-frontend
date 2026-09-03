import { useState } from "react";
import { getAvatarUrl } from "../../../services/avatar.service";
import { updateAvatar } from "../../../services/avatar.service";
import { useAuth } from "../../../hooks/useAuth";
import { avatarStyles } from "../../../data/avatarStyles";
import { avatarColors } from "../../../data/avatarColors";
import "./css/Avatar.css"

export default function Avatar() {
    const { user } = useAuth();
    const [avatar, setAvatar] = useState(user?.avatar);
    

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
        try {
            await updateAvatar(avatar);
            alert("Avatar enregistré")
        } catch (error) {
            if (error instanceof Error){
                alert(error.message)
            }
        }
    }

    return (
        <div className="bg-white rounded-4 shadow-sm p-4">
            <div className="row">
                <div className="col-lg-7 pe-4">
                    <h3>Avatar</h3>
                    <p>Choisis ton avatar avec DiceBear</p>
                    <div className="row">
                        <div className="col-lg-5 d-flex flex-column align-items-center">
                            <img src={getAvatarUrl(avatar)} alt="Avatar" className="avatar-preview mb-4 rounded-circle" />
                            <button className="btn btn-outline-primary rounded-pill" onClick={handleGenerateAvatar}><span className="fs-7">Générer un nouvel avatar</span></button>
                            <small className="text-muted mt-3">Propulsé par <a href="https://www.dicebear.com/" target="__blank" className="text-decoration-none">DiceBear <i className="bi bi-box-arrow-up-right"></i></a></small>
                        </div>
                        <div className="col-lg-3">
                            <div className="mb-4">
                                <label className="fw-semibold mb-2 d-block">Catégorie</label>
                                <select className="form-select rounded-4" value={avatar.style} onChange={handleStyleChange}>
                                    {avatarStyles.map((style, index) =>(
                                        <option key={index} value={style.id}>{style.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="fw-semibold mb-2 d-block">Couleur de fond</label>
                                <div className="d-flex gap-2">
                                    {avatarColors.map((color) => (
                                        <div className="color rounded-circle" style={{backgroundColor: `#${color}`}} onClick={() => handleBackgroundColorChange(color)}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 ps-4 border rounded-4 shadow-sm py-3">
                    <h3>Informations personnelles</h3>
                    <div className="mb-3">
                        <label>Nom d'utilisateur</label>
                        <input className="form-control" type="text" value={user?.username}/>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input className="form-control" type="email" value={user?.email}/>
                    </div>
                    <div className="mb-3">
                        <label>Bio</label>
                        <textarea className="form-control" rows={4} />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleSaveAvatar}>
                Enregistrer
            </button>
        </div>
    );
}