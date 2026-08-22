import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/admin/reset-password`,
        }
      );

      if (error) {
        throw error;
      }

      setSuccess(
        "Password reset instructions have been sent to your email. Please check your inbox."
      );

      setEmail("");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to send reset email. Please try again.";

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
              Forgot Password?
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400">
              Enter the email address associated with your
              administrator account and we will send you a
              password reset link.
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
            <div className="mt-7 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm leading-6 text-green-400">
              {success}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Admin Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email"
                  autoComplete="email"
                  required
                  className="h-14 w-full rounded-xl border border-gray-700 bg-[#171717] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
                />
              </div>
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
                  SENDING...
                </>
              ) : (
                <>
                  SEND RESET LINK
                  <Mail size={20} />
                </>
              )}
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <div className="mt-8 border-t border-gray-800 pt-6">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400 transition hover:text-[#F5C400]"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>

          {/* SECURITY NOTICE */}
          <div className="mt-6 rounded-xl border border-[#F5C400]/20 bg-[#F5C400]/5 p-4">
            <div className="flex gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#F5C400]"
              />

              <p className="text-xs leading-5 text-gray-400">
                This password recovery area is intended for
                authorized JamesAutos administrators only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminForgotPassword;