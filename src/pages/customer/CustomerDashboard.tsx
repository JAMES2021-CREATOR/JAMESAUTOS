import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  User,
  Mail,
  Phone,
  LogOut,
  Car,
  Calendar,
  Heart,
} from "lucide-react";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
}

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadCustomer = async () => {
      try {
        // ==========================================
        // 1. CHECK AUTHENTICATED USER
        // ==========================================
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        console.log("AUTH USER:", user);
        console.log("AUTH ERROR:", userError);

        if (userError) {
          console.error("Authentication error:", userError);
          return;
        }

        // ==========================================
        // 2. NO AUTHENTICATED USER
        // ==========================================
        if (!user) {
          console.warn("No authenticated user found.");
          navigate("/login", { replace: true });
          return;
        }

        console.log("AUTH USER ID:", user.id);
        console.log("AUTH EMAIL:", user.email);

        // ==========================================
        // 3. GET CUSTOMER PROFILE
        // ==========================================
        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, email, phone, role")
          .eq("id", user.id)
          .maybeSingle();

        console.log("PROFILE DATA:", data);
        console.log("PROFILE ERROR:", profileError);

        // ==========================================
        // 4. DATABASE ERROR
        // ==========================================
        if (profileError) {
          console.error("Profile fetch error:", profileError);

          // Do NOT immediately send the customer
          // back to login because of a profile error.
          if (mounted) {
            setProfile({
              id: user.id,
              full_name:
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                null,
              email: user.email || null,
              phone: user.user_metadata?.phone || null,
              role: "customer",
            });
          }

          return;
        }

        // ==========================================
        // 5. PROFILE DOES NOT EXIST
        // ==========================================
        if (!data) {
          console.warn(
            "No profile found. Using Supabase Auth information."
          );

          if (mounted) {
            setProfile({
              id: user.id,
              full_name:
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                null,
              email: user.email || null,
              phone: user.user_metadata?.phone || null,
              role: "customer",
            });
          }

          return;
        }

        // ==========================================
        // 6. PROFILE FOUND
        // ==========================================
        if (mounted) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Customer dashboard error:", error);

        // IMPORTANT:
        // Do not automatically redirect to login for
        // every error. Only redirect when there is
        // definitely no authenticated session.

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login", { replace: true });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCustomer();

    // ==========================================
    // 7. LISTEN FOR AUTH CHANGES
    // ==========================================
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH EVENT:", event);
      console.log("AUTH SESSION:", session);

      if (event === "SIGNED_OUT" || !session) {
        navigate("/login", { replace: true });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        return;
      }

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#F5C400]/30 border-t-[#F5C400]" />

          <p className="mt-4 text-gray-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* ================= HEADER ================= */}
      <header className="border-b border-white/10 bg-[#101010]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <div>
            <h1 className="text-xl font-black tracking-wide sm:text-2xl">
              JAMES<span className="text-[#F5C400]">AUTOS</span>
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Customer Dashboard
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={17} />

            <span className="hidden sm:block">
              Logout
            </span>
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* ================= WELCOME ================= */}
        <section className="rounded-2xl border border-[#F5C400]/20 bg-[#111111] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F5C400]/10 text-[#F5C400]">
              <User size={30} />
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Welcome back,
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                {profile?.full_name || "Customer"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your JamesAutos account and activities.
              </p>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            icon={<Car size={24} />}
            title="Cars Viewed"
            value="0"
          />

          <DashboardCard
            icon={<Calendar size={24} />}
            title="Test Drives"
            value="0"
          />

          <DashboardCard
            icon={<Heart size={24} />}
            title="Saved Cars"
            value="0"
          />

          <DashboardCard
            icon={<User size={24} />}
            title="Account"
            value="Active"
          />
        </section>

        {/* ================= PROFILE ================= */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <User
              className="text-[#F5C400]"
              size={22}
            />

            <h2 className="text-xl font-bold">
              My Profile
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ProfileItem
              icon={<User size={19} />}
              label="Full Name"
              value={profile?.full_name || "Not provided"}
            />

            <ProfileItem
              icon={<Mail size={19} />}
              label="Email Address"
              value={profile?.email || "Not provided"}
            />

            <ProfileItem
              icon={<Phone size={19} />}
              label="Phone Number"
              value={profile?.phone || "Not provided"}
            />

            <ProfileItem
              icon={<User size={19} />}
              label="Account Type"
              value={profile?.role || "Customer"}
            />
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-8">
          <h2 className="mb-5 text-xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

  {/* BROWSE CARS */}
  <button
    type="button"
    onClick={() => navigate("/customer/cars")}
    className="rounded-xl border border-white/10 bg-[#111111] p-6 text-left transition hover:border-[#F5C400]/50 hover:bg-[#151515]"
  >
    <Car
      className="text-[#F5C400]"
      size={25}
    />

    <h3 className="mt-4 font-bold">
      Browse Cars
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Explore our available vehicles.
    </p>
  </button>


  {/* TEST DRIVE */}
  <button
    type="button"
    onClick={() => navigate("/customer/test-drives")}
    className="rounded-xl border border-white/10 bg-[#111111] p-6 text-left transition hover:border-[#F5C400]/50 hover:bg-[#151515]"
  >
    <Calendar
      className="text-[#F5C400]"
      size={25}
    />

    <h3 className="mt-4 font-bold">
      Book a Test Drive
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Schedule and manage your test drives.
    </p>
  </button>


  {/* CUSTOMER SUPPORT / CHAT */}
  <button
    type="button"
    onClick={() => navigate("/customer/messages")}
    className="rounded-xl border border-white/10 bg-[#111111] p-6 text-left transition hover:border-[#F5C400]/50 hover:bg-[#151515]"
  >
    <Mail
      className="text-[#F5C400]"
      size={25}
    />

    <h3 className="mt-4 font-bold">
      Contact Support
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Chat with the JamesAutos support team.
    </p>
  </button>

</div>
        </section>
      </main>
    </div>
  );
};

// ==========================================
// DASHBOARD CARD
// ==========================================

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

const DashboardCard = ({
  icon,
  title,
  value,
}: DashboardCardProps) => {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F5C400]/10 text-[#F5C400]">
        {icon}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
};

// ==========================================
// PROFILE ITEM
// ==========================================

interface ProfileItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const ProfileItem = ({
  icon,
  label,
  value,
}: ProfileItemProps) => {
  return (
    <div className="rounded-xl border border-white/10 bg-[#080808] p-5">
      <div className="flex items-center gap-3 text-[#F5C400]">
        {icon}

        <span className="text-xs uppercase tracking-wider text-gray-500">
          {label}
        </span>
      </div>

      <p className="mt-3 break-words text-sm font-medium text-gray-200">
        {value}
      </p>
    </div>
  );
};

export default CustomerDashboard;