import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const AdminResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setSuccess(
        "Your password has been successfully updated. Redirecting to login..."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to update your password. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">

        <div className="w-full max-w-lg rounded-3xl border border-[#F5C400]/30 bg-[#111111] p-6 shadow-2xl sm:p-10">

          {/* ICON */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F5C400] bg-[#F5C400]/10">
              <ShieldCheck
                size={40}
                className="text-[#F5C400]"
              />
            </div>
          </div>

          {/* TITLE */}
          <div className="mt-7 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C400]">
              Admin Security
            </p>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              Reset Password
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400">
              Create a new secure password for your
              JamesAutos administrator account.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-7 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-400">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mt-7 flex gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm leading-6 text-green-400">
              <CheckCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <span>{success}</span>
            </div>
          )}

          {/* FORM */}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  required
                  className="h-14 w-full rounded-xl border border-gray-700 bg-[#171717] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
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
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  required
                  className="h-14 w-full rounded-xl border border-gray-700 bg-[#171717] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
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

            {/* PASSWORD REQUIREMENT */}
            <div className="rounded-xl border border-gray-800 bg-[#0c0c0c] p-4">
              <p className="text-xs text-gray-400">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#D4A900] to-[#F5C400] font-bold text-black transition hover:from-[#F5C400] hover:to-[#FFD633] disabled:cursor-not-allowed disabled:opacity-60"
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
                  UPDATE PASSWORD
                  <ShieldCheck size={20} />
                </>
              )}
            </button>

          </form>

          {/* BACK */}
          <div className="mt-8 border-t border-gray-800 pt-6">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400 transition hover:text-[#F5C400]"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default AdminResetPassword;