import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard"
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Logout from "../pages/auth/Logout";
import Profil from "../pages/dashboard/profil/Profil";
import Games from "../pages/games/Games";
import Messages from "../pages/dashboard/messages/Messages";
import Friends from "../pages/dashboard/friends/Friends";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jeux" element={<Games />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/account">
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="profil" element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          } />
          <Route path="messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="friends" element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}