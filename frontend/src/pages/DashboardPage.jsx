import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { OwnerView } from "../components/dashboard/OwnerView";
import { ProviderView } from "../components/dashboard/ProviderView";
import { AdminView } from "../components/dashboard/AdminView";

const DashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]); 
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // Convertim în lowercase ca să bată fix cu enum-ul din baza de date (owner, provider, admin)
  const userRole = user.role ? user.role.toLowerCase() : "";

  const fetchDashboardData = useCallback(async () => {
    if (!userRole) return;
    
    try {
      setLoading(true);
      
      if (userRole === 'provider') {
        const [bookingsRes, servicesRes] = await Promise.all([
          api.get('/bookings/provider'), 
          api.get('/services/my-services') 
        ]);
        
        setBookings(bookingsRes.data);
        setServices(servicesRes.data);
        
      } else if (userRole === 'owner') {
        const res = await api.get('/bookings/my-bookings');
        setBookings(res.data);
      }
    } catch (err) {
      console.error("Eroare la încărcarea datelor din Dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, [userRole]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleUpdateStatus = async (id, status) => {
    try {
      // Modificat în PUT și adăugat /status conform rutei din backend
      await api.put(`/bookings/${id}/status`, { status });
      await fetchDashboardData(); 
      alert(`Programarea a fost modificată în: ${status}!`);
    } catch (err) {
      console.error("Eroare status:", err);
      alert("Eroare: " + (err.response?.data?.error || "Eroare server"));
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf7f2] flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-10">
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-[#e2c6aa]">
          <h1 className="text-3xl font-bold text-[#5A3B1F]">Dashboard</h1>
          <p className="text-gray-500">
            Bine ai venit, <span className="font-semibold text-[#d1733d]">{user.name}</span> 
            <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full uppercase italic font-bold">
              {userRole}
            </span>
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 italic">Se încarcă datele panoului...</div>
        ) : (
          <div className="animate-fadeIn">
            {userRole === 'owner' && (
              <OwnerView user={user} bookings={bookings} onDataUpdate={fetchDashboardData} />
            )}
            
            {userRole === 'provider' && (
              <ProviderView 
                bookings={bookings} 
                services={services} 
                onUpdateStatus={handleUpdateStatus}
                onRefresh={fetchDashboardData} 
              />
            )}
            
            {userRole === 'admin' && <AdminView />}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;