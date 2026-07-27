import AsideBar from "./AsideBar";

export default function Profil(){
    return (
        <div>
            <div className="row">
                <div className="col-lg-2">
                    <AsideBar />
                </div>
                <div className="col-lg-10">
                    <h2>Bonjour, Utilisateur ! 👋</h2>
                    <span>Prêt pour une nouvelle partie ?</span>
                </div>
            </div>
        </div>
    )
}