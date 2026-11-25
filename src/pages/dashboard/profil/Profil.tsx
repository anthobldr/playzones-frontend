import { useAuth } from "@/hooks/useAuth";
import AsideBar from "../../../components/layout/AsideBar";
import TopBar from "../components/TopBar";
import AvatarEditor from "./Avatar";
import DeleteAccount from "./DeleteAccount";

export default function Profil(){
    const { user } = useAuth();
    if (!user) return null; 
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

                        <AvatarEditor initialAvatar={user.avatar} username={user.username} email={user.email} />
                        <DeleteAccount />
                    </div>
                </div>
            </div>
        </div>
    )
}