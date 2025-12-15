import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import RecipeCard from "./RecipeCard";
import { toast } from "react-toastify";

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        toast.warning("Please login to view favorites ❤️");
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, "favorites", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setFavorites(snap.data().meals || []);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);
  const removeFavorite = async (meal) => {
    const updated = favorites.filter(
      (item) => item.idMeal !== meal.idMeal
    );

    setFavorites(updated);

    if (user) {
      const ref = doc(db, "favorites", user.uid);
      await import("firebase/firestore").then(({ setDoc }) =>
        setDoc(ref, { meals: updated })
      );
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.info("Removed from favorites 💔");
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading favorites...</p>;
  }

  if (!favorites.length) {
    return (
      <div className="app-container">
        <h1 className="title">⭐ Your Favorite Meals</h1>
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          You haven’t added any favorites yet ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="title">⭐ Your Favorite Meals</h1>

      <div className="recipe-list">
        {favorites.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            recipe={meal}
            isFavorite={true}
            toggleFavorite={() => removeFavorite(meal)}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

