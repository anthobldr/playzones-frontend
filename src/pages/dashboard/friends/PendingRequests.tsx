
'use client';

import * as friendshipService from "../../../services/friendship.service";
import type { FriendshipRequest } from "../../../types";
import { getAvatarUrl } from "../../../services/avatar.service";
import style from "./css/Friends.module.css"
import AddFriendsModal from "./AddFriendsModal";

interface AddFriendProps {
  pendingRequests: FriendshipRequest[];
  loading: boolean;
  error: string | null;
  onRequestHandled: () => void;
  friends: Player[]; 
}

export default function AddFriend({ pendingRequests, loading, error, onRequestHandled, friends }: AddFriendProps) {

  const handleAcceptFriend = async (requestId: number) => {
    try {
      await friendshipService.acceptFriendRequest(requestId);
      onRequestHandled();
    } catch (error) {
      console.log(error)
    }
  };

  const handleRejectFriend = async (requestId: number) => {
    try {
      await friendshipService.rejectFriendRequest(requestId);
      onRequestHandled();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="col-lg-6 bg-body shadow-sm rounded-4">
      <div className="pe-lg-3 py-lg-4">
        <button id={style.addFriendPrimary} className="btn text-white ms-auto d-block rounded-4" data-bs-toggle="modal" data-bs-target="#addFriendsModal">
          <i className="bi bi-plus-lg me-2"></i>Ajouter des amis
        </button>
      </div>
      {loading && <p>Chargement...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && pendingRequests.length > 0 ? (
        <div className="px-2">
          <div className="d-flex gap-1">
            <h4>Demande d'amis</h4>
            <small className="text-secondary">({pendingRequests.length})</small>
          </div>
          <ul className="list-unstyled d-flex gap-3 flex-column mt-lg-3">
            {pendingRequests.map((request) => (
              <li key={request.id} className="border d-flex gap-3 rounded-4 py-lg-3 px-lg-3 align-items-center">
                <img src={getAvatarUrl(request.sender.avatar)} width={50} alt="" className="rounded-circle" />
                <div className="d-flex flex-column lh-sm">
                  <span>{request.sender.username}</span>
                  <small className="text-secondary">0 amis en commun</small>
                </div>
                <div className="d-flex gap-3 ms-auto">
                  <button className="btn bg-primary text-white border rounded-4 px-4" onClick={() => handleAcceptFriend(request.id)}>
                    Ajouter
                  </button>
                  <button className="btn border rounded-4 px-4" onClick={() => handleRejectFriend(request.id)}>
                    Refuser
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading &&
      <div className="border rounded-4 text-center py-lg-4 mx-lg-2 mb-lg-4">
        <img src="/cta-icon.png" alt="" width={350}/>
        <h2>Aucune invitation en attente</h2>
        <p className="text-secondary">Vous n'avez pas d'invitations pour le moment.</p>
      </div>
      )}
      <AddFriendsModal onFriendAdded={onRequestHandled} friends={friends}/>
    </div>
  );
}