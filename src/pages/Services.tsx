import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Car,
  ShieldCheck,
  CalendarCheck,
  Wrench,
  CreditCard,
  Headphones,
  SearchCheck,
  FileCheck,
  CheckCircle,
  Phone,
  Clock,
  Award,
} from "lucide-react";

import lexus3 from "../assets/Image/lexus3.jpg";

const services = [
  {
    icon: <Car size={30} />,
    title: "Premium Vehicle Sales",
    description:
      "Explore our carefully selected collection of premium vehicles from trusted automotive brands.",
    features: [
      "Luxury & premium vehicles",
      "SUVs and sedans",
      "Verified vehicle history",
    ],
  },
  {
    icon: <SearchCheck size={30} />,
    title: "Vehicle Inspection",
    description:
      "Every vehicle goes through a detailed inspection to help ensure quality, reliability and value.",
    features: [
      "Mechanical inspection",
      "Vehicle history checks",
      "Quality verification",
    ],
  },
  {
    icon: <CalendarCheck size={30} />,
    title: "Test Drive Booking",
    description:
      "Book a convenient test drive and experience your preferred vehicle before making your decision.",
    features: [
      "Flexible scheduling",
      "Professional assistance",
      "Comfortable test-drive experience",
    ],
  },
  {
    icon: <CreditCard size={30} />,
    title: "Vehicle Financing",
    description:
      "We help customers explore suitable payment and financing options for their vehicle purchase.",
    features: [
      "Flexible payment options",
      "Purchase guidance",
      "Transparent pricing",
    ],
  },
  {
    icon: <FileCheck size={30} />,
    title: "Documentation Support",
    description:
      "Our team helps make the documentation and vehicle purchase process simple and straightforward.",
    features: [
      "Purchase documentation",
      "Ownership paperwork",
      "Professional guidance",
    ],
  },
  {
    icon: <Wrench size={30} />,
    title: "Vehicle Aftercare",
    description:
      "Continue enjoying your vehicle with professional after-sales support and maintenance guidance.",
    features: [
      "Maintenance guidance",
      "Service recommendations",
      "After-sales support",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    icon: <SearchCheck size={25} />,
    title: "Choose Your Vehicle",
    text: "Browse our collection and select a vehicle that matches your needs and lifestyle.",
  },
  {
    number: "02",
    icon: <CalendarCheck size={25} />,
    title: "Book A Test Drive",
    text: "Schedule a convenient time to inspect and experience your preferred vehicle.",
  },
  {
    number: "03",
    icon: <FileCheck size={25} />,
    title: "Complete Your Purchase",
    text: "Our team guides you through pricing, documentation and the purchase process.",
  },
  {
    number: "04",
    icon: <Car size={25} />,
    title: "Drive Away",
    text: "Complete the process and enjoy your new vehicle with confidence.",
  },
];

const Services = () => {
  return (
    <main className="min-h-screen bg-[#080d14] text-white">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative min-h-[650px] overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={lexus3}
            alt="JamesAutos premium vehicle"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute  bg-gradient-to-r from-[#080d14] via-[#080d14]/90 to-[#080d14]/30" />

          <div className="absolute  bg-gradient-to-t from-[#080d14] via-transparent to-[#080d14]/20" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 pt-20 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >

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
                Services
              </span>
            </div>

            {/* Small Heading */}
            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-12 bg-yellow-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                JamesAutos Services
              </span>

            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

              More Than

              <span className="block text-yellow-500">
                Just A Car Dealer.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              From finding your perfect vehicle to completing your
              purchase and receiving after-sales support, JamesAutos
              provides a professional automotive experience built
              around you.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/cars"
                className="group flex items-center justify-center gap-3 rounded-lg bg-yellow-500 px-7 py-4 font-semibold text-black shadow-lg shadow-yellow-500/20 transition duration-300 hover:scale-[1.02] hover:bg-yellow-400"
              >
                Explore Our Cars

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-3 rounded-lg border border-white/30 bg-white/5 px-7 py-4 font-semibold backdrop-blur-sm transition hover:border-yellow-500 hover:bg-yellow-500/10"
              >
                Talk To Our Team
              </Link>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="border-y border-white/5 bg-[#0c121a] py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
              What We Offer
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Professional Automotive
              <span className="text-yellow-500"> Services.</span>
            </h2>

            <p className="mt-6 leading-7 text-gray-400">
              We are committed to making your vehicle buying experience
              simple, transparent and enjoyable from the first conversation
              to the moment you drive away.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service, index) => (

              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group rounded-2xl border border-white/10 bg-[#111720] p-7 transition duration-300 hover:-translate-y-2 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/5"
              >

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500 transition duration-300 group-hover:bg-yellow-500 group-hover:text-black">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="mt-7 text-xl font-bold">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">

                  {service.features.map((feature) => (

                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle
                        size={17}
                        className="shrink-0 text-yellow-500"
                      />

                      <span className="text-sm text-gray-300">
                        {feature}
                      </span>
                    </div>

                  ))}

                </div>

                {/* Link */}
                <Link
                  to="/contact"
                  className="group/link mt-7 inline-flex items-center gap-2 text-sm font-semibold text-yellow-500 transition hover:text-yellow-400"
                >
                  Learn More

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover/link:translate-x-1"
                  />
                </Link>

              </motion.article>

            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="bg-[#0c121a] py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Why JamesAutos
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                Service You Can
                <span className="text-yellow-500">
                  {" "}Trust.
                </span>
              </h2>

              <p className="mt-6 leading-7 text-gray-400">
                Buying a vehicle is a major decision. That is why our
                team focuses on transparency, quality and customer
                satisfaction at every stage.
              </p>

              <div className="mt-8 space-y-5">

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                    <ShieldCheck size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Trusted & Verified
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      We prioritize quality and vehicle verification.
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                    <Award size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Premium Experience
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Professional service designed around your needs.
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                    <Headphones size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Dedicated Support
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Our team remains available before and after your purchase.
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>

            {/* Right Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-5"
            >

              <div className="rounded-2xl border border-white/10 bg-[#111720] p-8 text-center">
                <Car
                  size={32}
                  className="mx-auto text-yellow-500"
                />

                <h3 className="mt-4 text-3xl font-black">
                  500+
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Cars Sold
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111720] p-8 text-center">
                <Award
                  size={32}
                  className="mx-auto text-yellow-500"
                />

                <h3 className="mt-4 text-3xl font-black">
                  10+
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Years Experience
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111720] p-8 text-center">
                <ShieldCheck
                  size={32}
                  className="mx-auto text-yellow-500"
                />

                <h3 className="mt-4 text-3xl font-black">
                  100%
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Verified Vehicles
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111720] p-8 text-center">
                <Clock
                  size={32}
                  className="mx-auto text-yellow-500"
                />

                <h3 className="mt-4 text-3xl font-black">
                  24/7
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Customer Support
                </p>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
              Simple Process
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Your Journey Starts
              <span className="text-yellow-500">
                {" "}Here.
              </span>
            </h2>

            <p className="mt-5 text-gray-400">
              We have designed our process to make buying your next
              vehicle simple and stress-free.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {processSteps.map((step, index) => (

              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="relative"
              >

                <div className="rounded-2xl border border-white/10 bg-[#111720] p-7">

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                      {step.icon}
                    </div>

                    <span className="text-3xl font-black text-white/10">
                      {step.number}
                    </span>

                  </div>

                  <h3 className="mt-7 text-lg font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {step.text}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

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
            Ready To Get Started?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-black/70">
            Whether you are looking for your dream car, need help
            choosing a vehicle or want to book a test drive,
            our team is ready to help.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/cars"
              className="group flex items-center justify-center gap-3 rounded-lg bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#111720]"
            >
              Browse Cars

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

export default Services;