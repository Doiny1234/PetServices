import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdf7f2] flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-md border border-[#e2c6aa] p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#5A3B1F] mb-6">
            Despre Noi
          </h1>

          <p className="text-gray-600 leading-7 mb-4">
            Scooby este o platformă dedicată iubitorilor de animale, unde proprietarii
            pot găsi servicii potrivite pentru animalele lor, iar providerii pot publica
            servicii precum grooming, walking, training sau pet sitting.
          </p>

          <p className="text-gray-600 leading-7">
            Scopul nostru este să conectăm ownerii cu persoane de încredere care oferă
            servicii pentru animale, într-un mod simplu, rapid și organizat.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}