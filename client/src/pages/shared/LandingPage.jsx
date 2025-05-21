import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { axiosInstance } from "../../config/axiosInstance";

const data = [
  { month: "Jan", active: 120, inactive: 30 },
  { month: "Feb", active: 150, inactive: 20 },
  { month: "Mar", active: 180, inactive: 25 },
  { month: "Apr", active: 200, inactive: 22 },
  { month: "May", active: 210, inactive: 18 },
];


export const LandingPage = () => {
   const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axiosInstance.get(`admin/search?name=${searchTerm}`);
        setSuggestions(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300); // debounce to avoid rapid API calls

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSelect = (id) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
     <header className="p-5 flex justify-between items-center border-b border-gray-700 relative">
      <div className="relative w-full max-w-xs">
        <input
  type="text"
  placeholder="Search name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full px-4 py-2 border border-gray-600 rounded-t bg-gray-800 text-white placeholder-gray-400"
/>
{suggestions.length > 0 && (
  <ul className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 z-10 rounded-b shadow-lg">
    {suggestions.map((person) => (
      <li
        key={person._id}
        onClick={() => handleSelect(person._id)}
        className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
      >
        {person.name}
      </li>
    ))}
  </ul>
)}
      </div>

      <nav className="hidden md:flex space-x-6" data-aos="fade-left">
        {/* Navigation Links */}
      </nav>
    </header>

      

     
      {/* Chart Section */}
      <section className="p-10" data-aos="fade-up">
        <h3 className="text-2xl font-bold text-center mb-6">Monthly User Activity</h3>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#06b6d4" name="Active Users" />
              <Bar dataKey="inactive" fill="#f43f5e" name="Inactive Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <footer className="p-6 text-center text-gray-600 border-t border-gray-700 mt-10">
        &copy; 2025 NeoGym. All rights reserved.
      </footer>
    </div>
  );
};
