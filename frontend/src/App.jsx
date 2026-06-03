import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ServicesPage from "./pages/ServicesPage";
import PetsPage from "./pages/PetsPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";

// 1. Componenta pentru protecție generală (utilizatorul trebuie să fie logat)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
};

// 2. Componenta pentru protecție pe ROLURI (restricționează accesul în funcție de rol)
const RoleRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Obținem datele user-ului din localStorage
  if (!token) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user?.role)) {
    // Dacă ești logat dar nu ai permisiunea necesară, ești redirecționat la Dashboard
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Rute Publice (accesibile fără autentificare) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/services" element={<ServicesPage />} />

          {/* Rute Protejate (accesibile doar pentru utilizatorii logați, indiferent de rol) */}
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Rute restricționate strict pentru PET OWNER și ADMIN */}
          <Route
              path="/pets"
              element={
                <RoleRoute allowedRoles={["owner", "admin"]}>
                  <PetsPage />
                </RoleRoute>
              }
          />

          {/* Fallback - redirecționează automat orice rută greșită sau inexistentă către Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;