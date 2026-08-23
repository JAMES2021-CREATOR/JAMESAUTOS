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
import CustomerVehicles from "./pages/customer/CustomerVehicles";
import CustomerVehicleDetails from "./pages/customer/CustomerVehicleDetails";
import SavedCars from "./pages/customer/SavedCars";
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
      {/* CUSTOMER DASHBOARD */}

      <Route
        path="/customer/dashboard"
        element={
          <CustomerLayout>
            <CustomerDashboard />
          </CustomerLayout>
        }
      />

      {/* CUSTOMER VEHICLES */}

      <Route
        path="/customer/vehicles"
        element={
          <CustomerLayout>
            <CustomerVehicles />
          </CustomerLayout>
        }
      />

      {/* CUSTOMER VEHICLE DETAILS */}

      <Route
        path="/customer/vehicles/:id"
        element={
          <CustomerLayout>
            <CustomerVehicleDetails />
          </CustomerLayout>
        }
      />

      {/* SAVED CARS */}

      <Route
        path="/customer/saved-cars"
        element={
          <CustomerLayout>
            <SavedCars />
          </CustomerLayout>
        }
      />

      {/* TEST DRIVES */}
<Route
  path="/customer/test-drives"
  element={
    <CustomerLayout>
      <CustomerTestDrives />
    </CustomerLayout>
  }
/>
     

      {/* MESSAGES */}

     
      <Route
  path="/customer/messages"
  element={
    <CustomerLayout>
      <CustomerMessages />
    </CustomerLayout>
  }
/>

      {/* PROFILE */}

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
      {/* ADMIN DASHBOARD */}

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
  );
};

// ======================================================
// APP CONTENT
// ======================================================

const AppContent = () => {
  const location = useLocation();

  const path = location.pathname;

  // ====================================================
  // CUSTOMER PORTAL
  // ====================================================

  if (path.startsWith("/customer")) {
    return <CustomerRoutes />;
  }

  // ====================================================
  // ADMIN PORTAL
  // ====================================================

  if (path.startsWith("/admin")) {
    return <AdminRoutes />;
  }

  // ====================================================
  // AUTH
  // ====================================================

  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password"
  ) {
    return <AuthRoutes />;
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
