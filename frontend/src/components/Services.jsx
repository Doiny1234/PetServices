import React from 'react';
import { GiDogHouse, GiSittingDog } from "react-icons/gi";
import { FaPaw } from "react-icons/fa";

const petServices = [
  {
    icon: <GiDogHouse size={40} />,
    title: "Cazare pentru animale",
    desc: "Un loc sigur și confortabil pentru animalele tale atunci când ești plecat.",
  },
  {
    icon: <GiSittingDog size={40} />,
    title: "Dresaj pentru animale",
    desc: "Dresaj profesional pentru ca animalul tău să fie bine educat.",
  },
  {
    icon: <FaPaw size={40} />,
    title: "Servicii de îngrijire (grooming)",
    desc: "Băi, tuns și sesiuni de răsfăț pentru prietenul tău blănos.",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-6 md:px-14 bg-[#f5eee6]">
      <h2 className="text-3xl font-bold text-center text-[#6b4226] mb-4">
        Serviciile Noastre pentru Animale
      </h2>

      <p className="text-center text-[#8d674a] mb-12 max-w-xl mx-auto">
        Avem grijă de animalele tale ca de propria familie.
        Descoperă gama noastră de servicii de îngrijire în care poți avea încredere,
        create pentru fericirea lor și liniștea ta.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {petServices.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-[#e0d3c0]"
          >
            <div className="text-[#A0522D] mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-[#6B4226] mb-2">
              {service.title}
            </h3>
            <p className="text-[#5c4433]">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
