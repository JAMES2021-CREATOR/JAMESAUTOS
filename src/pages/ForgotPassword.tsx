import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Car, Loader2, Mail, Send } from "lucide-react";
import { supabase } from "../lib/supabase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/reset-password`,
          }
        );

      if (resetError) {
        throw resetError;
      }

      setSuccess(
        "Password reset link has been sent. Please check your email."
      );

      setEmail("");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to send reset link. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-3xl border border-[#F5C400]/20 bg-[#111111] shadow-2xl lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="hidden min-h-[600px] flex-col justify-between bg-[#F5C400] p-10 text-black lg:flex">

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

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em]">
                Account Security
              </p>

              <h2 className="mt-4 text-5xl font-black leading-tight">
                Reset Your
                <br />
                Password.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-black/70">
                Enter the email address connected to your JamesAutos
                account and we'll send you a secure password reset link.
              </p>
            </div>

            <p className="text-sm font-medium text-black/60">
              © {new Date().getFullYear()} JamesAutos
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-7 sm:p-10 lg:p-12">

            {/* ICON */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F5C400]/30 bg-[#F5C400]/10 text-[#F5C400]">
              <Mail size={30} />
            </div>

            {/* HEADER */}
            <div className="mt-7">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F5C400]">
                Forgot Password
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Reset Your Password
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Enter your email address and we'll send you a link
                to create a new password.
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
              <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm leading-5 text-green-400">
                {success}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-200"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="h-14 w-full rounded-lg border border-gray-700 bg-[#080808] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#F5C400] focus:ring-1 focus:ring-[#F5C400]"
                  />
                </div>
              </div>

              {/* BUTTON */}
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
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    SEND RESET LINK
                  </>
                )}
              </button>
            </form>

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

export default ForgotPassword;