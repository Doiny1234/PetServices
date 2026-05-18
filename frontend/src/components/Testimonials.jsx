import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ana Popescu",
    feedback:
      "Scooby este minunat! Câinele meu adoră serviciile lor de grooming, iar după fiecare vizită arată impecabil. Recomand cu drag!",
  },
 {
  name: "Mihai Radu",
  feedback:
    "Am fost impresionat de cât de repede a învățat cățelul meu comenzile de bază. Instructorii sunt profesioniști și foarte prietenoși.",
 },
 {
  name: "Ioana Mureșan",
  feedback:
    "Am apelat la serviciul lor de pet sitting și a fost excelent. Au avut grijă de pisica mea ca și cum ar fi fost a lor. M-am simțit liniștită tot timpul.",
 },
  {
    name: "Andrei Ionescu",
    feedback:
      "Instructorii lor sunt foarte buni. Cățelul meu a învățat comenzile de bază într-o săptămână. Servicii excelente!",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#fdf5ec] py-20 px-6 md:px-14">
      <h2 className="text-4xl font-bold text-center text-[#5A3B1F] mb-4">
        Ce spun stăpânii de animale
      </h2>
      <p className="text-center text-[#7c5a3b] max-w-2xl mx-auto mb-16 text-[17px]">
        Povești reale de la clienți fericiți care au descoperit diferența Scooby.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-[#ead9c7] relative"
          >
            <FaQuoteLeft className="text-[#d1b194] text-3xl absolute top-6 left-6 opacity-30" />
            <p className="text-[#5e3e28] text-lg mb-6 leading-relaxed z-10 relative">
              “{testimonial.feedback}”
            </p>
            <p className="text-[#8d674a] font-semibold text-right">
              — {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
