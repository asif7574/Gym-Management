import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import AOS from "aos";
import "aos/dist/aos.css";
import { useFetch } from "../../hooks/useFetch";

export const Profile = () => {
  const { id } = useParams();
  const [user, isLoading, error] = useFetch(`/user/user-id/${id}`);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
          <p className="text-lg text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
       <p className="text-red-100 text-lg animate-pulse">loading profile...</p>
      </div>
    );
  }
// if (error || !user) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center space-y-4">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-opacity-50"></div>
//       <p className="text-red-300 text-lg animate-pulse">Trying to load profile...</p>
//     </div>
//   );
// }
  const today = dayjs();
  const endDate = dayjs(user.endDate);
  const isExpired = endDate.isBefore(today, "day");
  const daysLeft = endDate.diff(today, "day");
  const borderColor = isExpired ? "border-red-500" : "border-green-500";
  const textColor = isExpired ? "text-red-400" : "text-green-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-5 flex justify-center items-center">
      <div
        data-aos="zoom-in"
        className={`w-full max-w-md rounded-xl border-2 p-6 ${borderColor} shadow-lg`}
      >
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full border-4 ${borderColor} flex items-center justify-center text-2xl font-bold`}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Sex:</strong> {user.sex}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Status:</strong> {user.status ? "Active" : "Inactive"}</p>
          <p><strong>Start Date:</strong> {dayjs(user.startDate).format("DD MMM YYYY")}</p>
          <p><strong>End Date:</strong> {endDate.format("DD MMM YYYY")}</p>
          <p className={`font-semibold ${textColor}`}>
            {isExpired ? "Membership expired" : `${daysLeft} days left`}
          </p>
        </div>

        {/* Contact Options */}
        <div
          className="w-full max-w-md mt-6 p-6 bg-gray-800 rounded-xl shadow-lg"
          
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Contact Options</h2>
          <div className="flex justify-around">
            {/* Call Button */}
            <a
              href={`tel:${user.mobile}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Call
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${user.mobile}?text=${encodeURIComponent(
                `Hi ${user.name}, this is a message from Neogym regarding your membership. Your membership expires in ${daysLeft} days.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
