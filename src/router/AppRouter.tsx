import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Logout from "../pages/auth/Logout/Logout";
import EmailConfirmation from "../pages/auth/EmailConfirmation/EmailConfirmation";
import ForgotPassword from "@/pages/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword/ResetPassword";

export default function AppRouter() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}