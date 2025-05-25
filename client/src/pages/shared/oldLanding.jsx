import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { axiosInstance } from "../../config/axiosInstance";

export const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [expiringSoonUsers, setExpiringSoonUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Fetch All Users and Expiring Soon Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allRes = await axiosInstance.get("user/get-users");
        setAllUsers(allRes.data.users || []);
      } catch (error) {
        console.error("Failed to fetch all users", error);
      }

      try {
        const expiringRes = await axiosInstance.get("user/expiry-users");
        setExpiringSoonUsers(expiringRes.data.users || []);
      } catch (error) {
        console.error("Failed to fetch expiring users", error);
      }
    };

    fetchUsers();
  }, []);

  // Search logic
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
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSelect = (id) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/profile/${id}`);
  };

  const renderUserTable = (users, title, showCount = false) => (
    <div className="my-10 px-6">
      <h2 className="text-xl font-bold mb-4">
        {title}
        {showCount && (
          <span className="ml-2 text-red-500">({users.length})</span>
        )}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-600 p-2">Name</th>
              <th className="border border-gray-600 p-2">Expiry in</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <td className="border border-gray-600 p-2">{user.name}</td>
                <td className="border border-gray-600 p-2">
                  {user.endDate ? new Date(user.endDate).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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

      {renderUserTable(expiringSoonUsers, "Expiring Soon", true)}
      {renderUserTable(allUsers, "All Users")}

      {/* <footer className="p-6 text-center text-gray-600 border-t border-gray-700 mt-10">
        &copy; 2025 NeoGym. All rights reserved.
      </footer> */}
    </div>
  );
};
