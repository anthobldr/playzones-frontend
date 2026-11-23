import { useEffect, useState, useCallback } from "react";
import * as friendshipService from "../../../services/friendship.service";
import type { FriendshipRequest, Player } from "../../../types";
import AsideBar from "../../../components/layout/AsideBar"
import TopBar from "../components/TopBar"
import AddFriend from "./PendingRequests"
import FriendsList from "./FriendsList"
export default function Friends(){
  const [friends, setFriends] = useState<Player[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendshipRequest[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const refreshFriends = useCallback(async () => {
    try {
      const data = await friendshipService.getFriends();
      setFriends(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }, []);

  const refreshPendingRequests = useCallback(async () => {
    try {
      const data = await friendshipService.getPendingRequests();
      setPendingRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadFriendsData() {
        try {
            const [friendsData, pendingData] = await Promise.all([
                friendshipService.getFriends(),
                friendshipService.getPendingRequests(),
            ]);
            if (!ignore) {
                setFriends(friendsData);
                setPendingRequests(pendingData);
            }
        } catch (err) {
            if (!ignore) setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally {
            if (!ignore) setLoading(false);
        }
    }

    loadFriendsData();
    return () => { ignore = true; };
}, []);

    return (
        <div className="container-fluid p-0">
            <div className="row mb-5">
                <div className="col-12 col-lg-2">
                    <AsideBar />
                </div>
                <div className="col-12 col-lg-10 px-lg-4">
                    <TopBar />
                    <div className="py-3">
                        <h1>Amis</h1>
                        <p>Ajoute des amis, défie-les et partage tes meilleurs moment !</p>
                    </div>
                    <div className="row gap-4">
                        <FriendsList friends={friends} onFriendRemoved={refreshFriends}/>
                        <AddFriend pendingRequests={pendingRequests} loading={loading} error={error} onRequestHandled={() => {refreshPendingRequests(); refreshFriends();}} friends={friends} />
                    </div>      
                </div>
            </div>
        </div>
    )
}