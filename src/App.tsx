import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "./lib/supabase";

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
import CustomerVehicles from "./pages/customer/CustomerVehicles";
import CustomerVehicleDetails from "./pages/customer/CustomerVehicleDetails";
import SavedCars from "./pages/customer/SavedCars";
import CustomerProfile from "./pages/customer/CustomerProfile";
import CustomerTestDrives from "./pages/customer/CustomerTestDrives";
import CustomerMessages from "./pages/customer/CustomerMessages";

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

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/admin/forgot-password"
        element={<AdminForgotPassword />}
      />

      <Route
        path="/admin/reset-password"
        element={<AdminResetPassword />}
      />
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
        path="/customer/vehicles"
        element={
          <CustomerLayout>
            <CustomerVehicles />
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/vehicles/:id"
        element={
          <CustomerLayout>
            <CustomerVehicleDetails />
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/saved-cars"
        element={
          <CustomerLayout>
            <SavedCars />
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/test-drives"
        element={
          <CustomerLayout>
            <CustomerTestDrives />
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/messages"
        element={
          <CustomerLayout>
            <CustomerMessages />
          </CustomerLayout>
        }
      />

      <Route
        path="/customer/profile"
        element={
          <CustomerLayout>
            <CustomerProfile />
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
// GET CURRENT USER ROLE
// ======================================================

const getUserRole = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

  if (profileError || !profile) {
    console.error("Profile role check failed:", profileError);
    return null;
  }

  return profile.role;
};

// ======================================================
// CUSTOMER PROTECTION
// ======================================================

const ProtectedCustomerRoutes = () => {
  const [checking, setChecking] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkCustomerAccess = async () => {
      try {
        const role = await getUserRole();

        if (!mounted) return;

        setIsCustomer(role === "customer");
        setChecking(false);
      } catch (error) {
        console.error(
          "Customer access check failed:",
          error
        );

        if (mounted) {
          setIsCustomer(false);
          setChecking(false);
        }
      }
    };

    checkCustomerAccess();

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d14]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />

          <p className="text-sm text-gray-400">
            Verifying customer access...
          </p>
        </div>
      </div>
    );
  }

  if (!isCustomer) {
    return <Navigate to="/login" replace />;
  }

  return <CustomerRoutes />;
};

// ======================================================
// ADMIN PROTECTION
// ======================================================

const ProtectedAdminRoutes = () => {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAdminAccess = async () => {
      try {
        const role = await getUserRole();

        if (!mounted) return;

        setIsAdmin(role === "admin");
        setChecking(false);
      } catch (error) {
        console.error(
          "Admin access check failed:",
          error
        );

        if (mounted) {
          setIsAdmin(false);
          setChecking(false);
        }
      }
    };

    checkAdminAccess();

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d14]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />

          <p className="text-sm text-gray-400">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <AdminRoutes />;
};

// ======================================================
// APP CONTENT
// ======================================================

const AppContent = () => {
  const location = useLocation();

  const path = location.pathname;

  // ====================================================
  // AUTH ROUTES
  // ====================================================

  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/admin/forgot-password" ||
    path === "/admin/reset-password"
  ) {
    return <AuthRoutes />;
  }

  // ====================================================
  // PROTECTED CUSTOMER PORTAL
  // ====================================================

  if (path.startsWith("/customer")) {
    return <ProtectedCustomerRoutes />;
  }

  // ====================================================
  // PROTECTED ADMIN PORTAL
  // ====================================================

  if (
    path === "/admin/dashboard" ||
    path === "/admin/vehicles" ||
    path === "/admin/messages"
  ) {
    return <ProtectedAdminRoutes />;
  }

  // ====================================================
  // PUBLIC WEBSITE
  // ====================================================

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