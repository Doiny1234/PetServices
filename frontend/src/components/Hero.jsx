import React from 'react';
import { Link } from "react-router-dom";
import img from "../assets/dog.png";

const Hero = () => {
  return (
    <section className="bg-[#fff9f6] py-16 px-6 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      
      {/* LEFT CONTENT */}
      <div className="flex-1">
        
        <p className="text-sm text-[#d1733d] font-medium mb-3 border-l-4 border-[#d1733d] pl-3">
          Trusted Pet Care, Tailored With Love
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1e1e1e] mb-6">
          Your <span className="text-[#ff7d4e]">Pet</span> Deserves <br />
          The Best Care.
        </h1>

        <p className="text-gray-600 text-lg leading-8 max-w-xl mb-8">
          Descoperă servicii de încredere pentru animale — grooming, plimbare, dresaj și pet sitting — toate într‑o platformă modernă creată pentru iubitorii de animale.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4">
          
          <Link
            to="/services"
            className="bg-[#ff7d4e] text-white px-5 md:px-7 py-3 rounded-lg font-semibold shadow hover:bg-[#e46637] transition-all duration-300"
          >
            Fă o rezervare
          </Link>

          <Link
            to="/about"
            className="bg-[#1e1e1e] text-white px-5 md:px-7 py-3 rounded-lg font-semibold shadow hover:bg-[#333] transition-all duration-300"
          >
            Află mai multe
          </Link>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full md:w-2/5 flex justify-center">
        <img
          src={img}
          alt="Dog"
          className="rounded-full object-cover shadow-2xl"
        />
      </div>
    </section>
  );
};

export default Hero;