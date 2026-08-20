import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPortal from "./components/LoginPortal";

import Home from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

const AppContent = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/admin/forgot-password";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* MAIN WEBSITE */}
        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<Contact />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPortal />} />

        {/* CUSTOMER */}
        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />

        {/* ADMIN */}
        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
      </Routes>
      <Footer />
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