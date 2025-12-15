import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProfileMenu from "./components/ProfileMenu";
import RecipeSearch from "./components/RecipeSearch";
import FavoritesPage from "./components/FavoritesPage";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      <div className="app-container">
        {/* NAVBAR */}
        <div className="navbar">
          <ProfileMenu theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
          <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      </div>
    </AuthProvider>
  );
}

export default App;
