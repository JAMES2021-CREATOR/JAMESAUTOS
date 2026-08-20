import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import pic5 from "../assets/Image/pic5.jpg";
import pic7 from "../assets/Image/pic7.jpg";
import toyota2 from "../assets/Image/toyota2.jpg";
import bmw1 from "../assets/Image/bmw1.jpg";
import {
  ArrowRight,
  Car,
  ShieldCheck,
  Headphones,
  Gauge,
  CalendarCheck,
  Star,
  Phone,
  CheckCircle,
} from "lucide-react";

const cars = [
  { 
    name: "Mercedes-Benz C-Class",
    year: "2024",
    price: "₦85,000,000",
    image: pic7 ,
  },
  {
    name: "Toyota Land Cruiser",
    year: "2025",
    price: "₦120,000,000",
    image: toyota2,
  },
  {
    name: "BMW 5 Series",
    year: "2023",
    price: "₦78,000,000",
    image: bmw1,
  },
];

const services = [
  {
    icon: <Car size={28} />,
    title: "Premium Cars",
    text: "Explore a carefully selected collection of quality vehicles.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Trusted Dealer",
    text: "Every vehicle is carefully inspected and verified.",
  },
  {
    icon: <CalendarCheck size={28} />,
    title: "Test Drive",
    text: "Book a test drive and experience your preferred vehicle.",
  },
  {
    icon: <Headphones size={28} />,
    title: "24/7 Support",
    text: "Our team is always available to assist you.",
  },
];

const Home = () => {
  return (
    <main className="bg-[#080d14] text-white">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative flex min-h-screen items-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={pic5}
            alt="JamesAutos premium vehicle"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080d14] via-[#080d14]/85 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080d14] via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >

            {/* Small Heading */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-yellow-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Premium Auto Dealer
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              Drive Your
              <span className="block text-yellow-500">
                Dream Car.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Discover premium vehicles, exceptional service and
              a dealership experience built around you.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/cars"
                className="group flex items-center justify-center gap-3 rounded-lg bg-yellow-500 px-7 py-4 font-semibold text-black shadow-lg shadow-yellow-500/20 transition duration-300 hover:scale-[1.02] hover:bg-yellow-400"
              >
                Browse Cars

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-3 rounded-lg border border-white/30 bg-white/5 px-7 py-4 font-semibold backdrop-blur-sm transition duration-300 hover:border-yellow-500 hover:bg-yellow-500/10"
              >
                Contact Us
              </Link>

            </div>

            {/* Hero Stats */}
            <div className="mt-14 grid max-w-2xl grid-cols-3 border-t border-white/10 pt-7">

              <div>
                <h3 className="text-2xl font-bold text-yellow-500 sm:text-3xl">
                  10+
                </h3>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                  Years Experience
                </p>
              </div>

              <div className="border-x border-white/10 px-5">
                <h3 className="text-2xl font-bold text-yellow-500 sm:text-3xl">
                  500+
                </h3>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                  Cars Sold
                </p>
              </div>

              <div className="pl-5">
                <h3 className="text-2xl font-bold text-yellow-500 sm:text-3xl">
                  98%
                </h3>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                  Happy Customers
                </p>
              </div>

            </div>

          </motion.div>
        </div>
      </section>


      {/* =====================================================
          INTRO SECTION
      ====================================================== */}
      <section className="border-y border-white/5 bg-[#0c121a] py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
              Welcome To JamesAutos
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Your Journey To The
              <span className="text-yellow-500"> Perfect Car</span>
              {" "}Starts Here.
            </h2>

            <p className="mt-6 leading-7 text-gray-400">
              At JamesAutos, we make buying your next vehicle simple,
              transparent and enjoyable. Browse our collection,
              compare vehicles and connect with our team.
            </p>

          </motion.div>

        </div>
      </section>


      {/* =====================================================
          FEATURED CARS
      ====================================================== */}
      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Our Collection
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                Featured Cars
              </h2>

              <p className="mt-4 max-w-xl text-gray-400">
                Discover some of the premium vehicles currently
                available at JamesAutos.
              </p>
            </div>

            <Link
              to="/cars"
              className="group flex items-center gap-2 font-semibold text-yellow-500 transition hover:text-yellow-400"
            >
              View All Cars

              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>


          {/* Cars */}
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {cars.map((car, index) => (

              <motion.article
                key={car.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111720] transition duration-300 hover:-translate-y-2 hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/5"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden">

                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                    {car.year}
                  </span>

                </div>

                {/* Content */}
                <div className="p-6">

                  <div className="flex items-center gap-2 text-yellow-500">
                    <Car size={18} />

                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Premium Vehicle
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold">
                    {car.name}
                  </h3>

                  <div className="mt-5 flex items-end justify-between">

                    <div>
                      <p className="text-xs text-gray-500">
                        Starting from
                      </p>

                      <p className="mt-1 text-xl font-bold text-yellow-500">
                        {car.price}
                      </p>
                    </div>

                    <Link
                      to="/cars"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black transition hover:bg-yellow-400"
                    >
                      <ArrowRight size={18} />
                    </Link>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section className="bg-[#0c121a] py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Premium Service.
              <span className="text-yellow-500"> Every Time.</span>
            </h2>

          </div>


          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {services.map((service, index) => (

              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="rounded-2xl border border-white/10 bg-[#111720] p-7 transition duration-300 hover:-translate-y-2 hover:border-yellow-500/40"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {service.text}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          EXPERIENCE SECTION
      ====================================================== */}
      <section className="relative overflow-hidden py-24">

        <div className="absolute inset-0">

          <img
            src="/images/jamesautos-bg.jpg"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/80" />

        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                The JamesAutos Difference
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                More Than Just
                <span className="text-yellow-500">
                  {" "}A Car Dealer.
                </span>
              </h2>

              <p className="mt-6 leading-7 text-gray-300">
                We believe purchasing a vehicle should be an
                exciting experience. Our team is committed to
                providing quality cars and excellent customer service.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Verified and quality vehicles",
                  "Transparent pricing",
                  "Professional customer support",
                  "Easy test drive booking",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle
                      size={21}
                      className="shrink-0 text-yellow-500"
                    />

                    <span className="text-gray-200">
                      {item}
                    </span>
                  </div>

                ))}

              </div>

              <Link
                to="/about"
                className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-yellow-500 px-7 py-4 font-semibold text-black transition hover:bg-yellow-400"
              >
                Learn More

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </motion.div>


            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-5"
            >

              <div className="rounded-2xl border border-white/10 bg-black/50 p-7 text-center backdrop-blur-md">

                <Gauge
                  size={34}
                  className="mx-auto text-yellow-500"
                />

                <h3 className="mt-4 text-3xl font-black">
                  10+
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Years Experience
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/50 p-7 text-center backdrop-blur-md">

                <Car
                  size={34}
                  className="mx-auto text-yellow-500"
                />

                <h3 className="mt-4 text-3xl font-black">
                  500+
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Cars Sold
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/50 p-7 text-center backdrop-blur-md">

                <Star
                  size={34}
                  className="mx-auto text-yellow-500"
                />

                <h3 className="mt-4 text-3xl font-black">
                  98%
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Happy Customers
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/50 p-7 text-center backdrop-blur-md">

                <ShieldCheck
                  size={34}
                  className="mx-auto text-yellow-500"
                />

                <h3 className="mt-4 text-3xl font-black">
                  100%
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Verified Cars
                </p>

              </div>

            </motion.div>

          </div>

        </div>
      </section>


      {/* =====================================================
          TESTIMONIAL
      ====================================================== */}
      <section className="py-24">

        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            Customer Experience
          </p>

          <div className="mt-6 flex justify-center gap-1 text-yellow-500">

            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                fill="currentColor"
              />
            ))}

          </div>

          <blockquote className="mt-7 text-2xl font-semibold leading-10 sm:text-3xl">
            "JamesAutos made buying my car incredibly easy.
            The team was professional, transparent and helpful
            throughout the entire process."
          </blockquote>

          <p className="mt-6 text-gray-400">
            — JamesAutos Customer
          </p>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-yellow-500 py-20">

        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-black/10" />

        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-black/10" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <Phone
            size={40}
            className="mx-auto text-black"
          />

          <h2 className="mt-5 text-3xl font-black text-black sm:text-5xl">
            Ready To Find Your Dream Car?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-black/70">
            Browse our collection or speak with our team today.
            Your next vehicle could be closer than you think.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/cars"
              className="group flex items-center justify-center gap-3 rounded-lg bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#111720]"
            >
              Explore Cars

              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/contact"
              className="flex items-center justify-center gap-3 rounded-lg border-2 border-black px-8 py-4 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}
      

    </main>
  );
};

export default Home;