import React, { useState } from "react";
import api from "../../services/api";

export const ProviderView = ({
  bookings = [],
  services = [],
  onUpdateStatus,
  onRefresh
}) => {
  const safeBookings = Array.isArray(bookings) ? bookings : [];
  const safeServices = Array.isArray(services) ? services : [];

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "grooming",
    location: ""
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "grooming",
      location: ""
    });
    setEditingServiceId(null);
    setShowForm(false);
  };

  const handleEditClick = (service) => {
    setEditingServiceId(service.id);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      price: service.price || "",
      category: service.category || "grooming",
      location: service.location || ""
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitService = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        location: formData.location
      };

      if (editingServiceId) {
        await api.put(`/services/${editingServiceId}`, payload);
        alert("Serviciu actualizat cu succes!");
      } else {
        await api.post("/services", payload);
        alert("Serviciu adăugat cu succes!");
      }

      resetForm();

      if (onRefresh) {
        await onRefresh();
      }
    } catch (err) {
      console.error("Service save error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Eroare la salvarea serviciului.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Ești sigur că vrei să ștergi acest serviciu?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/services/${serviceId}`);

      alert("Serviciu șters cu succes!");

      if (onRefresh) {
        await onRefresh();
      }
    } catch (err) {
      console.error("Delete service error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Nu s-a putut șterge serviciul.");
    }
  };

  const handleStatusClick = async (bookingId, status) => {
    if (!onUpdateStatus) return;
    await onUpdateStatus(bookingId, status);
  };

  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#5A3B1F]">
              Serviciile Mele
            </h2>
            <p className="text-sm text-gray-500">
              Aici poți adăuga, edita și șterge serviciile pe care le oferi.
            </p>
          </div>

          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
            className="bg-[#d1733d] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#b56232] transition-colors shadow-sm"
          >
            {showForm ? "Închide" : "+ Adaugă Serviciu"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmitService}
            className="bg-white p-6 rounded-xl border border-[#e2c6aa] mb-8 space-y-4 shadow-md"
          >
            <h3 className="text-lg font-bold text-[#5A3B1F]">
              {editingServiceId ? "Editează serviciul" : "Adaugă serviciu nou"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Titlu"
                required
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#d1733d]"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Preț"
                required
                min="1"
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#d1733d]"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />

              <select
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#d1733d]"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="grooming">Grooming</option>
                <option value="walking">Pet Walking</option>
                <option value="training">Training</option>
                <option value="boarding">Boarding</option>
                <option value="sitting">Pet Sitting</option>
              </select>

              <input
                type="text"
                placeholder="Locație"
                required
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#d1733d]"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <textarea
              placeholder="Descriere"
              required
              className="w-full p-2 border rounded-lg h-24 outline-none focus:ring-2 focus:ring-[#d1733d]"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#5A3B1F] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#452d18]"
              >
                {isSubmitting
                  ? "Se salvează..."
                  : editingServiceId
                  ? "Actualizează"
                  : "Salvează"}
              </button>

              {editingServiceId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-300"
                >
                  Anulează
                </button>
              )}
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safeServices.length === 0 ? (
            <div className="md:col-span-3 bg-white p-6 rounded-xl border border-[#e2c6aa] text-center text-gray-400 italic">
              Nu ai creat încă niciun serviciu.
            </div>
          ) : (
            safeServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-5 rounded-xl border border-[#e2c6aa] shadow-sm"
              >
                <h3 className="font-bold text-lg text-[#5A3B1F]">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {service.description}
                </p>

                <div className="mt-4 text-sm text-gray-500 space-y-1">
                  <p>
                    <strong>Preț:</strong> {service.price} RON
                  </p>
                  <p>
                    <strong>Categorie:</strong> {service.category}
                  </p>
                  <p>
                    <strong>Locație:</strong> {service.location}
                  </p>
                </div>

                <div className="flex gap-2 mt-5 pt-4 border-t border-orange-50">
                  <button
                    onClick={() => handleEditClick(service)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700"
                  >
                    Editează
                  </button>

                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-600"
                  >
                    Șterge
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-[#e2c6aa]">
        <h3 className="text-xl font-bold mb-6 text-[#5A3B1F]">
          Cereri de Programare Primite
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 font-semibold text-gray-600">Serviciu</th>
                <th className="pb-4 font-semibold text-gray-600">
                  Client / Animal
                </th>
                <th className="pb-4 font-semibold text-gray-600">Data</th>
                <th className="pb-4 font-semibold text-gray-600">Status</th>
                <th className="pb-4 font-semibold text-gray-600">Acțiuni</th>
              </tr>
            </thead>

            <tbody>
              {safeBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-400">
                    Nu există nicio cerere momentan.
                  </td>
                </tr>
              ) : (
                safeBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50">
                    <td className="py-4">
                      {booking.service?.title || "Serviciu șters"}
                    </td>

                    <td className="py-4">
                      <p className="font-bold">{booking.client?.name}</p>
                      <p className="text-xs text-gray-500">
                        {booking.pet?.name} ({booking.pet?.type})
                      </p>
                    </td>

                    <td className="py-4">
                      {new Date(booking.date).toLocaleString("ro-RO")}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="py-4">
                      {booking.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusClick(booking.id, "confirmed")
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold"
                          >
                            Acceptă
                          </button>

                          <button
                            onClick={() =>
                              handleStatusClick(booking.id, "cancelled")
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold"
                          >
                            Refuză
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          Finalizat
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};