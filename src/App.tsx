import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// ================= PUBLIC =================
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import About from "./components/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// ================= AUTH =================
import LoginPortal from "./components/LoginPortal";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";

// ================= CUSTOMER =================
import CustomerLayout from "./pages/customer/CustomerLayout";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerCars from "./pages/customer/CustomerCars";

// ================= ADMIN =================
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminMessages from "./pages/admin/AdminMessages";

// ======================================================
// PUBLIC WEBSITE
// ======================================================

const PublicWebsite = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
};

// ======================================================
// AUTHENTICATION
// ======================================================

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPortal />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

      <Route path="/admin/reset-password" element={<AdminResetPassword />} />
    </Routes>
  );
};

// ======================================================
// CUSTOMER PORTAL
// ======================================================

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/customer/dashboard"
        element={
          <CustomerLayout>
            <CustomerDashboard />
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/cars"
        element={
          <CustomerLayout>
            <CustomerCars />
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/saved-cars"
        element={
          <CustomerLayout>
            <div className="text-white">Saved Cars</div>
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/test-drives"
        element={
          <CustomerLayout>
            <div className="text-white">Test Drives</div>
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/messages"
        element={
          <CustomerLayout>
            <div className="text-white">Messages</div>
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/profile"
        element={
          <CustomerLayout>
            <div className="text-white">My Profile</div>
          </CustomerLayout>
        }
      />
    </Routes>
  );
};

// ======================================================
// ADMIN PORTAL
// ======================================================

const AdminRoutes = () => {
  return (
    <Routes>
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
  );
};

// ======================================================
// APP CONTENT
// ======================================================

const AppContent = () => {
  const location = useLocation();

  const path = location.pathname;

  // CUSTOMER PORTAL
  if (path.startsWith("/customer")) {
    return <CustomerRoutes />;
  }

  // ADMIN PORTAL
  if (path.startsWith("/admin")) {
    return <AdminRoutes />;
  }

  // AUTH PAGES
  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password"
  ) {
    return <AuthRoutes />;
  }

  // PUBLIC WEBSITE
  return <PublicWebsite />;
};

// ======================================================
// APP
// ======================================================

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
