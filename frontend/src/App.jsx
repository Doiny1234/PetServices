import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ServicesPage from "./pages/ServicesPage";
import PetsPage from "./pages/PetsPage";
import FavoritesPage from "./pages/FavoritesPage";

// 1. Componenta pentru protecție generală (să fie logat)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
};

// 2. Componenta pentru protecție pe ROLURI (Cerință avansată Proiect)
const RoleRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Obținem userul din localStorage
  if (!token) return <Navigate to="/login" />;
  
  if (!allowedRoles.includes(user?.role)) {
    // Dacă ești logat dar n-ai voie aici, te trimite la Dashboard
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publice */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />

        {/* Rute Protejate (Oricine e logat) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          } 
        />

        {/* Rute DOAR pentru PET OWNER */}
        <Route 
          path="/pets" 
          element={
            <RoleRoute allowedRoles={["owner", "admin"]}>
              <PetsPage />
            </RoleRoute>
          } 
        />


        {/* Fallback - redirectionează orice rută inexistentă la Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;