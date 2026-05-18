import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Mesaj trimis:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: ""
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fdf7f2] flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Informații Contact */}
          <div className="bg-white rounded-2xl shadow-md border border-[#e2c6aa] p-8">
            <h1 className="text-4xl font-bold text-[#5A3B1F] mb-6">
              Contactează-ne
            </h1>

            <p className="text-gray-600 leading-7 mb-8">
              Ai întrebări despre platformă, rezervări sau servicii?
              Trimite-ne un mesaj și îți vom răspunde cât mai rapid.
            </p>

            <div className="space-y-5 text-gray-700">
              <div>
                <p className="font-bold text-[#5A3B1F]">Email</p>
                <p>contact@scooby.ro</p>
              </div>

              <div>
                <p className="font-bold text-[#5A3B1F]">Telefon</p>
                <p>0712 345 678</p>
              </div>

              <div>
                <p className="font-bold text-[#5A3B1F]">Adresă</p>
                <p>Oradea, România</p>
              </div>
            </div>
          </div>

          {/* Formular */}
          <div className="bg-white rounded-2xl shadow-md border border-[#e2c6aa] p-8">
            <h2 className="text-2xl font-bold text-[#5A3B1F] mb-6">
              Trimite un mesaj
            </h2>

            {submitted && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">
                Mesajul a fost trimis cu succes!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nume
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Numele tău"
                  className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#d1733d]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#d1733d]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Mesaj
                </label>

                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Scrie mesajul aici..."
                  className="w-full border border-gray-300 p-3 rounded-xl h-40 outline-none focus:ring-2 focus:ring-[#d1733d]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#5A3B1F] text-white py-3 rounded-xl font-bold hover:bg-[#452d18] transition-colors"
              >
                Trimite Mesajul
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}