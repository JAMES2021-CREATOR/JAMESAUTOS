import { Car, Heart, Search } from "lucide-react";

const CustomerCars = () => {
  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <div>
        <p className="text-sm text-gray-500">
          Customer Portal
        </p>

        <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
          Browse Cars
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Explore vehicles available at JamesAutos.
        </p>
      </div>


      {/* SEARCH */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0c121a] p-5 md:flex-row">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search vehicles..."
            className="w-full rounded-xl border border-white/10 bg-[#080d14] py-3 pl-12 pr-4 text-sm text-white outline-none transition focus:border-yellow-500"
          />

        </div>

        <select
          className="rounded-xl border border-white/10 bg-[#080d14] px-4 py-3 text-sm text-gray-400 outline-none focus:border-yellow-500"
        >
          <option value="">All Vehicles</option>
          <option value="suv">SUV</option>
          <option value="sedan">Sedan</option>
          <option value="coupe">Coupe</option>
          <option value="truck">Truck</option>
        </select>

      </div>


      {/* VEHICLES */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {/* VEHICLE 1 */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c121a]">

          <div className="relative h-56 bg-[#111820]">

            <div className="flex h-full items-center justify-center text-gray-600">
              <Car size={55} />
            </div>

            <button
              type="button"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-gray-400 transition hover:text-red-400"
            >
              <Heart size={19} />
            </button>

          </div>

          <div className="p-5">

            <p className="text-xs uppercase tracking-wider text-yellow-500">
              SUV
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Toyota Land Cruiser
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              2025 • Automatic • Petrol
            </p>

            <div className="mt-5 flex items-center justify-between">

              <p className="text-lg font-bold">
                ₦120,000,000
              </p>

              <button
                type="button"
                className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-400"
              >
                View Details
              </button>

            </div>

          </div>

        </div>


        {/* VEHICLE 2 */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c121a]">

          <div className="relative h-56 bg-[#111820]">

            <div className="flex h-full items-center justify-center text-gray-600">
              <Car size={55} />
            </div>

            <button
              type="button"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-gray-400 transition hover:text-red-400"
            >
              <Heart size={19} />
            </button>

          </div>

          <div className="p-5">

            <p className="text-xs uppercase tracking-wider text-yellow-500">
              Sedan
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Mercedes-Benz C-Class
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              2024 • Automatic • Petrol
            </p>

            <div className="mt-5 flex items-center justify-between">

              <p className="text-lg font-bold">
                ₦85,000,000
              </p>

              <button
                type="button"
                className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-400"
              >
                View Details
              </button>

            </div>

          </div>

        </div>


        {/* VEHICLE 3 */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c121a]">

          <div className="relative h-56 bg-[#111820]">

            <div className="flex h-full items-center justify-center text-gray-600">
              <Car size={55} />
            </div>

            <button
              type="button"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-gray-400 transition hover:text-red-400"
            >
              <Heart size={19} />
            </button>

          </div>

          <div className="p-5">

            <p className="text-xs uppercase tracking-wider text-yellow-500">
              SUV
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Toyota Venza
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              2025 • Automatic • Hybrid
            </p>

            <div className="mt-5 flex items-center justify-between">

              <p className="text-lg font-bold">
                ₦75,000,000
              </p>

              <button
                type="button"
                className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-400"
              >
                View Details
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CustomerCars;