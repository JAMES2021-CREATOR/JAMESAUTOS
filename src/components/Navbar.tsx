import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaCar } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <FaCar className="text-yellow-500" />
          <span>
            JAMES<span className="text-yellow-500">AUTOS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition duration-300 ${
                  isActive
                    ? "font-semibold text-yellow-500"
                    : "text-gray-300 hover:text-yellow-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="rounded-lg bg-yellow-500 px-5 py-2.5 font-semibold text-black transition duration-300 hover:bg-yellow-400"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-800 bg-black md:hidden">
          <div className="flex flex-col px-6 py-5">

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-gray-800 py-4 transition ${
                    isActive
                      ? "text-yellow-500"
                      : "text-gray-300 hover:text-yellow-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={closeMenu}
              className="mt-5 rounded-lg bg-yellow-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-yellow-400"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;