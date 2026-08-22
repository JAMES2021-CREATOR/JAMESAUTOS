import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Car,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  CheckCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // CHECK RESET SESSION
  // ==========================================
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (!data.session) {
          setError(
            "This password reset link is invalid or has expired."
          );
        }
      } catch {
        setError(
          "Unable to verify the password reset session."
        );
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  // ==========================================
  // UPDATE PASSWORD
  // ==========================================
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { error: updateError } =
        await supabase.auth.updateUser({
          password,
        });

      if (updateError) {
        throw updateError;
      }

      setSuccess(
        "Your password has been updated successfully."
      );

      setPassword("");
      setConfirmPassword("");

      // Sign the user out after changing password
      await supabase.auth.signOut();

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to update your password.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CHECKING SESSION SCREEN
  // ==========================================
  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-5 text-white">
        <div className="flex flex-col items-center text-center">
          <Loader2
            size={40}
            className="animate-spin text-[#F5C400]"
          />

          <p className="mt-4 text-sm text-gray-400">
            Verifying password reset link...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-10 text-white sm:px-8">

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-3xl border border-[#F5C400]/20 bg-[#111111] shadow-2xl lg:grid-cols-2">

          {/* ==========================================
              LEFT SIDE
          ========================================== */}
          <div className="hidden min-h-[650px] flex-col justify-between bg-[#F5C400] p-10 text-black lg:flex">

            {/* BRAND */}
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-[#F5C400]">
                <Car size={25} />
              </div>

              <div>
                <h1 className="text-xl font-black tracking-wide">
                  JAMESAUTOS
                </h1>

                <p className="text-xs font-medium uppercase tracking-widest">
                  Premium Vehicles
                </p>
              </div>

            </div>

            {/* CONTENT */}
            <div>

              <p className="text-sm font-bold uppercase tracking-[0.3em]">
                Account Security
              </p>

              <h2 className="mt-4 text-5xl font-black leading-tight">
                Create A
                <br />
                New Password.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-black/70">
                Choose a strong password to protect your
                JamesAutos account and keep your information secure.
              </p>

            </div>

            {/* COPYRIGHT */}
            <p className="text-sm font-medium text-black/60">
              © {new Date().getFullYear()} JamesAutos
            </p>

          </div>

          {/* ==========================================
              RIGHT SIDE
          ========================================== */}
          <div className="p-7 sm:p-10 lg:p-12">

            {/* ICON */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F5C400]/30 bg-[#F5C400]/10 text-[#F5C400]">
              <KeyRound size={30} />
            </div>

            {/* HEADER */}
            <div className="mt-7">

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F5C400]">
                Password Reset
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Create New Password
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Enter your new password below. Make sure it
                is at least 6 characters long.
              </p>

            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-400">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="mt-6 flex gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm leading-5 text-green-400">

                <CheckCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <span>{success}</span>

              </div>
            )}

            {/* FORM */}
            {!success && (
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >

                {/* NEW PASSWORD */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    New Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      required
                      className="h-14 w-full rounded-lg border border-gray-700 bg-[#080808] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#F5C400]"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* CONFIRM PASSWORD */}
                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Confirm New Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      required
                      className="h-14 w-full rounded-lg border border-gray-700 bg-[#080808] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#F5C400]"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#F5C400] font-bold text-black transition hover:bg-[#FFD633] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      UPDATING PASSWORD...
                    </>
                  ) : (
                    <>
                      <KeyRound size={20} />

                      UPDATE PASSWORD
                    </>
                  )}

                </button>

              </form>
            )}

            {/* BACK TO LOGIN */}
            <div className="mt-8 text-center">

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#F5C400]"
              >
                <ArrowLeft size={17} />
                Back to Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default ResetPassword;