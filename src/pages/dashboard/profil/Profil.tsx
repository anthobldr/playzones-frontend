import AsideBar from "../../../components/layout/AsideBar";
import TopBar from "../TopBar";
import Avatar from "./Avatar";

export default function Profil(){
    return (
        <div className="container-fluid p-0">
            <div className="row mb-5">
                <div className="col-lg-2">
                    <AsideBar />
                </div>
                <div className="col-lg-10">
                    <TopBar />

                    <div className="px-4 py-3">
                        <h1>Modifier mon profil</h1>
                        <p>Gère tes informations personnelles et ton avatar.</p>

                        <Avatar />
                    </div>
                </div>
            </div>
        </div>
    )
}