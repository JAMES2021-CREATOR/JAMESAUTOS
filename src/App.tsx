import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPortal from "./components/LoginPortal";
import About from "./components/About";

// Public Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";

// Customer
import CustomerDashboard from "./pages/customer/CustomerDashboard";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminMessages from "./pages/admin/AdminMessages";

const AppContent = () => {
  const location = useLocation();

  // Pages where the public Navbar should not appear
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/admin/forgot-password" ||
    location.pathname.startsWith("/admin");

  // Pages where the public Footer should not appear
  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  return (
    <>
      {/* PUBLIC NAVBAR */}
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* =========================================
            PUBLIC WEBSITE
        ========================================= */}
        <Route path="/" element={<Home />} />

        <Route path="/cars" element={<Cars />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/contact" element={<Contact />} />


        {/* =========================================
            AUTHENTICATION
        ========================================= */}
        <Route path="/login" element={<LoginPortal />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />


        {/* =========================================
            CUSTOMER DASHBOARD
        ========================================= */}
        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />


        {/* =========================================
            ADMIN DASHBOARD
        ========================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        {/* ADMIN VEHICLES */}
        <Route
          path="/admin/vehicles"
          element={
            <AdminLayout>
              <AdminVehicles />
            </AdminLayout>
          }
        />

        {/* ADMIN MESSAGES */}
        <Route
          path="/admin/messages"
          element={
            <AdminLayout>
              <AdminMessages />
            </AdminLayout>
          }
        />

      </Routes>

      {/* PUBLIC FOOTER */}
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