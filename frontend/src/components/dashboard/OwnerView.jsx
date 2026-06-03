import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export const OwnerView = ({ user, bookings, onDataUpdate }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reviews", {
        bookingId: selectedBooking.id,
        rating: Number(rating),
        comment
      });
      setSelectedBooking(null);
      setRating(5);
      setComment("");
      onDataUpdate();
      alert("Review adăugat cu succes!");
    } catch (err) {
      alert("Eroare la adăugarea review-ului. " + (err.response?.data?.error || ""));
    }
  };

  return (
      <div className="space-y-8">

        {/* Secțiunea pentru gestionarea animalelor */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2c6aa] flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#5A3B1F]">Animalele Mele</h2>
            <p className="text-gray-500 text-sm mt-1">
              Gestionează profilurile animalelor tale pentru a putea face rezervări.
            </p>
          </div>
          <Link
              to="/pets"
              className="bg-[#d1733d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#b56232] transition-colors text-center whitespace-nowrap"
          >
            Adaugă / Vezi Animale
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5A3B1F]">Rezervările mele</h2>

          {bookings.length === 0 ? (
              <p className="text-gray-500">Nu ai nicio rezervare momentan.</p>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border border-[#e2c6aa]">
                      <p className="font-bold text-lg">{booking.service?.title}</p>
                      <p className="text-sm text-gray-500">
                        Data: {new Date(booking.date).toLocaleString()}
                      </p>
                      <p className="text-sm mt-2">
                        Status: <span className="font-bold uppercase text-[#d1733d]">{booking.status}</span>
                      </p>

                      {booking.status === "confirmed" && (
                          <button
                              onClick={() => setSelectedBooking(booking)}
                              className="mt-4 bg-[#5A3B1F] text-white px-4 py-2 rounded-lg hover:bg-[#452d18] transition-colors"
                          >
                            Lasă Review
                          </button>
                      )}
                    </div>
                ))}
              </div>
          )}
        </div>

        {/* Fereastra Modală pentru Review */}
        {selectedBooking && (
            <div className="fixed inset-0 bg-[#5A3B1F]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white p-8 rounded-2xl max-w-md w-full border-2 border-[#e2c6aa] shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-[#5A3B1F]">
                  Review pentru {selectedBooking.service?.title}
                </h3>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-700">Nota</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#d1733d]"
                    >
                      <option value={5}>5 Stele - Excelent</option>
                      <option value={4}>4 Stele - Foarte Bun</option>
                      <option value={3}>3 Stele - Mediu</option>
                      <option value={2}>2 Stele - Slab</option>
                      <option value={1}>1 Stea - Foarte Slab</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-700">Comentariu</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border p-2 rounded-lg h-24 outline-none focus:ring-2 focus:ring-[#d1733d]"
                        required
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-[#d1733d] text-white py-2 rounded-lg font-bold hover:bg-[#b56232] transition-colors"
                    >
                      Trimite
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedBooking(null)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                    >
                      Anulează
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};