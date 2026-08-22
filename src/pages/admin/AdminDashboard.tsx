import { motion } from "framer-motion";
import {
  Car,
  Users,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Eye,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Vehicles",
      value: "48",
      change: "+8.2%",
      icon: Car,
    },
    {
      title: "Customers",
      value: "1,284",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Messages",
      value: "36",
      change: "+18.4%",
      icon: MessageSquare,
    },
    {
      title: "Vehicles Sold",
      value: "24",
      change: "+6.8%",
      icon: TrendingUp,
    },
  ];

  const recentVehicles = [
    {
      name: "Lexus RX 350",
      year: "2025",
      price: "₦95,000,000",
      status: "Available",
    },
    {
      name: "Toyota Land Cruiser",
      year: "2025",
      price: "₦145,000,000",
      status: "Available",
    },
    {
      name: "BMW 5 Series",
      year: "2024",
      price: "₦85,000,000",
      status: "Sold",
    },
    {
      name: "Mercedes-Benz GLE",
      year: "2025",
      price: "₦120,000,000",
      status: "Available",
    },
  ];

  const recentMessages = [
    {
      name: "Michael Ade",
      message: "I'm interested in the Lexus RX 350.",
    },
    {
      name: "David John",
      message: "Is the Land Cruiser still available?",
    },
    {
      name: "Sarah James",
      message: "I would like to schedule a test drive.",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Overview
        </p>

        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome back. Here's what's happening with JamesAutos.
        </p>
      </motion.div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-[#111720] p-6"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Icon size={23} />
                </div>

                <span className="flex items-center gap-1 text-xs font-semibold text-green-400">
                  <ArrowUpRight size={14} />
                  {stat.change}
                </span>

              </div>

              <p className="mt-6 text-sm text-gray-500">
                {stat.title}
              </p>

              <h2 className="mt-1 text-3xl font-black">
                {stat.value}
              </h2>

            </motion.div>
          );
        })}

      </div>

      {/* Content */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">

        {/* Recent Vehicles */}
        <div className="rounded-2xl border border-white/10 bg-[#111720]">

          <div className="flex items-center justify-between border-b border-white/10 p-6">

            <div>

              <h2 className="text-xl font-bold">
                Recent Vehicles
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest vehicles in your inventory
              </p>

            </div>

            <a
              href="/admin/vehicles"
              className="text-sm font-semibold text-yellow-500 hover:text-yellow-400"
            >
              View All
            </a>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px]">

              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-gray-500">

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

                  <th className="px-6 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {recentVehicles.map((vehicle) => (

                  <tr
                    key={vehicle.name}
                    className="border-b border-white/5 last:border-0"
                  >

                    <td className="px-6 py-5 font-semibold">
                      {vehicle.name}
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
                          vehicle.status === "Sold"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {vehicle.status}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <button className="text-gray-500 hover:text-yellow-500">
                        <Eye size={18} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Messages */}
        <div className="rounded-2xl border border-white/10 bg-[#111720] p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Recent Messages
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customer enquiries
              </p>

            </div>

            <MessageSquare
              className="text-yellow-500"
              size={22}
            />

          </div>

          <div className="mt-6 space-y-4">

            {recentMessages.map((item) => (

              <div
                key={item.name}
                className="rounded-xl border border-white/5 bg-[#0b1119] p-4"
              >

                <div className="flex items-center justify-between">

                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <span className="h-2 w-2 rounded-full bg-yellow-500" />

                </div>

                <p className="mt-2 truncate text-sm text-gray-500">
                  {item.message}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;