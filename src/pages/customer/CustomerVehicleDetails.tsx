import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Car,
  Fuel,
  Gauge,
  MessageSquare,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number | null;
  transmission: string | null;
  fuel_type: string | null;
  description: string | null;
  image_url: string | null;
  status: string;
  created_at?: string;
}

const CustomerVehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD VEHICLE
  // =====================================================

  useEffect(() => {
    const loadVehicle = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error(
            "Customer vehicle details error:",
            error
          );

          setVehicle(null);
          return;
        }

        console.log(
          "CUSTOMER VEHICLE DETAILS:",
          data
        );

        setVehicle(data);
      } catch (error) {
        console.error(
          "Error loading vehicle:",
          error
        );

        setVehicle(null);
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

          <p className="mt-4 text-sm text-gray-500">
            Loading vehicle details...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // VEHICLE NOT FOUND
  // =====================================================

  if (!vehicle) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">

        <div className="max-w-md text-center">

          <Car
            size={60}
            className="mx-auto text-gray-700"
          />

          <h1 className="mt-5 text-2xl font-black">
            Vehicle Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            This vehicle may have been removed or is
            no longer available.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/customer/vehicles")
            }
            className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
          >
            Back to Vehicles
          </button>

        </div>

      </div>
    );
  }

  const isAvailable =
    vehicle.status.toLowerCase() === "available";

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="space-y-8">

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          navigate("/customer/vehicles")
        }
        className="flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-yellow-500"
      >
        <ArrowLeft size={18} />

        Back to Vehicles
      </button>

      {/* =================================================
          MAIN VEHICLE
      ================================================= */}

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111720]">

        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="relative h-[280px] overflow-hidden bg-[#080d14] sm:h-[400px] lg:h-[520px]">

          {vehicle.image_url &&
          vehicle.image_url.trim() !== "" ? (
            <img
              src={vehicle.image_url}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="h-full w-full object-cover"
              onError={(event) => {
                console.error(
                  "Vehicle details image failed:",
                  vehicle.image_url
                );

                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">

              <Car
                size={90}
                className="text-gray-700"
              />

            </div>
          )}

          {/* STATUS */}

          <div className="absolute right-5 top-5">

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold capitalize backdrop-blur-md ${
                isAvailable
                  ? "bg-green-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {vehicle.status}
            </span>

          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="p-6 sm:p-8 lg:p-10">

          {/* HEADER */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-500">
                {vehicle.brand}
              </p>

              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                {vehicle.model}
              </h1>

              <p className="mt-2 text-gray-500">
                {vehicle.year} Model
              </p>

            </div>

            {/* PRICE */}

            <div className="lg:text-right">

              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Price
              </p>

              <p className="mt-1 text-3xl font-black text-yellow-500">
                ₦{Number(vehicle.price).toLocaleString()}
              </p>

            </div>

          </div>

          {/* =================================================
              SPECIFICATIONS
          ================================================= */}

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <Specification
              icon={<Gauge size={20} />}
              label="Mileage"
              value={
                vehicle.mileage !== null
                  ? `${vehicle.mileage.toLocaleString()} km`
                  : "Not specified"
              }
            />

            <Specification
              icon={<Settings size={20} />}
              label="Transmission"
              value={
                vehicle.transmission ||
                "Not specified"
              }
            />

            <Specification
              icon={<Fuel size={20} />}
              label="Fuel Type"
              value={
                vehicle.fuel_type ||
                "Not specified"
              }
            />

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          {vehicle.description && (
            <div className="mt-8 border-t border-white/10 pt-8">

              <h2 className="text-xl font-bold">
                Vehicle Description
              </h2>

              <p className="mt-4 max-w-4xl whitespace-pre-line text-sm leading-7 text-gray-400">
                {vehicle.description}
              </p>

            </div>
          )}

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">

            <button
              type="button"
              disabled={!isAvailable}
              onClick={() =>
                navigate(
                  `/customer/test-drives?vehicle=${vehicle.id}`
                )
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
            >
              <Calendar size={19} />

              {isAvailable
                ? "Book Test Drive"
                : "Vehicle Unavailable"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/customer/messages?vehicle=${vehicle.id}`
                )
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-white transition hover:border-yellow-500/40 hover:bg-yellow-500/10"
            >
              <MessageSquare size={19} />

              Send Message
            </button>

          </div>

          {/* =================================================
              SECURITY / TRUST
          ================================================= */}

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-green-500/10 bg-green-500/5 p-4">

            <ShieldCheck
              size={22}
              className="mt-0.5 shrink-0 text-green-400"
            />

            <div>

              <p className="text-sm font-semibold text-green-400">
                JamesAutos Customer Protection
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Vehicle information is managed by
                the JamesAutos administration team.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

// =====================================================
// SPECIFICATION COMPONENT
// =====================================================

interface SpecificationProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Specification = ({
  icon,
  label,
  value,
}: SpecificationProps) => {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0c121a] p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs uppercase tracking-wider text-gray-500">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-white">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
};

export default CustomerVehicleDetails;