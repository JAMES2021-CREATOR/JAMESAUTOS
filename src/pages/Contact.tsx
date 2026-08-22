import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Car,
  MessageCircle,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import lexus2 from "../assets/Image/lexus2.jpg";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#080d14] text-white">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative min-h-[620px] overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">

          <img
            src={lexus2}
            alt="JamesAutos premium vehicle"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute bg-gradient-to-r from-[#080d14] via-[#080d14]/90 to-transparent" />

          <div className="absolute  bg-gradient-to-t from-[#080d14] via-transparent to-[#080d14]/20" />

        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 pt-20 lg:px-8">

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
                Contact
              </span>

            </div>

            {/* Small Heading */}
            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-12 bg-yellow-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Get In Touch
              </span>

            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

              Let's Find Your

              <span className="block text-yellow-500">
                Dream Car.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              Have a question about a vehicle, want to schedule a
              test drive, or need assistance? Our JamesAutos team
              is ready to help.
            </p>

            {/* Hero Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <a
                href="tel:08051388846"
                className="flex items-center justify-center gap-3 rounded-lg bg-yellow-500 px-7 py-4 font-semibold text-black shadow-lg shadow-yellow-500/20 transition hover:scale-[1.02] hover:bg-yellow-400"
              >
                <Phone size={19} />

                Call Us
              </a>

              <a
                href="https://wa.me/2348051388846"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-lg border border-white/30 bg-white/5 px-7 py-4 font-semibold backdrop-blur-sm transition hover:border-yellow-500 hover:bg-yellow-500/10"
              >
                <MessageCircle size={19} />

                WhatsApp
              </a>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ====================================================== */}
      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            {/* =================================================
                CONTACT INFORMATION
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                Contact JamesAutos
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                We're Here To
                <span className="text-yellow-500">
                  {" "}Help.
                </span>
              </h2>

              <p className="mt-5 leading-7 text-gray-400">
                Whether you are ready to purchase a vehicle or simply
                need more information, our team is available to assist
                you.
              </p>

              {/* Contact Cards */}
              <div className="mt-9 space-y-4">

                {/* Phone */}
                <a
                  href="tel:08051388846"
                  className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111720] p-5 transition hover:border-yellow-500/40"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500 transition group-hover:bg-yellow-500 group-hover:text-black">
                    <Phone size={22} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Phone
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      08051388846
                    </p>
                  </div>

                </a>

                {/* Email */}
                <a
                  href="mailto:support@jamesautos.com"
                  className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111720] p-5 transition hover:border-yellow-500/40"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500 transition group-hover:bg-yellow-500 group-hover:text-black">
                    <Mail size={22} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      support@jamesautos.com
                    </p>
                  </div>

                </a>

                {/* Location */}
                <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111720] p-5">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Location
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      Nigeria
                    </p>
                  </div>

                </div>

                {/* Hours */}
                <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111720] p-5">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                    <Clock size={22} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Business Hours
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      Monday - Saturday
                    </p>

                    <p className="text-sm text-gray-400">
                      8:00 AM - 6:00 PM
                    </p>
                  </div>

                </div>

              </div>

              {/* Support Box */}
              <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">

                <div className="flex gap-4">

                  <Headphones
                    size={28}
                    className="shrink-0 text-yellow-500"
                  />

                  <div>

                    <h3 className="font-bold">
                      Need Immediate Assistance?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      Call our team directly and we'll be happy to
                      assist you with your vehicle enquiry.
                    </p>

                    <a
                      href="tel:08051388846"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-yellow-500 hover:text-yellow-400"
                    >
                      Call 08051388846

                      <ArrowRight size={16} />
                    </a>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* =================================================
                CONTACT FORM
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl border border-white/10 bg-[#111720] p-6 shadow-2xl sm:p-8 lg:p-10"
            >

              <div className="mb-8">

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
                  Send A Message
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Tell Us What You Need
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Complete the form below and our team will get back
                  to you as soon as possible.
                </p>

              </div>

              {submitted ? (

                /* SUCCESS MESSAGE */
                <div className="flex min-h-[450px] flex-col items-center justify-center text-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                    <CheckCircle size={45} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    Message Sent Successfully
                  </h3>

                  <p className="mt-3 max-w-md text-gray-400">
                    Thank you for contacting JamesAutos. Our team
                    will review your message and get back to you.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                  >
                    Send Another Message
                  </button>

                </div>

              ) : (

                <form
                   action="https://formspree.io/f/xbgrbaqk"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-200"
                      >
                        Full Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        required
                        className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-200"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
                      />

                    </div>

                  </div>

                  {/* Phone + Vehicle */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-gray-200"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="08051388846"
                        className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="vehicle"
                        className="mb-2 block text-sm font-medium text-gray-200"
                      >
                        Vehicle Of Interest
                      </label>

                      <select
                        id="vehicle"
                        name="vehicle"
                        defaultValue=""
                        className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 text-sm text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
                      >

                        <option value="" disabled>
                          Select a vehicle
                        </option>

                        <option value="Mercedes-Benz C-Class">
                          Mercedes-Benz C-Class
                        </option>

                        <option value="Toyota Land Cruiser">
                          Toyota Land Cruiser
                        </option>

                        <option value="BMW 5 Series">
                          BMW 5 Series
                        </option>

                        <option value="Toyota Venza">
                          Toyota Venza
                        </option>

                        <option value="Mercedes-Benz GLE">
                          Mercedes-Benz GLE
                        </option>

                        <option value="BMW X5">
                          BMW X5
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                    </div>

                  </div>

                  {/* Subject */}
                  <div>

                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-200"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help you?"
                      required
                      className="h-13 w-full rounded-lg border border-white/10 bg-[#080d14] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
                    />

                  </div>

                  {/* Message */}
                  <div>

                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-200"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us how we can help..."
                      required
                      className="w-full resize-none rounded-lg border border-white/10 bg-[#080d14] px-4 py-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
                    />

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-yellow-500 font-bold text-black shadow-lg shadow-yellow-500/10 transition duration-300 hover:scale-[1.01] hover:bg-yellow-400"
                  >

                    <Send size={19} />

                    Send Message

                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </button>

                  <p className="text-center text-xs text-gray-500">
                    Your information will be handled securely.
                  </p>

                </form>

              )}

            </motion.div>

          </div>

        </div>
      </section>

      {/* =====================================================
          TRUST SECTION
      ====================================================== */}
      <section className="border-y border-white/5 bg-[#0c121a] py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-[#111720] p-7 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                <ShieldCheck size={28} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Trusted Service
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Professional assistance throughout your vehicle
                buying journey.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111720] p-7 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                <Car size={28} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Quality Vehicles
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Carefully selected vehicles designed to meet
                different customer needs.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111720] p-7 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                <Headphones size={28} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Dedicated Support
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Our team is available to answer questions and
                guide you through the process.
              </p>

            </div>

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

          <Car
            size={42}
            className="mx-auto text-black"
          />

          <h2 className="mt-5 text-3xl font-black text-black sm:text-5xl">
            Ready To Find Your Next Car?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-black/70">
            Explore our premium collection and discover a vehicle
            that fits your lifestyle.
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

            <a
              href="tel:08051388846"
              className="flex items-center justify-center gap-3 rounded-lg border-2 border-black px-8 py-4 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              <Phone size={19} />

              Call Us
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Contact;