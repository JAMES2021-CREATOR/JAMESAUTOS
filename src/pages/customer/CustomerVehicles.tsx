import { useEffect, useState } from "react";
import {
  Car,
  Fuel,
  Gauge,
  Settings,
  Search,
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

const CustomerVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setVehicles(data || []);
    } catch (error) {
      console.error(
        "Error loading customer vehicles:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchText =
      `${vehicle.brand} ${vehicle.model} ${vehicle.year}`.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

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

      {/* ================= SEARCH ================= */}

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111720] px-4">

        <Search
          size={19}
          className="text-gray-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search vehicles..."
          className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
        />

      </div>

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="flex min-h-[300px] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

            <p className="mt-4 text-sm text-gray-500">
              Loading vehicles...
            </p>

          </div>

        </div>
      )}

      {/* ================= EMPTY ================= */}

      {!loading &&
        filteredVehicles.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#111720] px-6 py-16 text-center">

            <Car
              size={45}
              className="mx-auto text-gray-700"
            />

            <h2 className="mt-4 text-xl font-bold">
              No vehicles found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no vehicles matching your search.
            </p>

          </div>
        )}

      {/* ================= VEHICLE GRID ================= */}

      {!loading &&
        filteredVehicles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {filteredVehicles.map(
              (vehicle) => (

                <div
                  key={vehicle.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111720] transition duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:shadow-xl hover:shadow-black/20"
                >

                  {/* IMAGE */}

                  <div className="relative h-56 overflow-hidden bg-[#080d14]">

                    {vehicle.image_url ? (
                      <img
                        src={vehicle.image_url}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">

                        <Car
                          size={55}
                          className="text-gray-700"
                        />

                      </div>
                    )}

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

                  {/* CONTENT */}

                  <div className="p-5">

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
                        icon={<Gauge size={15} />}
                        label="Mileage"
                        value={
                          vehicle.mileage !== null
                            ? `${vehicle.mileage.toLocaleString()} km`
                            : "N/A"
                        }
                      />

                      <VehicleDetail
                        icon={<Settings size={15} />}
                        label="Gear"
                        value={
                          vehicle.transmission ||
                          "N/A"
                        }
                      />

                      <VehicleDetail
                        icon={<Fuel size={15} />}
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

                  </div>

                </div>
              )
            )}

          </div>
        )}

    </div>
  );
};


// =====================================================
// VEHICLE DETAIL
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