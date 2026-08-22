import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPortal from "./components/LoginPortal";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import About from "./components/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AdminResetPassword from "./pages/AdminResetPassword";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";

import CustomerDashboard from "./pages/customer/CustomerDashboard";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminMessages from "./pages/admin/AdminMessages";

const AppContent = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/admin/forgot-password" ||
    location.pathname.startsWith("/admin");

  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ================= MAIN WEBSITE ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/cars" element={<Cars />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/contact" element={<Contact />} />

        {/* ================= AUTH ================= */}

        <Route path="/login" element={<LoginPortal />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />

        {/* ================= CUSTOMER ================= */}

        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/vehicles"
          element={
            <AdminLayout>
              <AdminVehicles />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <AdminLayout>
              <AdminMessages />
            </AdminLayout>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
