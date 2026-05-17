import React, { useState } from "react";

import { Link } from "react-router-dom";

import { addPet, updatePet } from "../../services/petService";



export const OwnerView = ({ user, bookings, onDataUpdate }) => {

  const [showForm, setShowForm] = useState(false);

  const [editingPetId, setEditingPetId] = useState(null);

 

  // Starea formularului

  const [formData, setFormData] = useState({

    name: "",

    type: "dog",

    breed: "",

    age: ""

  });



  const resetForm = () => {

    setFormData({ name: "", type: "DOG", breed: "", age: "" });

    setEditingPetId(null);

    setShowForm(false);

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // --- REZOLVAREA AICI ESTE ---

      const payload = {

        name: formData.name,

        type: formData.type.toLowerCase(), // se asigură că e "dog" sau "cat"

        breed: formData.breed || "",

        // Convertim string-ul din input în număr întreg pentru Prisma

        age: formData.age ? parseInt(formData.age, 10) : null

      };



      if (editingPetId) {

        await updatePet(editingPetId, payload);

      } else {

        await addPet(payload);

      }

     

      resetForm();

      if (onDataUpdate) onDataUpdate(); // Refresh la datele din Dashboard

      alert("Salvare reușită! 🐾");

    } catch (err) {

      // Logăm eroarea exactă în consolă pentru debug

      console.error("Eroare detaliată server:", err.response?.data);

      alert("Eroare la salvare: " + (err.response?.data?.message || "Verifică datele introduse"));

    }

  };



  return (

    <div className="space-y-6 animate-fadeIn">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-[#5A3B1F]">

          Panou Control Owner - {user?.name}

        </h2>

        <button

          onClick={() => { resetForm(); setShowForm(!showForm); }}

          className="bg-[#d1733d] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#5A3B1F] transition-all shadow-md"

        >

          {showForm ? "Anulează" : "+ Adaugă Animal"}

        </button>

      </div>



      {/* Formular Adăugare/Editare */}

      {showForm && (

        <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-[#e2c6aa] animate-slideDown">

          <h3 className="font-bold text-[#5A3B1F] mb-4">

            {editingPetId ? "Editează Animal" : "Adaugă un membru nou"}

          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">

            <input

              type="text" placeholder="Nume" required

              className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#e2c6aa]"

              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}

            />

            <select

              className="border p-2 rounded-lg outline-none"

              value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}

            >

              <option value="DOG">Câine</option>

              <option value="CAT">Pisică</option>

            </select>

            <input

              type="text" placeholder="Rasă (opțional)"

              className="border p-2 rounded-lg outline-none"

              value={formData.breed} onChange={(e) => setFormData({...formData, breed: e.target.value})}

            />

            <input

              type="number" placeholder="Vârstă"

              className="border p-2 rounded-lg outline-none"

              value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})}

            />

            <button type="submit" className="bg-[#5A3B1F] text-white rounded-lg font-bold py-2 hover:bg-black transition-colors">

              {editingPetId ? "Actualizează" : "Salvează"}

            </button>

          </form>

        </div>

      )}



      {/* Secțiunea de Programări */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2c6aa]">

          <h3 className="font-bold text-[#5A3B1F] mb-4 flex items-center gap-2">

            <span>📅</span> Programările Mele

          </h3>

          {bookings && bookings.length > 0 ? (

            <div className="space-y-3">

              {bookings.map(b => (

                <div key={b.id} className="bg-[#fdf7f2] p-3 rounded-xl flex justify-between items-center border border-orange-50/50">

                  <div>

                    <p className="font-semibold text-[#5A3B1F]">{b.service?.title}</p>

                    <p className="text-xs text-gray-500">{new Date(b.date).toLocaleDateString()}</p>

                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${

                    b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'

                  }`}>

                    {b.status}

                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-400 text-sm italic">Nu ai nicio programare activă.</p>

          )}

        </div>



        {/* Link rapid către pagina de Pets */}

        <div className="bg-[#5A3B1F] text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">

          <div>

            <h3 className="font-bold text-xl text-[#e2c6aa] mb-2">🐾 Administrare Pets</h3>

            <p className="text-sm text-gray-200 mb-4">Gestionează profilurile detaliate ale animalelor tale din pagina dedicată.</p>

          </div>

          <Link to="/pets" className="bg-[#e2c6aa] text-[#5A3B1F] py-3 rounded-xl font-bold text-center hover:bg-white transition-all shadow-md">

            Vezi toate animalele

          </Link>

        </div>

      </div>

    </div>

  );

}; 