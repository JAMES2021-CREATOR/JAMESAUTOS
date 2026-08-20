
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  Car,
  Headphones,
  Phone,
  Shield,
} from "lucide-react";

interface BenefitProps {
  icon: ReactNode;
  title: string;
  text: string;
}

const LoginPortal = () => {
  const navigate = useNavigate();

  const [showCustomerPassword, setShowCustomerPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [customerRemember, setCustomerRemember] = useState(true);
  const [adminRemember, setAdminRemember] = useState(true);

  // ==============================
  // CUSTOMER LOGIN
  // ==============================
  const handleCustomerLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customerEmail || !customerPassword) {
      alert("Please enter your email and password.");
      return;
    }

    if (customerRemember) {
      localStorage.setItem("customerRemember", "true");
    }

    // Later connect Supabase authentication here

    navigate("/customer/dashboard");
  };

  // ==============================
  // ADMIN LOGIN
  // ==============================
  const handleAdminLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!adminEmail || !adminPassword) {
      alert("Please enter your admin email and password.");
      return;
    }

    if (adminRemember) {
      localStorage.setItem("adminRemember", "true");
    }

    // Later connect Supabase authentication here

    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080d14] text-white">
      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/jamesautos-bg.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-[#080d14]/90" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#080d14]/60 via-[#080d14]/85 to-[#080d14]" />
      </div>

      {/* ================= MAIN ================= */}
      <main className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12">

        {/* ================= LOGO ================= */}
        <div className="mb-8 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          >
            <h1 className="text-4xl font-black tracking-[0.16em] sm:text-5xl">
              <span className="text-white">JAMES</span>
              <span className="text-red-500">AUTOS</span>
            </h1>

            <div className="mt-2 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-gray-600" />

              <p className="text-[11px] font-medium tracking-[0.4em] text-gray-400">
                PREMIUM AUTO DEALER
              </p>

              <span className="h-px w-12 bg-gray-600" />
            </div>
          </button>
        </div>

        {/* ================= LOGIN CONTAINER ================= */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">

          {/* =====================================================
              CUSTOMER LOGIN
          ====================================================== */}
          <section className="rounded-2xl border border-blue-500/40 bg-[#111720]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">

            {/* ICON */}
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-600/20 shadow-[0_0_25px_rgba(37,99,235,0.25)]">
                <User size={46} strokeWidth={1.8} />
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold tracking-wide sm:text-3xl">
              CUSTOMER LOGIN
            </h2>

            <div className="mx-auto mt-5 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <p className="mx-auto mt-5 max-w-md text-center text-sm leading-6 text-gray-300">
              Access your account to browse cars,
              <br />
              book test drives and more.
            </p>

            <form
              onSubmit={handleCustomerLogin}
              className="mt-7 space-y-5"
            >

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-14 w-full rounded-lg border border-gray-600 bg-[#171d26]/80 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showCustomerPassword ? "text" : "password"}
                    value={customerPassword}
                    onChange={(e) => setCustomerPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-14 w-full rounded-lg border border-gray-600 bg-[#171d26]/80 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCustomerPassword(!showCustomerPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                    aria-label="Toggle customer password visibility"
                  >
                    {showCustomerPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER / FORGOT */}
              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={customerRemember}
                    onChange={(e) =>
                      setCustomerRemember(e.target.checked)
                    }
                    className="h-4 w-4 accent-blue-600"
                  />

                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-blue-400 transition hover:text-blue-300"
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN */}
              <button
                type="submit"
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 font-semibold shadow-lg shadow-blue-900/30 transition duration-300 hover:scale-[1.01] hover:from-blue-600 hover:to-blue-400"
              >
                LOGIN

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* CREATE ACCOUNT */}
            <div className="mt-6">
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-gray-700" />

                <span className="text-sm text-gray-300">
                  Don't have an account?
                </span>

                <span className="h-px flex-1 bg-gray-700" />
              </div>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-blue-500 bg-transparent text-sm font-medium text-blue-400 transition hover:bg-blue-500/10"
              >
                <UserPlus size={18} />

                CREATE ACCOUNT
              </button>
            </div>

            {/* BENEFITS */}
            <div className="mt-6 grid grid-cols-3 border-t border-gray-700 pt-6">
              <Benefit
                icon={<Car size={25} />}
                title="Wide Selection"
                text="Quality cars for every budget"
              />

              <Benefit
                icon={<ShieldCheck size={25} />}
                title="Trusted Dealer"
                text="100% reliable and verified"
              />

              <Benefit
                icon={<Headphones size={25} />}
                title="24/7 Support"
                text="We are here to help you"
              />
            </div>
          </section>

          {/* =====================================================
              OR DIVIDER
          ====================================================== */}
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative h-full w-px bg-gray-700">
              <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-[#0c121a] text-gray-300">
                or
              </div>
            </div>
          </div>

          {/* MOBILE OR */}
          <div className="flex items-center gap-4 lg:hidden">
            <span className="h-px flex-1 bg-gray-700" />

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#0c121a] text-sm text-gray-400">
              or
            </span>

            <span className="h-px flex-1 bg-gray-700" />
          </div>

          {/* =====================================================
              ADMIN LOGIN
          ====================================================== */}
          <section className="rounded-2xl border border-red-500/50 bg-[#111720]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">

            {/* ICON */}
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-red-500 bg-red-600/20 shadow-[0_0_25px_rgba(239,68,68,0.25)]">
                <ShieldCheck size={46} strokeWidth={1.8} />
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold tracking-wide sm:text-3xl">
              ADMIN LOGIN
            </h2>

            <div className="mx-auto mt-5 h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            <p className="mx-auto mt-5 max-w-md text-center text-sm leading-6 text-gray-300">
              Secure access for authorized
              <br />
              JamesAutos personnel only.
            </p>

            <form
              onSubmit={handleAdminLogin}
              className="mt-7 space-y-5"
            >

              {/* ADMIN EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter admin email"
                    required
                    className="h-14 w-full rounded-lg border border-gray-600 bg-[#171d26]/80 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* ADMIN PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showAdminPassword ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-14 w-full rounded-lg border border-gray-600 bg-[#171d26]/80 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowAdminPassword(!showAdminPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                    aria-label="Toggle admin password visibility"
                  >
                    {showAdminPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER / FORGOT */}
              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={adminRemember}
                    onChange={(e) =>
                      setAdminRemember(e.target.checked)
                    }
                    className="h-4 w-4 accent-red-600"
                  />

                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/admin/forgot-password")}
                  className="text-red-400 transition hover:text-red-300"
                >
                  Forgot Password?
                </button>
              </div>

              {/* ADMIN LOGIN */}
              <button
                type="submit"
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-red-700 to-red-500 font-semibold shadow-lg shadow-red-900/30 transition duration-300 hover:scale-[1.01] hover:from-red-600 hover:to-red-400"
              >
                LOGIN

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* RESTRICTED ACCESS */}
            <div className="mt-6 rounded-xl border border-red-600/50 bg-red-950/30 p-5">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-red-500">
                  <Shield size={25} />
                </div>

                <div>
                  <h3 className="font-semibold text-red-500">
                    Restricted Access
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-300">
                    This area is restricted to authorized
                    administrators only.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-gray-800 bg-[#0c121a]/95">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-7 sm:px-8 lg:grid-cols-3 lg:px-12">

          {/* HELP */}
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="group flex items-center gap-4 text-left"
          >
            <Headphones
              size={28}
              className="text-gray-400 transition group-hover:text-blue-500"
            />

            <div>
              <p className="font-medium">Need Help?</p>

              <p className="text-sm text-gray-400 group-hover:text-gray-300">
                Contact our support team
              </p>
            </div>
          </button>

          {/* CONTACT */}
          <div className="border-y border-gray-800 py-4 lg:border-x lg:border-y-0 lg:px-10 lg:py-0">

            {/* PHONE */}
            <a
              href="tel:+2348012345678"
              className="flex items-center gap-4 transition hover:text-blue-400"
            >
              <Phone size={22} className="text-gray-400" />

              <span className="text-sm text-gray-300">
                +234 801 234 5678
              </span>
            </a>

            {/* EMAIL */}
            <a
              href="mailto:support@jamesautos.com"
              className="mt-2 flex items-center gap-4 transition hover:text-blue-400"
            >
              <Mail size={22} className="text-gray-400" />

              <span className="text-sm text-gray-300">
                support@jamesautos.com
              </span>
            </a>
          </div>

          {/* COPYRIGHT */}
          <div className="flex items-center gap-4 lg:justify-end">
            <Shield size={28} className="text-gray-400" />

            <div>
              <p className="text-sm text-gray-300">
                © 2026 JamesAutos. All rights reserved.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Premium cars, premium service.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Benefit = ({
  icon,
  title,
  text,
}: BenefitProps) => {
  return (
    <div className="px-2 text-center">
      <div className="flex justify-center text-blue-500">
        {icon}
      </div>

      <h3 className="mt-2 text-xs font-semibold text-gray-200 sm:text-sm">
        {title}
      </h3>

      <p className="mt-1 text-[10px] leading-4 text-gray-400 sm:text-xs">
        {text}
      </p>
    </div>
  );
};

export default LoginPortal;