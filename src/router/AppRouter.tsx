import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home/Home";
import Profil from "../pages/profil/Profil";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/profil" element={
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}