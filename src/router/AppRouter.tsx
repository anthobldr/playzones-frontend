import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Logout from "../pages/auth/Logout/Logout";
import EmailConfirmation from "../pages/auth/EmailConfirmation/EmailConfirmation";
import ForgotPassword from "@/pages/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword/ResetPassword";
import NotFound from "@/pages/NotFound/NotFound";
import ProtectedRoute from "@/router/ProtectedRoute";
import Dashboard from "@/pages/dashboard/Dashboard";
import Profil from "@/pages/dashboard/profil/Profil";
import Messages from "@/pages/dashboard/messages/Messages";
import Friends from "@/pages/dashboard/friends/Friends";
import MentionsLegales from "@/pages/legal/MentionsLegales";
import Confidentialite from "@/pages/legal/Confidentialite";
import Cgu from "@/pages/legal/Cgu";
import TicTacToe from "@/pages/dashboard/games/TicTacToe";
import MyGames from "@/pages/dashboard/games/MyGames";
import GameInvitations from "@/components/realtime/GameInvitations";
import { useAuth } from "@/hooks/useAuth";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <GameInvitations />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="confirmation" element={<EmailConfirmation />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/account" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profil" element={<Profil />} />
          <Route path="messages" element={<Messages />} />
          <Route path="friends" element={<Friends />} />
          <Route path="games" element={<MyGames />} />
          <Route path="games/tic-tac-toe/:id" element={<TicTacToe />} />
        </Route>
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}