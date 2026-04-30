import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Templates from "./pages/Templates";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

// ✅ Protected Route Component
function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("token");

  return isAuth ? children : <Navigate to="/login" />;
}

// ❌ Redirect if already logged in
function PublicRoute({ children }) {
  const isAuth = localStorage.getItem("token");

  return !isAuth ? children : <Navigate to="/templates" />;
}

function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <BrowserRouter>

      {/* Navbar only for logged users */}
      {isAuth && <Navbar />}

      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;