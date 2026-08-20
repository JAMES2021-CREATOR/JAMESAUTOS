import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-[#080d14] text-white">

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {/* =========================
            FOOTER MAIN
        ========================== */}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* =========================
              BRAND
          ========================== */}

          <div>

            <Link
              to="/"
              className="text-2xl font-black tracking-wider"
            >
              JAMES
              <span className="text-yellow-500">
                AUTOS
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Your trusted destination for premium vehicles,
              quality service and an exceptional car-buying
              experience.
            </p>

            {/* SOCIAL ICONS */}

            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <FaTwitter size={17} />
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <FaWhatsapp size={18} />
              </a>

            </div>

          </div>


          {/* =========================
              QUICK LINKS
          ========================== */}

          <div>

            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                to="/"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Home
              </Link>

              <Link
                to="/cars"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Cars
              </Link>

              <Link
                to="/about"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                About
              </Link>

              <Link
                to="/services"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Services
              </Link>

              <Link
                to="/contact"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Contact
              </Link>

            </div>

          </div>


          {/* =========================
              SERVICES
          ========================== */}

          <div>

            <h3 className="text-lg font-bold">
              Our Services
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                to="/services"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Car Sales
              </Link>

              <Link
                to="/services"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Vehicle Inspection
              </Link>

              <Link
                to="/services"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Test Drive
              </Link>

              <Link
                to="/services"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Car Financing
              </Link>

              <Link
                to="/services"
                className="block text-sm text-gray-400 transition hover:text-yellow-500"
              >
                Customer Support
              </Link>

            </div>

          </div>


          {/* =========================
              CONTACT
          ========================== */}

          <div>

            <h3 className="text-lg font-bold">
              Contact Us
            </h3>

            <div className="mt-5 space-y-5">

              {/* PHONE */}

              <a
                href="tel:+2348012345678"
                className="flex items-start gap-3 text-gray-400 transition hover:text-yellow-500"
              >

                <Phone
                  size={20}
                  className="mt-1 shrink-0 text-yellow-500"
                />

                <span>
                  +234 805 138 8846
                </span>

              </a>


              {/* EMAIL */}

              <a
                href="mailto:support@jamesautos.com"
                className="flex items-start gap-3 text-gray-400 transition hover:text-yellow-500"
              >

                <Mail
                  size={20}
                  className="mt-1 shrink-0 text-yellow-500"
                />

                <span>
                  support@jamesautos.com
                </span>

              </a>


              {/* LOCATION */}

              <div className="flex items-start gap-3 text-gray-400">

                <MapPin
                  size={20}
                  className="mt-1 shrink-0 text-yellow-500"
                />

                <span>
                  Nigeria
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            NEWSLETTER
        ========================== */}

        <div className="mt-14 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 sm:p-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h3 className="text-xl font-bold">
                Stay Updated
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Get updates about new cars and special offers.
              </p>

            </div>


            <form className="flex w-full max-w-lg flex-col gap-3 sm:flex-row">

              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-lg border border-gray-700 bg-[#111720] px-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-yellow-500"
              />

              <button
                type="submit"
                className="h-12 rounded-lg bg-yellow-500 px-6 font-semibold text-black transition hover:bg-yellow-400"
              >
                Subscribe
              </button>

            </form>

          </div>

        </div>


        {/* =========================
            BOTTOM FOOTER
        ========================== */}

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-800 pt-7 text-sm md:flex-row md:items-center md:justify-between">

          <p className="text-gray-500">

            © 2026{" "}

            <span className="text-white">
              James
            </span>

            <span className="text-yellow-500">
              Autos
            </span>

            . All rights reserved.

          </p>


          <div className="flex gap-5">

            <Link
              to="/privacy"
              className="text-gray-500 transition hover:text-yellow-500"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-500 transition hover:text-yellow-500"
            >
              Terms
            </Link>

          </div>


          <p className="text-gray-500">

            Premium cars.

            <span className="text-yellow-500">
              {" "}Premium service.
            </span>

          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;