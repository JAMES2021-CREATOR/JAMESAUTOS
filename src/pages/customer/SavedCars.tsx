import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Heart,
  Fuel,
  Gauge,
  Settings,
  Trash2,
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
}

interface SavedCar {
  id: string;
  vehicle_id: string;
  vehicle: Vehicle;
}

const SavedCars = () => {
  const [savedCars, setSavedCars] = useState<SavedCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  // =====================================================
  // LOAD SAVED CARS
  // =====================================================

  const loadSavedCars = async () => {
    try {
      setLoading(true);

      // -----------------------------------------------
      // GET CURRENT USER
      // -----------------------------------------------

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "Error getting current user:",
          userError
        );
        setSavedCars([]);
        return;
      }

      if (!user) {
        console.log("No authenticated customer found.");
        setSavedCars([]);
        return;
      }

      console.log("CURRENT CUSTOMER:", user.id);

      // -----------------------------------------------
      // GET SAVED CAR RECORDS
      // -----------------------------------------------

      const {
        data: savedData,
        error: savedError,
      } = await supabase
        .from("saved_cars")
        .select("id, vehicle_id")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (savedError) {
        console.error(
          "Error loading saved car records:",
          savedError
        );
        throw savedError;
      }

      console.log(
        "SAVED CAR RECORDS:",
        savedData
      );

      if (!savedData || savedData.length === 0) {
        setSavedCars([]);
        return;
      }

      // -----------------------------------------------
      // GET VEHICLE IDs
      // -----------------------------------------------

      const vehicleIds = savedData.map(
        (saved) => saved.vehicle_id
      );

      console.log(
        "SAVED VEHICLE IDS:",
        vehicleIds
      );

      // -----------------------------------------------
      // GET VEHICLES
      // -----------------------------------------------

      const {
        data: vehicleData,
        error: vehicleError,
      } = await supabase
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
        .in("id", vehicleIds);

      if (vehicleError) {
        console.error(
          "Error loading saved vehicles:",
          vehicleError
        );
        throw vehicleError;
      }

      console.log(
        "SAVED VEHICLES:",
        vehicleData
      );

      // -----------------------------------------------
      // COMBINE SAVED RECORD + VEHICLE
      // -----------------------------------------------

      const combinedCars: SavedCar[] =
        savedData
          .map((saved) => {
            const vehicle = vehicleData?.find(
              (item) =>
                item.id === saved.vehicle_id
            );

            if (!vehicle) {
              return null;
            }

            return {
              id: saved.id,
              vehicle_id: saved.vehicle_id,
              vehicle,
            };
          })
          .filter(
            (item): item is SavedCar =>
              item !== null
          );

      console.log(
        "FINAL SAVED CARS:",
        combinedCars
      );

      setSavedCars(combinedCars);
    } catch (error) {
      console.error(
        "Error loading saved cars:",
        error
      );

      setSavedCars([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadSavedCars();
  }, []);

  // =====================================================
  // REMOVE SAVED CAR
  // =====================================================

  const handleRemove = async (
    savedCarId: string
  ) => {
    try {
      setRemoving(savedCarId);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { error } = await supabase
        .from("saved_cars")
        .delete()
        .eq("id", savedCarId)
        .eq("user_id", user.id);

      if (error) {
        console.error(
          "Error removing saved car:",
          error
        );
        throw error;
      }

      // Immediately remove from UI
      setSavedCars((current) =>
        current.filter(
          (car) => car.id !== savedCarId
        )
      );
    } catch (error) {
      console.error(
        "Remove saved car error:",
        error
      );
    } finally {
      setRemoving(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

          <p className="mt-4 text-sm text-gray-500">
            Loading saved cars...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="space-y-8 text-white">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Customer Portal
        </p>

        <div className="mt-2 flex items-center gap-3">

          <Heart
            size={28}
            className="text-yellow-500"
            fill="currentColor"
          />

          <h1 className="text-3xl font-black">
            Saved Cars
          </h1>

        </div>

        <p className="mt-2 text-gray-400">
          Cars you have saved for later.
        </p>

      </div>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {savedCars.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#111720] px-6 py-16 text-center">

          <Heart
            size={55}
            className="mx-auto text-gray-700"
          />

          <h2 className="mt-5 text-xl font-bold">
            No Saved Cars
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            You haven't saved any vehicles yet.
            Browse the available vehicles and save
            the ones you like.
          </p>

          <Link
            to="/customer/vehicles"
            className="mt-6 inline-flex rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
          >
            Browse Vehicles
          </Link>

        </div>
      )}

      {/* =================================================
          SAVED VEHICLES
      ================================================= */}

      {savedCars.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {savedCars.map((savedCar) => {
            const vehicle = savedCar.vehicle;

            return (
              <div
                key={savedCar.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111720] transition duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:shadow-xl hover:shadow-black/20"
              >

                {/* =======================================
                    IMAGE
                ======================================= */}

                <div className="relative h-56 overflow-hidden bg-[#080d14]">

                  {vehicle.image_url &&
                  vehicle.image_url.trim() !== "" ? (
                    <img
                      src={vehicle.image_url}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(event) => {
                        console.error(
                          "Saved vehicle image failed:",
                          vehicle.image_url
                        );

                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">

                      <Car
                        size={60}
                        className="text-gray-700"
                      />

                    </div>
                  )}

                  {/* SAVED BADGE */}

                  <div className="absolute left-4 top-4">

                    <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-red-400 backdrop-blur-md">

                      <Heart
                        size={13}
                        fill="currentColor"
                      />

                      Saved

                    </span>

                  </div>

                  {/* STATUS */}

                  <div className="absolute right-4 top-4">

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

                </div>

                {/* =======================================
                    CONTENT
                ======================================= */}

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
                          ? `${Number(
                              vehicle.mileage
                            ).toLocaleString()} km`
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

                  <div className="mt-5 flex gap-3">

                    {/* VIEW DETAILS */}

                    <Link
                      to={`/customer/vehicles/${vehicle.id}`}
                      className="flex-1 rounded-xl bg-yellow-500 px-4 py-3 text-center text-sm font-bold text-black transition hover:bg-yellow-400"
                    >
                      View Details
                    </Link>

                    {/* REMOVE */}

                    <button
                      type="button"
                      disabled={
                        removing ===
                        savedCar.id
                      }
                      onClick={() =>
                        handleRemove(
                          savedCar.id
                        )
                      }
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Remove saved car"
                    >

                      {removing ===
                      savedCar.id ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
                      ) : (
                        <Trash2 size={18} />
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

export default SavedCars;