import { useEffect, useState } from "react";
import {
  Car,
  Fuel,
  Gauge,
  Settings,
  Search,
  Eye,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
}

const CustomerVehicles = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Saved cars
  const [savedCars, setSavedCars] = useState<string[]>([]);
  const [savingCar, setSavingCar] = useState<string | null>(null);

  // =====================================================
  // LOAD VEHICLES FROM SUPABASE
  // =====================================================

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("vehicles")
        .select(
          `
          id,
          brand,
          model,
          year,
          price,
          mileage,
          transmission,
          fuel_type,
          description,
          image_url,
          status
        `
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Supabase vehicle error:", error);
        throw error;
      }

      console.log("CUSTOMER VEHICLES:", data);

      setVehicles(data ?? []);
    } catch (error) {
      console.error(
        "Error loading customer vehicles:",
        error
      );

      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD SAVED CARS
  // =====================================================

  const loadSavedCars = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSavedCars([]);
        return;
      }

      const { data, error } = await supabase
        .from("saved_cars")
        .select("vehicle_id")
        .eq("user_id", user.id);

      if (error) {
        console.error(
          "Error loading saved cars:",
          error
        );
        return;
      }

      setSavedCars(
        (data ?? []).map(
          (item) => item.vehicle_id
        )
      );
    } catch (error) {
      console.error(
        "Saved cars loading error:",
        error
      );

      setSavedCars([]);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadVehicles();
    loadSavedCars();
  }, []);

  // =====================================================
  // SAVE / UNSAVE CAR
  // =====================================================

  const handleSaveCar = async (vehicleId: string) => {
    try {
      setSavingCar(vehicleId);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // User is not logged in
      if (!user) {
        navigate("/login");
        return;
      }

      const isSaved = savedCars.includes(vehicleId);

      // =================================================
      // REMOVE FROM SAVED CARS
      // =================================================

      if (isSaved) {
        const { error } = await supabase
          .from("saved_cars")
          .delete()
          .eq("user_id", user.id)
          .eq("vehicle_id", vehicleId);

        if (error) {
          throw error;
        }

        setSavedCars((current) =>
          current.filter(
            (id) => id !== vehicleId
          )
        );

        return;
      }

      // =================================================
      // SAVE CAR
      // =================================================

      const { error } = await supabase
        .from("saved_cars")
        .insert({
          user_id: user.id,
          vehicle_id: vehicleId,
        });

      if (error) {
        throw error;
      }

      setSavedCars((current) => [
        ...current,
        vehicleId,
      ]);
    } catch (error) {
      console.error(
        "Save/unsave car error:",
        error
      );
    } finally {
      setSavingCar(null);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredVehicles = vehicles.filter(
    (vehicle) => {
      const searchText =
        `${vehicle.brand} ${vehicle.model} ${vehicle.year}`.toLowerCase();

      return searchText.includes(
        search.toLowerCase()
      );
    }
  );

  // =====================================================
  // VIEW VEHICLE
  // =====================================================

  const handleViewVehicle = (id: string) => {
    navigate(`/customer/vehicles/${id}`);
  };

  return (
    <div className="space-y-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          JamesAutos
        </p>

        <h1 className="mt-2 text-3xl font-black">
          Browse Vehicles
        </h1>

        <p className="mt-2 max-w-2xl text-gray-400">
          Explore vehicles currently available from JamesAutos.
        </p>
      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111720] px-4">

        <Search
          size={19}
          className="shrink-0 text-gray-500"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search by brand, model or year..."
          className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
        />

      </div>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="flex min-h-[350px] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

            <p className="mt-4 text-sm text-gray-500">
              Loading vehicles...
            </p>

          </div>

        </div>
      )}

      {/* =================================================
          EMPTY
      ================================================= */}

      {!loading &&
        filteredVehicles.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#111720] px-6 py-16 text-center">

            <Car
              size={50}
              className="mx-auto text-gray-700"
            />

            <h2 className="mt-5 text-xl font-bold">
              No vehicles found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no vehicles
              matching your search.
            </p>

          </div>
        )}

      {/* =================================================
          VEHICLES
      ================================================= */}

      {!loading &&
        filteredVehicles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {filteredVehicles.map((vehicle) => {
              const isSaved = savedCars.includes(
                vehicle.id
              );

              const isSaving =
                savingCar === vehicle.id;

              return (
                <div
                  key={vehicle.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111720] transition duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:shadow-xl hover:shadow-black/20"
                >

                  {/* =====================================
                      VEHICLE IMAGE
                  ===================================== */}

                  <div className="relative h-56 overflow-hidden bg-[#080d14]">

                    {vehicle.image_url &&
                    vehicle.image_url.trim() !== "" ? (
                      <img
                        src={vehicle.image_url}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                        onLoad={() => {
                          console.log(
                            "Vehicle image loaded:",
                            vehicle.image_url
                          );
                        }}
                        onError={(event) => {
                          console.error(
                            "Vehicle image failed:",
                            vehicle.image_url
                          );

                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">

                        <Car
                          size={60}
                          className="text-gray-700"
                        />

                      </div>
                    )}

                    {/* STATUS */}

                    <div className="absolute right-4 top-4 z-10">

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize backdrop-blur-md ${
                          vehicle.status.toLowerCase() ===
                          "available"
                            ? "bg-green-500/90 text-white"
                            : "bg-red-500/90 text-white"
                        }`}
                      >
                        {vehicle.status}
                      </span>

                    </div>

                    {/* SAVE BUTTON */}

                    <button
                      type="button"
                      onClick={() =>
                        handleSaveCar(vehicle.id)
                      }
                      disabled={isSaving}
                      aria-label={
                        isSaved
                          ? "Remove from saved cars"
                          : "Save car"
                      }
                      className={`absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition ${
                        isSaved
                          ? "border-red-500/40 bg-red-500/20 text-red-500"
                          : "border-white/20 bg-black/40 text-white hover:border-yellow-500/50 hover:bg-yellow-500/20 hover:text-yellow-400"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      {isSaving ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Heart
                          size={19}
                          fill={
                            isSaved
                              ? "currentColor"
                              : "none"
                          }
                        />
                      )}
                    </button>

                  </div>

                  {/* =====================================
                      VEHICLE CONTENT
                  ===================================== */}

                  <div className="p-5">

                    {/* NAME */}

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wider text-yellow-500">
                          {vehicle.brand}
                        </p>

                        <h2 className="mt-1 text-xl font-bold">
                          {vehicle.model}
                        </h2>

                      </div>

                      <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-gray-400">
                        {vehicle.year}
                      </span>

                    </div>

                    {/* PRICE */}

                    <div className="mt-5">

                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Price
                      </p>

                      <p className="mt-1 text-2xl font-black text-yellow-500">
                        ₦
                        {Number(
                          vehicle.price
                        ).toLocaleString()}
                      </p>

                    </div>

                    {/* DETAILS */}

                    <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-4">

                      <VehicleDetail
                        icon={
                          <Gauge size={15} />
                        }
                        label="Mileage"
                        value={
                          vehicle.mileage !== null
                            ? `${vehicle.mileage.toLocaleString()} km`
                            : "N/A"
                        }
                      />

                      <VehicleDetail
                        icon={
                          <Settings size={15} />
                        }
                        label="Gear"
                        value={
                          vehicle.transmission ||
                          "N/A"
                        }
                      />

                      <VehicleDetail
                        icon={
                          <Fuel size={15} />
                        }
                        label="Fuel"
                        value={
                          vehicle.fuel_type ||
                          "N/A"
                        }
                      />

                    </div>

                    {/* DESCRIPTION */}

                    {vehicle.description && (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                        {vehicle.description}
                      </p>
                    )}

                    {/* ACTIONS */}

                    <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">

                      {/* VIEW DETAILS */}

                      <button
                        type="button"
                        onClick={() =>
                          handleViewVehicle(
                            vehicle.id
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-yellow-400"
                      >
                        <Eye size={17} />

                        View Vehicle Details
                      </button>

                      {/* SAVE / UNSAVE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleSaveCar(
                            vehicle.id
                          )
                        }
                        disabled={isSaving}
                        aria-label={
                          isSaved
                            ? "Remove from saved cars"
                            : "Save car"
                        }
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                          isSaved
                            ? "border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            : "border-white/10 bg-white/5 text-gray-400 hover:border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-500"
                        } disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        {isSaving ? (
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <Heart
                            size={20}
                            fill={
                              isSaved
                                ? "currentColor"
                                : "none"
                            }
                          />
                        )}
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

    </div>
  );
};

// =====================================================
// VEHICLE DETAIL COMPONENT
// =====================================================

interface VehicleDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const VehicleDetail = ({
  icon,
  label,
  value,
}: VehicleDetailProps) => {
  return (
    <div className="min-w-0">

      <div className="flex items-center gap-1.5 text-yellow-500">

        {icon}

        <span className="text-[10px] uppercase tracking-wide text-gray-600">
          {label}
        </span>

      </div>

      <p className="mt-1 truncate text-xs font-medium text-gray-300">
        {value}
      </p>

    </div>
  );
};

export default CustomerVehicles;