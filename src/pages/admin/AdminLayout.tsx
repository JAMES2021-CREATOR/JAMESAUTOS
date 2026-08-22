import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Vehicles",
      path: "/admin/vehicles",
      icon: Car,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: MessageSquare,
    },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080d14] text-white">

      {/* =====================================================
          MOBILE TOP BAR
      ====================================================== */}
      <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-white/10 bg-[#0c121a]/95 backdrop-blur-xl lg:hidden">

        <div className="flex h-full items-center justify-between px-4 sm:px-6">

          <Link
            to="/admin/dashboard"
            className="text-xl font-black tracking-tight"
          >
            JAMES<span className="text-yellow-500">AUTOS</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open admin menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:border-yellow-500 hover:text-yellow-500"
          >
            <Menu size={22} />
          </button>

        </div>

      </header>


      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}


      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0c121a] shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-6">

          <Link
            to="/admin/dashboard"
            onClick={closeMobileMenu}
            className="text-2xl font-black tracking-tight"
          >
            JAMES<span className="text-yellow-500">AUTOS</span>
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close admin menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>

        </div>


        {/* Admin Panel Label */}
        <div className="px-5 pb-2 pt-7 sm:px-6">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Admin Panel
          </p>

        </div>


        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">

          <div className="space-y-2">

            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                location.pathname === item.path;

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

                  <span>{item.name}</span>
                </Link>
              );
            })}

          </div>

        </nav>


        {/* Sidebar Bottom */}
        <div className="shrink-0 border-t border-white/10 p-4">

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <ChevronLeft size={18} />

            <span>Back To Website</span>
          </Link>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />

            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN AREA
      ====================================================== */}
      <main className="min-h-screen pt-16 lg:ml-[280px] lg:pt-0">

        {/* Responsive Content Container */}
        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          {children}

        </div>

      </main>

    </div>
  );
};

export default AdminLayout;