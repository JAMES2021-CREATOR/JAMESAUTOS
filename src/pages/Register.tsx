import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, UserPlus, Car } from "lucide-react";
import { supabase } from "../lib/supabase";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role: "customer",
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (!data.user) {
        throw new Error("Account could not be created.");
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        email: email,
        phone: phone,
        role: "customer",
      });

      if (profileError) {
        throw profileError;
      }

      setSuccess(
        "Account created successfully. Please check your email to verify your account.",
      );
      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      // If email confirmation is disabled in Supabase,
      // the user can go directly to the dashboard.
      if (data.session) {
        navigate("/customer/dashboard");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080d14] px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111720] shadow-2xl lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="hidden min-h-[700px] flex-col justify-between bg-yellow-500 p-10 text-black lg:flex">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-yellow-500">
                  <Car size={25} />
                </div>

                <div>
                  <h1 className="text-xl font-black">JAMESAUTOS</h1>

                  <p className="text-xs font-medium uppercase tracking-widest">
                    Premium Vehicles
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em]">
                Welcome To
              </p>

              <h2 className="mt-4 text-5xl font-black leading-tight">
                Your Next
                <br />
                Dream Car.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-black/70">
                Create your JamesAutos account and get access to our premium
                vehicles, enquiries and customer services.
              </p>
            </div>

            <p className="text-sm font-medium text-black/60">
              © {new Date().getFullYear()} JamesAutos
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-7 sm:p-10 lg:p-12">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Create Account
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Join JamesAutos
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Create your account to get started.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FULL NAME */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 text-sm outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 text-sm outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08051388846"
                  required
                  className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 text-sm outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 pr-12 text-sm outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-500"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 pr-12 text-sm outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-500"
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
                className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-yellow-500 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* LOGIN */}
            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-yellow-500 hover:text-yellow-400"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
