import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Este Scooby disponibil în toate orașele?",
    answer:
      "Momentan suntem disponibili în Oradea și zonele apropiate. Ne extindem constant pentru a ajunge la cât mai mulți iubitori de animale.",
  },
  {
    question: "Personalul vostru este calificat?",
    answer:
      "Da! Toți membrii echipei sunt verificați, instruiți și au experiență în lucrul cu animalele.",
  },
  {
    question: "Ce fac dacă animalul meu nu se simte confortabil?",
    answer:
      "Nicio grijă! Adaptăm serviciile în funcție de personalitatea și nevoile fiecărui animal. Siguranța și confortul lor sunt pe primul loc.",
  },
  {
    question: "Pot anula o programare?",
    answer:
      "Desigur. Poți modifica sau anula o programare oricând, direct din contul tău sau contactând echipa noastră.",
  },
  {
    question: "Cum pot rezerva o sesiune de grooming?",
    answer:
      "Accesezi secțiunea Grooming, alegi data și ora, iar echipa noastră te va contacta pentru confirmare.",
  },
];

const FAQsAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0); 

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-[#f8f1ea] py-20 px-6 md:px-14">
      <h2 className="text-4xl font-bold text-center text-[#5A3B1F] mb-4">
        Întrebări Frecvente
      </h2>
      <p className="text-center text-[#7c5a3b] max-w-2xl mx-auto mb-12 text-[17px]">
        Ai întrebări? Avem răspunsuri! Descoperă cele mai frecvente întrebări și soluții pentru a-ți face viața cu animalele de companie cât mai ușoară.
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-[#e2d2c3] shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-[#5A3B1F] font-semibold text-lg hover:bg-[#f0e4d8] transition"
            >
              {faq.question}
              <span>
                {openIndex === index ? (
                  <FaChevronUp size={18} />
                ) : (
                  <FaChevronDown size={18} />
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-[#6d4a30] text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQsAccordion;