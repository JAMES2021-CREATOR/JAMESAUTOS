import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
}

const CustomerProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ======================================================
  // LOAD CUSTOMER PROFILE
  // ======================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("Auth error:", userError);
          setErrorMessage("Unable to load your account.");
          return;
        }

        if (!user) {
          setErrorMessage("No authenticated customer found.");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, email, phone, role")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Profile error:", error);

          // Use Auth information if profile row is unavailable
          const fallbackProfile: Profile = {
            id: user.id,
            full_name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              null,
            email: user.email || null,
            phone: user.user_metadata?.phone || null,
            role: "customer",
          };

          setProfile(fallbackProfile);
          setFullName(fallbackProfile.full_name || "");
          setPhone(fallbackProfile.phone || "");

          return;
        }

        if (data) {
          setProfile(data);
          setFullName(data.full_name || "");
          setPhone(data.phone || "");
        } else {
          const fallbackProfile: Profile = {
            id: user.id,
            full_name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              null,
            email: user.email || null,
            phone: user.user_metadata?.phone || null,
            role: "customer",
          };

          setProfile(fallbackProfile);
          setFullName(fallbackProfile.full_name || "");
          setPhone(fallbackProfile.phone || "");
        }
      } catch (error) {
        console.error("Customer profile error:", error);
        setErrorMessage("Something went wrong while loading your profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ======================================================
  // SAVE PROFILE
  // ======================================================

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      setSuccessMessage("");
      setErrorMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setErrorMessage("You must be logged in to update your profile.");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.trim(),
        })
        .eq("id", user.id);

      if (error) {
        console.error("Profile update error:", error);
        setErrorMessage("Unable to update your profile.");
        return;
      }

      setProfile((current) =>
        current
          ? {
              ...current,
              full_name: fullName.trim(),
              phone: phone.trim(),
            }
          : current
      );

      setSuccessMessage("Your profile has been updated successfully.");
    } catch (error) {
      console.error("Save profile error:", error);
      setErrorMessage("Something went wrong while saving your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  // ======================================================
  // CHANGE PASSWORD
  // ======================================================

  const handleChangePassword = async () => {
    try {
      setChangingPassword(true);
      setSuccessMessage("");
      setErrorMessage("");

      if (!newPassword || !confirmPassword) {
        setErrorMessage("Please enter and confirm your new password.");
        return;
      }

      if (newPassword.length < 6) {
        setErrorMessage(
          "Your new password must be at least 6 characters long."
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage("The passwords do not match.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Password update error:", error);
        setErrorMessage(error.message);
        return;
      }

      setNewPassword("");
      setConfirmPassword("");

      setSuccessMessage("Your password has been changed successfully.");
    } catch (error) {
      console.error("Change password error:", error);
      setErrorMessage("Something went wrong while changing your password.");
    } finally {
      setChangingPassword(false);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // PROFILE PAGE
  // ======================================================

  return (
    <div className="space-y-8 text-white">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div>
        <p className="text-sm text-gray-500">
          Customer Portal
        </p>

        <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your JamesAutos account information and security.
        </p>
      </div>

      {/* ==================================================
          SUCCESS / ERROR MESSAGE
      ================================================== */}

      {(successMessage || errorMessage) && (
        <div
          className={`flex items-start gap-3 rounded-xl border p-4 ${
            successMessage
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {successMessage ? (
            <CheckCircle
              size={20}
              className="mt-0.5 shrink-0"
            />
          ) : (
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />
          )}

          <p className="text-sm">
            {successMessage || errorMessage}
          </p>
        </div>
      )}

      {/* ==================================================
          ACCOUNT OVERVIEW
      ================================================== */}

      <section className="rounded-2xl border border-white/10 bg-[#0c121a] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
            <User size={30} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Account
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {profile?.full_name || "Customer"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {profile?.email || "No email available"}
            </p>
          </div>

          <div className="sm:ml-auto">
            <span className="inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-yellow-500">
              {profile?.role || "Customer"}
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================
          PERSONAL INFORMATION
      ================================================== */}

      <section className="rounded-2xl border border-white/10 bg-[#0c121a] p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <User
            size={22}
            className="text-yellow-500"
          />

          <div>
            <h2 className="text-xl font-bold">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your personal account information.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* FULL NAME */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-white/10 bg-[#080d14] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
              />
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                value={profile?.email || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-[#080d14]/70 py-3 pl-11 pr-4 text-sm text-gray-500 outline-none"
              />
            </div>

            <p className="mt-2 text-xs text-gray-600">
              Your email address cannot be changed here.
            </p>
          </div>

          {/* PHONE */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Phone Number
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-white/10 bg-[#080d14] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
              />
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}

        <div className="mt-6 flex justify-end border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />

            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </section>

      {/* ==================================================
          SECURITY
      ================================================== */}

      <section className="rounded-2xl border border-white/10 bg-[#0c121a] p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <Lock
            size={22}
            className="text-yellow-500"
          />

          <div>
            <h2 className="text-xl font-bold">
              Account Security
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Change your account password.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* NEW PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              New Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                placeholder="Enter new password"
                className="w-full rounded-xl border border-white/10 bg-[#080d14] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-white/10 bg-[#080d14] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-600">
            Password must contain at least 6 characters.
          </p>

          <button
            type="button"
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="flex items-center justify-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-3 text-sm font-bold text-yellow-500 transition hover:bg-yellow-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Lock size={18} />

            {changingPassword
              ? "Changing Password..."
              : "Change Password"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CustomerProfile;