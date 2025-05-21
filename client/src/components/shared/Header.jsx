import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "./DarkMode";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full px-6 md:px-20 py-6 shadow-2xl bg-white dark:bg-gray-900 z-50">
      <div className="flex justify-between items-center flex-wrap">
        {/* Logo */}
        <Link to={"/"}>
          <h1
            className="text-3xl font-bold tracking-widest text-gray-800 dark:text-white"
            data-aos="fade-right"
          >
            <span className="text-cyan-400">Neo</span>Gym
          </h1>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation + Actions */}
        <div
          className={`w-full md:w-auto flex-col md:flex-row md:flex items-center gap-6 mt-4 md:mt-0 ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <nav className="flex flex-col md:flex-row items-center gap-4 font-semibold text-gray-700 dark:text-gray-200">
            <Link to="/about">Profile</Link>
            <Link to="/plans">Admin Login</Link>
          </nav>

          <div className="flex items-center gap-4">
            <DarkMode />
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
