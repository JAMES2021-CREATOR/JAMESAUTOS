import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Car,
  Fuel,
  Gauge,
  Calendar,
  ArrowRight,
  X,
  ChevronDown,
} from "lucide-react";

import pic7 from "../assets/Image/pic7.jpg";
import toyota2 from "../assets/Image/toyota2.jpg";
import bmw1 from "../assets/Image/bmw1.jpg";
import venza1 from "../assets/Image/venza1.jpg";
import toyota4 from "../assets/Image/toyota4.jpg";

interface CarItem {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  priceLabel: string;
  image: string;
  category: string;
  fuel: string;
  transmission: string;
  mileage: string;
}

const cars: CarItem[] = [
  {
    id: 1,
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    year: 2024,
    price: 85000000,
    priceLabel: "₦85,000,000",
    image: pic7,
    category: "Luxury",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "12,500 km",
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    brand: "Toyota",
    year: 2025,
    price: 120000000,
    priceLabel: "₦120,000,000",
    image: toyota2,
    category: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "5,200 km",
  },
  {
    id: 3,
    name: "BMW 5 Series",
    brand: "BMW",
    year: 2023,
    price: 78000000,
    priceLabel: "₦78,000,000",
    image: bmw1,
    category: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "18,400 km",
  },
  {
    id: 4,
    name: "Toyota Venza",
    brand: "Toyota",
    year: 2025,
    price: 65000000,
    priceLabel: "₦65,000,000",
    image: venza1,
    category: "SUV",
    fuel: "Hybrid",
    transmission: "Automatic",
    mileage: "4,800 km",
  },
  {
    id: 5,
    name: "Mercedes-Benz GLE",
    brand: "Mercedes-Benz",
    year: 2024,
    price: 110000000,
    priceLabel: "₦110,000,000",
    image: pic7,
    category: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "8,700 km",
  },
  {
    id: 6,
    name: "BMW X5",
    brand: "BMW",
    year: 2024,
    price: 98000000,
    priceLabel: "₦98,000,000",
    image: bmw1,
    category: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "10,200 km",
  },
];

const categories = [
  "All",
  "SUV",
  "Sedan",
  "Luxury",
  "Sports",
];

const Cars = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All Brands");
  const [sort, setSort] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.brand.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || car.category === category;

      const matchesBrand =
        brand === "All Brands" || car.brand === brand;

      return matchesSearch && matchesCategory && matchesBrand;
    });

    if (sort === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "Newest") {
      result = [...result].sort((a, b) => b.year - a.year);
    }

    return result;
  }, [search, category, brand, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All Brands");
    setSort("Featured");
  };

  return (
    <main className="min-h-screen bg-[#080d14] text-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      {/* =====================================================
    HERO
====================================================== */}
<section className="relative min-h-[680px] overflow-hidden border-b border-white/10">

  {/* ================= BACKGROUND IMAGE ================= */}
  <div className="absolute inset-0">

    <img
      src={toyota4}
      alt="JamesAutos premium vehicle"
      className="h-full w-full object-cover"
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/55" />

    {/* Left dark gradient for readable text */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#080d14] via-[#080d14]/85 to-[#080d14]/20" />

    {/* Bottom gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#080d14] via-transparent to-black/20" />

  </div>

  {/* ================= HERO CONTENT ================= */}
  <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-28 lg:px-8">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl"
    >

      {/* Small Heading */}
      <div className="mb-6 flex items-center gap-3">

        <span className="h-px w-12 bg-yellow-500" />

        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
          JamesAutos Collection
        </span>

      </div>

      {/* Main Heading */}
      <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">

        Find Your

        <span className="block text-yellow-500">
          Dream Car.
        </span>

      </h1>

      {/* Description */}
      <p className="mt-7 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg">
        Explore our collection of premium vehicles,
        carefully selected to deliver performance,
        comfort and style.
      </p>

      {/* ================= SEARCH ================= */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.2,
        }}
        className="mt-9"
      >

        <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-black/50 p-3 shadow-2xl backdrop-blur-md lg:flex-row">

          {/* Search Input */}
          <div className="relative flex-1">

            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by car name or brand..."
              className="h-14 w-full rounded-xl border border-white/10 bg-[#111720]/90 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
            />

          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 text-sm font-bold text-black transition duration-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20"
          >

            <SlidersHorizontal size={19} />

            Filters

            <ChevronDown
              size={17}
              className={`transition-transform duration-300 ${
                showFilters ? "rotate-180" : ""
              }`}
            />

          </button>

        </div>

      </motion.div>

      {/* ================= HERO STATS ================= */}
      <div className="mt-10 flex flex-wrap items-center gap-0 border-t border-white/20 pt-7">

        {/* Stat 1 */}
        <div className="pr-8">

          <p className="text-2xl font-black text-yellow-500 sm:text-3xl">
            500+
          </p>

          <p className="mt-1 text-xs text-gray-300 sm:text-sm">
            Cars Sold
          </p>

        </div>

        {/* Stat 2 */}
        <div className="border-x border-white/20 px-8">

          <p className="text-2xl font-black text-yellow-500 sm:text-3xl">
            10+
          </p>

          <p className="mt-1 text-xs text-gray-300 sm:text-sm">
            Years Experience
          </p>

        </div>

        {/* Stat 3 */}
        <div className="pl-8">

          <p className="text-2xl font-black text-yellow-500 sm:text-3xl">
            100%
          </p>

          <p className="mt-1 text-xs text-gray-300 sm:text-sm">
            Verified Cars
          </p>

        </div>

      </div>

    </motion.div>

  </div>

</section>

      {/* =====================================================
          FILTER PANEL
      ====================================================== */}
      {showFilters && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-b border-white/10 bg-[#0c121a]"
        >

          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

            <div className="grid gap-5 md:grid-cols-3">

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111720] px-4 text-sm text-white outline-none focus:border-yellow-500"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Brand
                </label>

                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111720] px-4 text-sm text-white outline-none focus:border-yellow-500"
                >
                  <option>All Brands</option>
                  <option>Toyota</option>
                  <option>BMW</option>
                  <option>Mercedes-Benz</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Sort By
                </label>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111720] px-4 text-sm text-white outline-none focus:border-yellow-500"
                >
                  <option>Featured</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 flex items-center gap-2 text-sm font-medium text-yellow-500 transition hover:text-yellow-400"
            >
              <X size={17} />
              Clear all filters
            </button>

          </div>

        </motion.section>
      )}

      {/* =====================================================
          CATEGORIES
      ====================================================== */}
      <section className="border-b border-white/5 bg-[#080d14]">

        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">

          <div className="flex gap-3 overflow-x-auto pb-1">

            {categories.map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? "bg-yellow-500 text-black"
                    : "border border-white/10 bg-[#111720] text-gray-400 hover:border-yellow-500 hover:text-yellow-500"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          CAR COLLECTION
      ====================================================== */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Heading */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Available Vehicles
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Our Premium Collection
              </h2>

              <p className="mt-3 text-gray-400">
                {filteredCars.length} vehicles available
              </p>

            </div>

          </div>

          {/* Cars */}
          {filteredCars.length > 0 ? (

            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {filteredCars.map((car, index) => (

                <motion.article
                  key={car.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111720] transition duration-300 hover:-translate-y-2 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/5"
                >

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">

                    <img
                      src={car.image}
                      alt={car.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Year */}
                    <span className="absolute left-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                      {car.year}
                    </span>

                    {/* Category */}
                    <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {car.category}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <div className="flex items-center gap-2 text-yellow-500">

                      <Car size={17} />

                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {car.brand}
                      </span>

                    </div>

                    <h3 className="mt-3 text-xl font-bold">
                      {car.name}
                    </h3>

                    {/* Vehicle Info */}
                    <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-4">

                      <div className="flex flex-col items-center gap-1">

                        <Calendar
                          size={16}
                          className="text-yellow-500"
                        />

                        <span className="text-[11px] text-gray-500">
                          Year
                        </span>

                        <span className="text-xs font-medium">
                          {car.year}
                        </span>

                      </div>

                      <div className="flex flex-col items-center gap-1 border-x border-white/10">

                        <Fuel
                          size={16}
                          className="text-yellow-500"
                        />

                        <span className="text-[11px] text-gray-500">
                          Fuel
                        </span>

                        <span className="text-xs font-medium">
                          {car.fuel}
                        </span>

                      </div>

                      <div className="flex flex-col items-center gap-1">

                        <Gauge
                          size={16}
                          className="text-yellow-500"
                        />

                        <span className="text-[11px] text-gray-500">
                          Mileage
                        </span>

                        <span className="text-xs font-medium">
                          {car.mileage}
                        </span>

                      </div>

                    </div>

                    {/* Price */}
                    <div className="mt-5 flex items-end justify-between gap-4">

                      <div>

                        <p className="text-xs text-gray-500">
                          Starting from
                        </p>

                        <p className="mt-1 text-xl font-bold text-yellow-500">
                          {car.priceLabel}
                        </p>

                      </div>

                      <Link
                        to={`/cars/${car.id}`}
                        className="group/button flex h-11 items-center gap-2 rounded-lg bg-yellow-500 px-4 text-sm font-bold text-black transition hover:bg-yellow-400"
                      >
                        View Details

                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover/button:translate-x-1"
                        />
                      </Link>

                    </div>

                  </div>

                </motion.article>

              ))}

            </div>

          ) : (

            /* No Results */
            <div className="mt-12 rounded-2xl border border-white/10 bg-[#111720] px-6 py-20 text-center">

              <Car
                size={50}
                className="mx-auto text-yellow-500"
              />

              <h3 className="mt-5 text-2xl font-bold">
                No Cars Found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-gray-400">
                We couldn't find a vehicle matching your
                current search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-yellow-500 py-20">

        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-black/10" />

        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-black/10" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <Car
            size={42}
            className="mx-auto text-black"
          />

          <h2 className="mt-5 text-3xl font-black text-black sm:text-5xl">
            Can't Find What You're Looking For?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-black/70">
            Tell us the vehicle you're looking for and our
            team will help you find the perfect match.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/contact"
              className="flex items-center justify-center gap-3 rounded-lg bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#111720]"
            >
              Contact JamesAutos

              <ArrowRight size={20} />
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-3 rounded-lg border-2 border-black px-8 py-4 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Back Home
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Cars;