import React, { useState, useEffect } from "react";
import { LogOut, UserRoundPen, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "./DarkMode";
import { axiosInstance } from "../../config/axiosInstance";

export const LoginHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  const userLogout = async () => {
    try {
      await axiosInstance({ method: "POST", url: "/admin/logout" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full px-6 md:px-20 py-6 shadow-2xl bg-white dark:bg-gray-900 z-50">
      <div className="flex justify-between items-center flex-wrap">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-bold tracking-widest text-gray-800 dark:text-white">
            <span className="text-cyan-400">Neo</span>Gym
          </h1>
        </Link>

        {/* Hamburger Icon */}
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
            <Link to="/home">Home</Link>
            {/* <Link to="/patient">Patient Search</Link> */}
          </nav>

          <div className="flex items-center gap-4">
            <DarkMode />
            <Link to="/profile" className="hover:text-cyan-400">
              <UserRoundPen />
            </Link>
            <button
              onClick={userLogout}
              className="hover:text-red-500 transition"
              title="Logout"
            >
              <LogOut />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};