import type { ReactNode } from "react";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Car,
  Heart,
  Calendar,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { supabase } from "../../lib/supabase";


interface CustomerLayoutProps {
  children: ReactNode;
}


const CustomerLayout = ({
  children,
}: CustomerLayoutProps) => {

  const location = useLocation();

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);


  // ======================================================
  // CUSTOMER NAVIGATION
  // ======================================================

  const navigation = [
    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Browse Cars",
      path: "/customer/cars",
      icon: Car,
    },

    {
      name: "Saved Cars",
      path: "/customer/saved-cars",
      icon: Heart,
    },

    {
      name: "Test Drives",
      path: "/customer/test-drives",
      icon: Calendar,
    },

    {
      name: "Messages",
      path: "/customer/messages",
      icon: MessageSquare,
    },

    {
      name: "My Profile",
      path: "/customer/profile",
      icon: User,
    },
  ];


  // ======================================================
  // CLOSE MOBILE MENU
  // ======================================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };


  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = async () => {

    try {

      const { error } =
        await supabase.auth.signOut();

      if (error) {

        console.error(
          "Logout error:",
          error
        );

        return;
      }

      navigate("/login", {
        replace: true,
      });

    } catch (error) {

      console.error(
        "Customer logout error:",
        error
      );
    }
  };


  return (

    <div className="min-h-screen overflow-x-hidden bg-[#080d14] text-white">


      {/* ==================================================
          MOBILE HEADER
      ================================================== */}

      <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-white/10 bg-[#0c121a]/95 backdrop-blur-xl lg:hidden">

        <div className="flex h-full items-center justify-between px-4 sm:px-6">

          <Link
            to="/customer/dashboard"
            className="text-xl font-black tracking-tight"
          >
            JAMES
            <span className="text-yellow-500">
              AUTOS
            </span>
          </Link>


          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:border-yellow-500 hover:text-yellow-500"
            aria-label="Open customer menu"
          >
            <Menu size={22} />
          </button>

        </div>

      </header>


      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {mobileMenuOpen && (

        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />

      )}


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0c121a] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >


        {/* ==================================================
            SIDEBAR HEADER
        ================================================== */}

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-6">

          <Link
            to="/customer/dashboard"
            onClick={closeMobileMenu}
            className="text-2xl font-black tracking-tight"
          >
            JAMES
            <span className="text-yellow-500">
              AUTOS
            </span>
          </Link>


          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close customer menu"
          >
            <X size={20} />
          </button>

        </div>


        {/* ==================================================
            CUSTOMER LABEL
        ================================================== */}

        <div className="px-5 pb-2 pt-7 sm:px-6">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Customer Portal
          </p>

        </div>


        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-4">

          <div className="space-y-2">

            {navigation.map((item) => {

              const Icon = item.icon;

              const active =
                location.pathname ===
                item.path;

              return (

                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3.5 font-medium transition ${
                    active
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/10"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >

                  <Icon size={20} />

                  <span>
                    {item.name}
                  </span>

                </Link>

              );

            })}

          </div>

        </nav>


        {/* ==================================================
            LOGOUT
        ================================================== */}

        <div className="shrink-0 border-t border-white/10 p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
          >

            <LogOut size={18} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="min-h-screen pt-16 lg:ml-[280px] lg:pt-0">

        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          {children}

        </div>

      </main>

    </div>

  );
};


export default CustomerLayout;