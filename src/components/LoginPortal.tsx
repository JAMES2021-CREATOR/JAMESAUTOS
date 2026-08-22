import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

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
  Loader2,
} from "lucide-react";

interface BenefitProps {
  icon: ReactNode;
  title: string;
  text: string;
}

const LoginPortal = () => {
  const navigate = useNavigate();

  // ==============================
  // PASSWORD VISIBILITY
  // ==============================

  const [showCustomerPassword, setShowCustomerPassword] =
    useState(false);

  const [showAdminPassword, setShowAdminPassword] =
    useState(false);

  // ==============================
  // CUSTOMER
  // ==============================

  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");

  const [customerRemember, setCustomerRemember] = useState(true);

  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerError, setCustomerError] = useState("");

  // ==============================
  // ADMIN
  // ==============================

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [adminRemember, setAdminRemember] = useState(true);

  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");

  // =====================================================
  // CUSTOMER LOGIN
  // =====================================================

  const handleCustomerLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setCustomerError("");

    if (!customerEmail.trim() || !customerPassword) {
      setCustomerError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setCustomerLoading(true);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: customerEmail.trim(),
          password: customerPassword,
        });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("Unable to log you in.");
      }

      // Remember login preference
      if (customerRemember) {
        localStorage.setItem(
          "customerRemember",
          "true"
        );
      } else {
        localStorage.removeItem(
          "customerRemember"
        );
      }

      // Customer successfully logged in
      navigate("/customer/dashboard");

    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";

      setCustomerError(message);

    } finally {
      setCustomerLoading(false);
    }
  };

  // =====================================================
  // ADMIN LOGIN
  // =====================================================

  const handleAdminLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setAdminError("");

    if (!adminEmail.trim() || !adminPassword) {
      setAdminError(
        "Please enter your admin email and password."
      );
      return;
    }

    try {
      setAdminLoading(true);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: adminEmail.trim(),
          password: adminPassword,
        });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("Unable to log you in.");
      }

      // Remember login preference
      if (adminRemember) {
        localStorage.setItem(
          "adminRemember",
          "true"
        );
      } else {
        localStorage.removeItem(
          "adminRemember"
        );
      }

      /*
       * TEMPORARY ADMIN LOGIN
       *
       * Later we will check the user's role
       * from Supabase before allowing access.
       */

      navigate("/admin/dashboard");

    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Admin login failed. Please try again.";

      setAdminError(message);

    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080808] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="fixed inset-0 -z-10">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/jamesautos-bg.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-black/90" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/85 to-black" />

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#F5C400]/10 blur-[140px]" />

      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12">

        {/* =====================================================
            LOGO
        ====================================================== */}

        <div className="mb-10 text-center">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="group cursor-pointer"
          >

            <div className="flex items-center justify-center gap-3">

              <h1 className="text-4xl font-black tracking-[0.12em] sm:text-5xl">

                <span className="text-white">
                  JAMES
                </span>

                <span className="text-[#F5C400]">
                  AUTOS
                </span>

              </h1>

            </div>

            <div className="mt-3 flex items-center justify-center gap-4">

              <span className="h-px w-12 bg-[#F5C400]/50" />

              <p className="text-[11px] font-medium tracking-[0.4em] text-gray-400">
                PREMIUM AUTO DEALER
              </p>

              <span className="h-px w-12 bg-[#F5C400]/50" />

            </div>

          </button>

        </div>

        {/* =====================================================
            LOGIN CONTAINER
        ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">

          {/* ===================================================
              CUSTOMER LOGIN
          ==================================================== */}

          <section className="rounded-2xl border border-[#F5C400]/30 bg-[#111111]/95 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:border-[#F5C400]/60 sm:p-8 lg:p-10">

            {/* ICON */}

            <div className="flex justify-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#F5C400] bg-[#F5C400]/10 shadow-[0_0_30px_rgba(245,196,0,0.18)]">

                <User
                  size={46}
                  strokeWidth={1.8}
                  className="text-[#F5C400]"
                />

              </div>

            </div>

            <h2 className="mt-6 text-center text-2xl font-bold tracking-wide sm:text-3xl">
              CUSTOMER LOGIN
            </h2>

            <div className="mx-auto mt-5 h-px w-full bg-gradient-to-r from-transparent via-[#F5C400] to-transparent" />

            <p className="mx-auto mt-5 max-w-md text-center text-sm leading-6 text-gray-300">
              Access your account to browse cars,
              <br />
              book test drives and more.
            </p>

            {/* CUSTOMER ERROR */}

            {customerError && (
              <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-400">
                {customerError}
              </div>
            )}

            {/* CUSTOMER FORM */}

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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) =>
                      setCustomerEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="h-14 w-full rounded-lg border border-gray-700 bg-[#171717] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type={
                      showCustomerPassword
                        ? "text"
                        : "password"
                    }
                    value={customerPassword}
                    onChange={(e) =>
                      setCustomerPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-14 w-full rounded-lg border border-gray-700 bg-[#171717] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCustomerPassword(
                        !showCustomerPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#F5C400]"
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

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">

                <label className="flex cursor-pointer items-center gap-2 text-gray-300">

                  <input
                    type="checkbox"
                    checked={customerRemember}
                    onChange={(e) =>
                      setCustomerRemember(
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 accent-[#F5C400]"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                  className="text-[#F5C400] transition hover:text-[#FFD633]"
                >
                  Forgot Password?
                </button>

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={customerLoading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#D4A900] to-[#F5C400] font-bold text-black shadow-lg shadow-[#F5C400]/20 transition duration-300 hover:scale-[1.01] hover:from-[#F5C400] hover:to-[#FFD633] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {customerLoading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />

                    LOGGING IN...
                  </>
                ) : (
                  <>
                    LOGIN

                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>

            {/* CREATE ACCOUNT */}

            <div className="mt-6">

              <div className="flex items-center gap-4">

                <span className="h-px flex-1 bg-gray-700" />

                <span className="text-center text-sm text-gray-300">
                  Don't have an account?
                </span>

                <span className="h-px flex-1 bg-gray-700" />

              </div>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#F5C400] bg-transparent text-sm font-medium text-[#F5C400] transition hover:bg-[#F5C400]/10"
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

          {/* ===================================================
              DESKTOP DIVIDER
          ==================================================== */}

          <div className="hidden items-center justify-center lg:flex">

            <div className="relative h-full w-px bg-gray-700">

              <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F5C400]/30 bg-[#0c0c0c] text-[#F5C400]">
                or
              </div>

            </div>

          </div>

          {/* ===================================================
              MOBILE DIVIDER
          ==================================================== */}

          <div className="flex items-center gap-4 lg:hidden">

            <span className="h-px flex-1 bg-gray-700" />

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F5C400]/30 bg-[#0c0c0c] text-sm text-[#F5C400]">
              or
            </span>

            <span className="h-px flex-1 bg-gray-700" />

          </div>

          {/* ===================================================
              ADMIN LOGIN
          ==================================================== */}

          <section className="rounded-2xl border border-[#F5C400]/30 bg-[#111111]/95 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:border-[#F5C400]/60 sm:p-8 lg:p-10">

            {/* ICON */}

            <div className="flex justify-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#F5C400] bg-[#F5C400]/10 shadow-[0_0_30px_rgba(245,196,0,0.18)]">

                <ShieldCheck
                  size={46}
                  strokeWidth={1.8}
                  className="text-[#F5C400]"
                />

              </div>

            </div>

            <h2 className="mt-6 text-center text-2xl font-bold tracking-wide sm:text-3xl">
              ADMIN LOGIN
            </h2>

            <div className="mx-auto mt-5 h-px w-full bg-gradient-to-r from-transparent via-[#F5C400] to-transparent" />

            <p className="mx-auto mt-5 max-w-md text-center text-sm leading-6 text-gray-300">
              Secure access for authorized
              <br />
              JamesAutos personnel only.
            </p>

            {/* ADMIN ERROR */}

            {adminError && (
              <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-400">
                {adminError}
              </div>
            )}

            {/* ADMIN FORM */}

            <form
              onSubmit={handleAdminLogin}
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) =>
                      setAdminEmail(e.target.value)
                    }
                    placeholder="Enter admin email"
                    autoComplete="email"
                    required
                    className="h-14 w-full rounded-lg border border-gray-700 bg-[#171717] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type={
                      showAdminPassword
                        ? "text"
                        : "password"
                    }
                    value={adminPassword}
                    onChange={(e) =>
                      setAdminPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-14 w-full rounded-lg border border-gray-700 bg-[#171717] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowAdminPassword(
                        !showAdminPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#F5C400]"
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

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">

                <label className="flex cursor-pointer items-center gap-2 text-gray-300">

                  <input
                    type="checkbox"
                    checked={adminRemember}
                    onChange={(e) =>
                      setAdminRemember(
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 accent-[#F5C400]"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/forgot-password")
                  }
                  className="text-[#F5C400] transition hover:text-[#FFD633]"
                >
                  Forgot Password?
                </button>

              </div>

              {/* ADMIN LOGIN BUTTON */}

              <button
                type="submit"
                disabled={adminLoading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#D4A900] to-[#F5C400] font-bold text-black shadow-lg shadow-[#F5C400]/20 transition duration-300 hover:scale-[1.01] hover:from-[#F5C400] hover:to-[#FFD633] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {adminLoading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />

                    LOGGING IN...
                  </>
                ) : (
                  <>
                    LOGIN

                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>

            {/* RESTRICTED ACCESS */}

            <div className="mt-6 rounded-xl border border-[#F5C400]/30 bg-[#F5C400]/5 p-5">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5C400]/10 text-[#F5C400]">
                  <Shield size={25} />
                </div>

                <div>

                  <h3 className="font-semibold text-[#F5C400]">
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

      <footer className="border-t border-[#F5C400]/20 bg-[#0c0c0c]/95">

        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-7 sm:px-8 lg:grid-cols-3 lg:px-12">

          {/* HELP */}

          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="group flex items-center gap-4 text-left"
          >

            <Headphones
              size={28}
              className="text-gray-500 transition group-hover:text-[#F5C400]"
            />

            <div>

              <p className="font-medium">
                Need Help?
              </p>

              <p className="text-sm text-gray-400 group-hover:text-gray-300">
                Contact our support team
              </p>

            </div>

          </button>

          {/* CONTACT */}

          <div className="border-y border-gray-800 py-4 lg:border-x lg:border-y-0 lg:px-10 lg:py-0">

            <a
              href="tel:08051388846"
              className="flex items-center gap-4 transition hover:text-[#F5C400]"
            >

              <Phone
                size={22}
                className="text-gray-500"
              />

              <span className="text-sm text-gray-300">
                08051388846
              </span>

            </a>

            <a
              href="mailto:support@jamesautos.com"
              className="mt-2 flex items-center gap-4 transition hover:text-[#F5C400]"
            >

              <Mail
                size={22}
                className="text-gray-500"
              />

              <span className="text-sm text-gray-300">
                support@jamesautos.com
              </span>

            </a>

          </div>

          {/* COPYRIGHT */}

          <div className="flex items-center gap-4 lg:justify-end">

            <Shield
              size={28}
              className="text-[#F5C400]"
            />

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

// =====================================================
// BENEFIT COMPONENT
// =====================================================

const Benefit = ({
  icon,
  title,
  text,
}: BenefitProps) => {
  return (
    <div className="px-2 text-center">

      <div className="flex justify-center text-[#F5C400]">
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