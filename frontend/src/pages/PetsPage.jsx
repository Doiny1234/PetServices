import React, { useEffect, useState } from "react";
import { getMyPets, addPet, deletePet, updatePet } from "../services/petService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPetId, setEditingPetId] = useState(null);

  const [formData, setFormData] = useState({ 
    name: "", 
    type: "dog", 
    breed: "", 
    age: "" 
  });

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null); // Resetăm eroarea la fiecare încercare
      const res = await getMyPets();
      setPets(res.data);
    } catch (err) {
      console.error("Eroare la încărcare:", err);
      setError("Nu am putut prelua lista de animale.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (pet) => {
    setEditingPetId(pet.id);
    setFormData({
      name: pet.name,
      type: pet.type,
      breed: pet.breed || "",
      age: pet.age || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({ name: "", type: "dog", breed: "", age: "" });
    setEditingPetId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        age: formData.age ? parseInt(formData.age, 10) : null
      };

      if (editingPetId) {
        await updatePet(editingPetId, payload);
        alert("Animal actualizat cu succes!");
      } else {
        await addPet(payload);
        alert("Animal adăugat cu succes!");
      }

      resetForm();
      loadPets();
    } catch (err) {
      console.error("Eroare la salvare:", err);
      alert("Eroare: " + (err.response?.data?.error || "Server error"));
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    if (window.confirm("Ești sigur că vrei să ștergi acest animal?")) {
      try {
        await deletePet(id);
        if (editingPetId === id) resetForm();
        alert("Animalul a fost șters.");
        loadPets();
      } catch (err) {
        console.error("Eroare la ștergere:", err);
        alert("Nu s-a putut efectua ștergerea.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf7f2]">
      <Navbar />
      
      <main className="container mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#5A3B1F]">Animalele Mele</h1>
          <p className="text-gray-600 mt-2">Gestionează profilurile prietenilor tăi necuvântători</p>
        </div>

        {/* AFIȘARE EROARE - Aici folosim variabila 'error' ca să dispară avertismentul */}
        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Formular */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-[#e2c6aa] h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-[#5A3B1F] border-b pb-2">
              {editingPetId ? "📝 Editează Profilul" : "🐾 Adaugă un membru nou"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nume</label>
                <input 
                  type="text" required 
                  className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#e2c6aa]"
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tip Animal</label>
                <select 
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#e2c6aa]"
                  value={formData.type} 
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="dog">Câine</option>
                  <option value="cat">Pisică</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rasă</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#e2c6aa]"
                  value={formData.breed} 
                  onChange={(e) => setFormData({...formData, breed: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vârstă (ani)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#e2c6aa]"
                  value={formData.age} 
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  type="submit"
                  className={`w-full text-white py-3 rounded-xl font-bold transition-all shadow-lg mt-4 ${
                    editingPetId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#5A3B1F] hover:bg-[#7b5638]'
                  }`}
                >
                  {editingPetId ? "Actualizează Datele" : "Salvează Animalul"}
                </button>
                
                {editingPetId && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    Anulează Editarea
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Listă Animale */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 text-[#5A3B1F]">Lista Ta</h2>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A3B1F]"></div>
              </div>
            ) : pets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pets.map(pet => (
                  <div key={pet.id} className={`bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center transition-all ${editingPetId === pet.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-100 hover:border-[#e2c6aa]'}`}>
                    <div className="flex items-center gap-4">
                      <div className="bg-[#f5eee6] p-3 rounded-full text-2xl">
                        {pet.type === 'dog' ? '🐶' : pet.type === 'cat' ? '🐱' : '🐾'}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#5A3B1F] text-lg leading-none">{pet.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{pet.breed || "Rasă mixtă"} • {pet.age} ani</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditClick(pet)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
                        title="Editează"
                      >
                        ✏️
                      </button>
                      
                      <button 
                        onClick={() => handleDelete(pet.id)}
                        className="text-red-400 hover:bg-red-50 p-2 rounded-full transition-colors"
                        title="Șterge"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-20 text-gray-400 italic">Niciun animal găsit.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PetsPage;