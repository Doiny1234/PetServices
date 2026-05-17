import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function FavoritesPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return (
         <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fdf7f2]">
        <h1 className="text-3xl font-bold mb-4">Favorites</h1>
        <p className="mb-4">Trebuie să fii logat pentru a vedea favoritele.</p>

        <button
          onClick={() => navigate("/login")}
          className="bg-[#8B5E3C] text-white px-6 py-2 rounded"
        >
          Mergi la Login
        </button>
      </div>
             <Footer />
      </>
    );
  }

  return (
     <>
      <Navbar />
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Favoritele tale</h1>
    </div>
         <Footer />
    </>
  );
}