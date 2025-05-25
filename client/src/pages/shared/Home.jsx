import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import gym1 from '../img/gym1.jpg';

export const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const contactRef = useRef(null);

const scrollToContact = () => {
  contactRef.current?.scrollIntoView({ behavior: "smooth" });
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">

      {/* Hero Section */}
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
          <button onClick={scrollToContact} className="btn btn-primary btn-wide">Book a Free Session</button>
        </div>
      </section>

      {/* Vision / About Section */}
      <section className="p-10 max-w-4xl mx-auto text-center" data-aos="fade-up">
        <h3 className="text-3xl font-bold text-cyan-400 mb-4">Why Choose Us?</h3>
        <p className="text-gray-300">
          At the intersection of innovation and physical transformation, our gym ecosystem combines cutting-edge technology with personalized wellness. Join a movement that believes fitness should be intelligent, inclusive, and inspiring.
        </p>
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

      {/* Contact Section */}
      <section ref={contactRef} className="p-10 bg-gray-800 mt-10" data-aos="fade-up">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-cyan-400 mb-4">Get a Free Session</h3>
          <p className="text-gray-300 mb-8 text-xl font-bold">
            Book a Session with Personal Trainer for Free..!
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400"
              />
            </div>
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
