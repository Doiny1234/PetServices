import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
      <div className="min-h-screen bg-[#fdf7f2] flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-md border border-[#e2c6aa] overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">

            <div className="p-8 md:w-1/2 flex flex-col justify-center">
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

            <div className="md:w-1/2">
              <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop"
                  alt="Câine fericit"
                  className="w-full h-full object-cover min-h-[300px]"
              />
            </div>

          </div>
        </main>

        <Footer />
      </div>
  );
}