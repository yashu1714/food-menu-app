import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { useAuth } from "../context/AuthContext";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 🔥 Protect the page
  if (!user) {
    return (
      <div className="auth-container">
        <h2>Please login to view your favorites</h2>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className="app-container">
      <div style={{ marginBottom: "10px" }}>
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/favorites" className="nav-btn">Favorites ⭐</Link>
        <span style={{ margin: "0 10px" }}>{user.email}</span>

        <button
          className="nav-btn"
          style={{ background: "#d9534f" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <h1 className="title">⭐ Your Favorite Meals</h1>

      <div className="recipe-list">
        {favorites.length === 0 && <p className="no-data">No favorites yet!</p>}
        {favorites.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            recipe={meal}
            openModal={() => {}}
            toggleFavorite={() => {}}
            isFavorite
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

