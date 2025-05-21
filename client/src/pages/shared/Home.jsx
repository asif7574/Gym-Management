import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import gym1 from '../img/gym1.jpg';

export const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">

      {/* Hero Section with Background Image */}
      <section
        className="w-full bg-cover bg-center min-h-[80vh] flex items-center justify-center px-10"
        style={{ backgroundImage: `url(${gym1})` }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-xl max-w-3xl text-center" data-aos="fade-up">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Elevate Your <span className="text-cyan-400">Fitness</span><br /> With Future Tech
          </h2>
          <p className="text-gray-300 mb-6">
            Experience AI-powered fitness tracking, futuristic gym management, and immersive training modules tailored for tomorrow’s athlete.
          </p>
          <button className="btn btn-primary btn-wide">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center" data-aos="fade-up">
        <div className="bg-gray-800 p-6 rounded-2xl hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-cyan-400">Smart Workouts</h3>
          <p className="text-gray-400 mt-2">AI-driven routines that adapt to your progress in real-time.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-cyan-400">Holo Guidance</h3>
          <p className="text-gray-400 mt-2">Train with holographic instructors in immersive environments.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-cyan-400">Seamless Access</h3>
          <p className="text-gray-400 mt-2">Biometric and RFID access for seamless check-ins and logouts.</p>
        </div>
      </section>

    </div>
  );
};
