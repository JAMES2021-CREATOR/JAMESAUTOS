import {
  Plus,
  Search,
  Edit,
  Trash2,
  Car,
} from "lucide-react";

const AdminVehicles = () => {
  const vehicles = [
    {
      id: 1,
      name: "Mercedes-Benz C-Class",
      year: "2024",
      price: "₦85,000,000",
      status: "Available",
    },
    {
      id: 2,
      name: "Toyota Land Cruiser",
      year: "2025",
      price: "₦120,000,000",
      status: "Available",
    },
    {
      id: 3,
      name: "BMW 5 Series",
      year: "2024",
      price: "₦95,000,000",
      status: "Sold",
    },
    {
      id: 4,
      name: "Toyota Venza",
      year: "2023",
      price: "₦58,000,000",
      status: "Available",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
            Inventory
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Vehicles
          </h1>

          <p className="mt-2 text-gray-400">
            Manage all vehicles listed on JamesAutos.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400"
        >
          <Plus size={19} />
          Add Vehicle
        </button>

      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111720] px-4">

        <Search
          size={19}
          className="text-gray-500"
        />

        <input
          type="text"
          placeholder="Search vehicles..."
          className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
        />

      </div>

      {/* Vehicle Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111720]">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead className="border-b border-white/10 bg-white/[0.02]">

              <tr className="text-xs uppercase tracking-wider text-gray-500">

                <th className="px-6 py-4">
                  Vehicle
                </th>

                <th className="px-6 py-4">
                  Year
                </th>

                <th className="px-6 py-4">
                  Price
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-white/5">

              {vehicles.map((vehicle) => (

                <tr
                  key={vehicle.id}
                  className="transition hover:bg-white/[0.02]"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
                        <Car size={20} />
                      </div>

                      <span className="font-semibold">
                        {vehicle.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-gray-400">
                    {vehicle.year}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {vehicle.price}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        vehicle.status === "Available"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {vehicle.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-yellow-500/10 hover:text-yellow-500"
                        title="Edit vehicle"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                        title="Delete vehicle"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminVehicles;