import React, { useEffect, useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { getAllServices } from "../services/serviceService";
import { getMyPets } from "../services/petService";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedService, setSelectedService] = useState(null);
  const [myPets, setMyPets] = useState([]);
  const [bookingData, setBookingData] = useState({
    petId: "",
    date: "",
    notes: ""
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user.role ? user.role.toLowerCase() : "";
  const token = localStorage.getItem("token");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get("category");

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllServices({
        category: categoryFilter || ""
      });

      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Fetch services error:", err.response?.data || err.message);
      setError("Nu am putut încărca serviciile.");
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  const fetchUserPets = useCallback(async () => {
    if (!token || userRole !== "owner") {
      setMyPets([]);
      return;
    }

    try {
      const res = await getMyPets();
      setMyPets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch pets error:", err.response?.data || err.message);
      setMyPets([]);
    }
  }, [token, userRole]);

  useEffect(() => {
    fetchServices();
    fetchUserPets();
  }, [fetchServices, fetchUserPets]);

  const openBookingModal = (service) => {
    if (!token) {
      alert("Trebuie să fii logat ca owner pentru a face o rezervare.");
      return;
    }

    if (userRole !== "owner") {
      alert("Doar utilizatorii de tip owner pot face rezervări.");
      return;
    }

    setBookingData({
      petId: "",
      date: "",
      notes: ""
    });

    setSelectedService(service);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== "owner") {
      alert("Doar ownerii pot face rezervări.");
      return;
    }

    if (!bookingData.petId) {
      alert("Te rugăm să alegi un animal.");
      return;
    }

    if (!bookingData.date) {
      alert("Te rugăm să alegi data și ora.");
      return;
    }

    try {
      await api.post("/bookings", {
        serviceId: selectedService.id,
        petId: bookingData.petId,
        date: bookingData.date,
        notes: bookingData.notes
      });

      alert("Rezervare trimisă cu succes!");
      setSelectedService(null);
      setBookingData({
        petId: "",
        date: "",
        notes: ""
      });
    } catch (err) {
      alert("Eroare: " + (err.response?.data?.error || "Eroare la rezervare"));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf7f2]">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#5A3B1F] mb-8 text-center">
          {categoryFilter ? `Servicii: ${categoryFilter}` : "Toate Serviciile"}
        </h1>

        {loading && (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#d1733d]"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center my-4">
            {error}
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="bg-white border border-[#e2c6aa] rounded-2xl p-8 text-center text-gray-500">
            Nu există servicii disponibile momentan.
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-[#e2c6aa]"
              >
                <h2 className="text-xl font-bold mb-2 text-[#5A3B1F]">
                  {service.title}
                </h2>

                <p className="text-gray-500 text-sm mb-4">
                  {service.description}
                </p>

                <div className="space-y-1 text-sm text-gray-500 mb-4">
                  <p>
                    <span className="font-semibold">Categorie:</span>{" "}
                    {service.category}
                  </p>
                  <p>
                    <span className="font-semibold">Locație:</span>{" "}
                    {service.location || service.provider?.location || "Nespecificată"}
                  </p>
                  <p>
                    <span className="font-semibold">Provider:</span>{" "}
                    {service.provider?.name || "Provider necunoscut"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#d1733d] font-bold">
                    {service.price} RON
                  </span>

                  {userRole === "owner" ? (
                    <button
                      onClick={() => openBookingModal(service)}
                      className="bg-[#5A3B1F] text-white px-4 py-2 rounded-lg hover:bg-[#452d18] transition-colors"
                    >
                      Rezervă
                    </button>
                  ) : userRole === "provider" ? (
                    <span className="text-xs text-gray-400 italic text-right">
                      Providerii nu pot rezerva
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-[#5A3B1F] text-white px-4 py-2 rounded-lg hover:bg-[#452d18] transition-colors"
                    >
                      Login pentru rezervare
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedService && userRole === "owner" && (
          <div className="fixed inset-0 bg-[#5A3B1F]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-[#e2c6aa]">
              <h2 className="text-2xl font-bold mb-2 text-[#5A3B1F]">
                Rezervă {selectedService.title}
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Alege animalul, data și ora pentru programare.
              </p>

              {myPets.length === 0 ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-4">
                  Nu ai niciun animal adăugat. Mergi la pagina Animalele Mele și
                  adaugă un animal înainte de rezervare.
                </div>
              ) : null}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">
                    Alege Animalul
                  </label>

                  <select
                    className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#d1733d]"
                    required
                    value={bookingData.petId}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        petId: e.target.value
                      })
                    }
                  >
                    <option value="">Selectează un animal...</option>

                    {myPets.map((pet) => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name} ({pet.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">
                    Data și Ora
                  </label>

                  <input
                    type="datetime-local"
                    required
                    className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#d1733d]"
                    value={bookingData.date}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        date: e.target.value
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">
                    Note speciale
                  </label>

                  <textarea
                    className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#d1733d]"
                    placeholder="Ex: Animalul este anxios..."
                    value={bookingData.notes}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        notes: e.target.value
                      })
                    }
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={myPets.length === 0}
                    className={`flex-1 text-white py-2 rounded-lg font-bold ${
                      myPets.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#d1733d] hover:bg-[#b56232]"
                    }`}
                  >
                    Confirmă
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300"
                  >
                    Anulează
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;