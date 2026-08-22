import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Car,
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Target,
  Eye,
  Headphones,
  Star,
  Phone,
} from "lucide-react";


import toyota3 from "../assets/Image/toyota3.jpg";
import bmw3 from "../assets/Image/bmw3.jpg";

const values = [
  {
    icon: <ShieldCheck size={30} />,
    title: "Trusted Quality",
    text: "Every vehicle in our collection is carefully selected and inspected to meet our quality standards.",
  },
  {
    icon: <Award size={30} />,
    title: "Premium Service",
    text: "We provide a professional and seamless experience from your first enquiry to the moment you drive away.",
  },
  {
    icon: <Users size={30} />,
    title: "Customer First",
    text: "Our customers are at the heart of everything we do, and we are committed to helping you find the right vehicle.",
  },
  {
    icon: <Headphones size={30} />,
    title: "Reliable Support",
    text: "Our team is available to answer your questions and guide you throughout your vehicle buying journey.",
  },
];

const reasons = [
  "Carefully selected premium vehicles",
  "Transparent and competitive pricing",
  "Professional and friendly customer service",
  "Easy vehicle enquiries and test drive booking",
  "Trusted and verified vehicle information",
  "A smooth and convenient buying experience",
];

const About = () => {
  return (
    <main className="min-h-screen bg-[#080d14] text-white">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative flex min-h-[650px] items-center overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">

          <img
            src={toyota3}
            alt="JamesAutos premium vehicle"
            className="h-full w-full object-cover"
          />

          <div className="absolute  bg-[#080d14]/75" />

          <div className="absolute  bg-gradient-to-r from-[#080d14] via-[#080d14]/85 to-[#080d14]/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080d14] via-transparent to-black/30" />

        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">

            <Link
              to="/"
              className="transition hover:text-yellow-500"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-yellow-500">
              About Us
            </span>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-12 bg-yellow-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                About JamesAutos
              </span>

            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl  text-yellow-500">
              More Than Just
              <span className="block text-yellow-500">
                A Car Dealer.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300">
              JamesAutos is committed to helping you discover
              premium vehicles while delivering a simple,
              transparent and enjoyable car buying experience.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/cars"
                className="group flex items-center justify-center gap-3 rounded-lg bg-yellow-500 px-7 py-4 font-semibold text-black transition duration-300 hover:bg-yellow-400"
              >
                Explore Our Cars

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-3 rounded-lg border border-white/30 bg-white/5 px-7 py-4 font-semibold transition hover:border-yellow-500 hover:bg-yellow-500/10"
              >
                Contact Us
              </Link>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          ABOUT INTRODUCTION
      ====================================================== */}
      <section className="py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              Driving You Closer To Your
              <span className="text-yellow-500">
                {" "}Perfect Car.
              </span>
            </h2>

            <p className="mt-7 leading-8 text-gray-400">
              At JamesAutos, we understand that buying a car is
              an important decision. That is why we focus on
              providing quality vehicles, reliable information
              and excellent customer service.
            </p>

            <p className="mt-5 leading-8 text-gray-400">
              Whether you are looking for a luxury sedan, a
              powerful SUV or your next family vehicle, our goal
              is to help you find a car that fits your lifestyle,
              needs and budget.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">

              <div className="rounded-xl border border-white/10 bg-[#111720] p-5">

                <Car size={28} className="text-yellow-500" />

                <h3 className="mt-4 text-2xl font-black">
                  500+
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Vehicles Sold
                </p>

              </div>

              <div className="rounded-xl border border-white/10 bg-[#111720] p-5">

                <Star size={28} className="text-yellow-500" />

                <h3 className="mt-4 text-2xl font-black">
                  98%
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Happy Customers
                </p>

              </div>

            </div>

          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            <div className="overflow-hidden rounded-2xl border border-white/10">

              <img
                src={bmw3}
                alt="JamesAutos vehicle"
                className="h-[500px] w-full object-cover"
              />

            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -left-4 rounded-xl border border-yellow-500/30 bg-[#111720] p-6 shadow-2xl sm:left-8">

              <h3 className="text-3xl font-black text-yellow-500">
                10+
              </h3>

              <p className="mt-1 text-sm text-gray-300">
                Years Of Experience
              </p>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          MISSION & VISION
      ====================================================== */}
      <section className="bg-[#0c121a] py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-7 lg:grid-cols-2">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-[#111720] p-8 sm:p-10"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">

                <Target size={32} />

              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Making Car Buying Simple.
              </h2>

              <p className="mt-5 leading-8 text-gray-400">
                Our mission is to connect customers with quality
                vehicles while providing transparency, trust and
                excellent service throughout every stage of the
                buying process.
              </p>

            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-8 sm:p-10"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">

                <Eye size={32} />

              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Our Vision
              </p>

              <h2 className="mt-4 text-3xl font-black">
                A Better Way To Buy Cars.
              </h2>

              <p className="mt-5 leading-8 text-gray-400">
                We aim to become a trusted destination for
                premium vehicles, known for quality, integrity
                and a customer experience that makes every
                journey memorable.
              </p>

            </motion.div>

          </div>

        </div>

      </section>

      {/* =====================================================
          OUR VALUES
      ====================================================== */}
      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
              What We Stand For
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Our Core Values
            </h2>

            <p className="mt-5 text-gray-400">
              The principles that guide the way we serve every
              JamesAutos customer.
            </p>

          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((value, index) => (

              <motion.div
                key={value.title}
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

                  {value.icon}

                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {value.text}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="border-y border-white/5 bg-[#0c121a] py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
              Why JamesAutos
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              Built Around
              <span className="text-yellow-500">
                {" "}Your Journey.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              We do more than sell vehicles. We help make your
              car buying journey easier by providing quality
              options and professional support when you need it.
            </p>

            <div className="mt-8 space-y-4">

              {reasons.map((reason) => (

                <div
                  key={reason}
                  className="flex items-center gap-3"
                >

                  <CheckCircle
                    size={21}
                    className="shrink-0 text-yellow-500"
                  />

                  <span className="text-gray-200">
                    {reason}
                  </span>

                </div>

              ))}

            </div>

            <Link
              to="/cars"
              className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-yellow-500 px-7 py-4 font-semibold text-black transition hover:bg-yellow-400"
            >
              Browse Our Collection

              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-5"
          >

            <div className="rounded-2xl border border-white/10 bg-[#111720] p-7 text-center">

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

            <div className="rounded-2xl border border-white/10 bg-[#111720] p-7 text-center">

              <Users
                size={34}
                className="mx-auto text-yellow-500"
              />

              <h3 className="mt-4 text-3xl font-black">
                1K+
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Customers Served
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111720] p-7 text-center">

              <Star
                size={34}
                className="mx-auto text-yellow-500"
              />

              <h3 className="mt-4 text-3xl font-black">
                98%
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Customer Satisfaction
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111720] p-7 text-center">

              <ShieldCheck
                size={34}
                className="mx-auto text-yellow-500"
              />

              <h3 className="mt-4 text-3xl font-black">
                100%
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Quality Focused
              </p>

            </div>

          </motion.div>

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
            size={42}
            className="mx-auto text-black"
          />

          <h2 className="mt-5 text-3xl font-black text-black sm:text-5xl">
            Ready To Find Your Dream Car?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-black/70">
            Explore our premium collection today or speak with
            our team and let us help you find the right vehicle.
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

    </main>
  );
};

export default About;