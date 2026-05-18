import React from "react";
import img from "../assets/AboutUs.png"; 

const AboutUs = () => {
  return (
    <section className="bg-[#fdf7f2] py-20 px-6 md:px-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-[#5A3B1F] mb-6">
            Despre Scooby
          </h2>

          <p className="text-[#6b4a2e] text-lg leading-relaxed mb-4">
            La <span className="font-semibold">Scooby</span>, credem că animalele
            nu sunt doar animale — sunt parte din familie. De aceea am creat un
            loc în care stăpânii pot găsi servicii de îngrijire profesionale,
            sigure și pline de afecțiune, oferite de oameni care iubesc animalele
            la fel de mult ca tine.
          </p>

          <p className="text-[#7d5b40] text-base">
            Indiferent dacă ai nevoie de o sesiune de grooming, plimbări zilnice,
            dresaj sau pet sitting, echipa noastră este pregătită să ofere
            atenție, răbdare și grijă fiecărui companion blănos. Misiunea noastră
            este să facem fiecare animal să se simtă fericit, în siguranță și
            iubit — exact așa cum merită.
          </p>
        </div>
        
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={img}
            alt="About Pet Milo"
            className="w-full rounded-2xl border border-[#e8d7c8] bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;