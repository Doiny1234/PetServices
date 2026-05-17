import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Is Scooby available in all cities?",
    answer:
      "Currently, we are available in major metro cities across India. We're expanding rapidly — stay tuned!",
  },
  {
    question: "Are your pets certified?",
    answer:
      "Yes! All our pets are government-registered and verified by our internal quality team.",
  },
  {
    question: "What if my pet doesn’t like the food?",
    answer:
      "No worries! We have a 3-day replacement guarantee for unused items. Your pet’s happiness is our priority.",
  },
  {
    question: "Can I cancel a subscription anytime?",
    answer:
      "Absolutely. You can manage, pause, or cancel your subscription anytime through your dashboard.",
  },
  {
    question: "How do I book a grooming session?",
    answer:
      "Just head to the Grooming section and choose a slot. Our experts will visit your home at your chosen time.",
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
        Frequently Asked Questions
      </h2>
      <p className="text-center text-[#7c5a3b] max-w-2xl mx-auto mb-12 text-[17px]">
        Got pawsitive doubts? Let's clear them out!
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