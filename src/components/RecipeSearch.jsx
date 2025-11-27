import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import FilterBar from "./FilterBar";
import RecipeModal from "./RecipeModal";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";   // ⬅️ VERY IMPORTANT

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [ingredient, setIngredient] = useState("");

  const { user, logout } = useAuth();

  // ------------------- THEME LOAD -------------------
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.body.classList.add(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    document.body.classList.remove("dark", "light");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // ------------------- FAVORITES -------------------
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
     useEffect(() => {
  if (!user) {
    setFavorites([]);
  }
}, [user]);
  const saveLocal = (fav) => {
    setFavorites(fav);
    localStorage.setItem("favorites", JSON.stringify(fav));
  };

  const saveCloud = async (fav) => {
    if (!user) return;
    const ref = doc(db, "favorites", user.uid);
    await setDoc(ref, { meals: fav });
  };

  const saveFavorites = async (fav) => {
    saveLocal(fav);
    await saveCloud(fav);
  };

  const toggleFavorite = async (meal) => {
  if (!user) {
   toast.warning("Please login to save favorites ❤️");
    return;
  }

  const exists = favorites.some((f) => f.idMeal === meal.idMeal);
  const updated = exists
    ? favorites.filter((f) => f.idMeal !== meal.idMeal)
    : [...favorites, meal];

  await saveFavorites(updated);
};
  const isFavorite = (id) => favorites.some((f) => f.idMeal === id);
  useEffect(() => {
    const loadCloud = async () => {
      if (!user) return;
      const ref = doc(db, "favorites", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) saveLocal(snap.data().meals);
    };
    loadCloud();
  }, [user]);

  // ------------------- FETCH FUNCTIONS -------------------
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      let meals = data.meals || [];

      if (meals.length && !meals[0].strInstructions) {
        const full = [];
        for (const m of meals) {
          const r = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`
          );
          const d = await r.json();
          full.push(d.meals[0]);
        }
        meals = full;
      }
      setRecipes(meals);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = () => {
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    setCategory("");
    setArea("");
    setIngredient("");
  };

  const fetchRandom = async () => {
    setLoading(true);
    const arr = [];
    for (let i = 0; i < 6; i++) {
      const r = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const d = await r.json();
      arr.push(d.meals[0]);
    }
    setRecipes(arr);
    setLoading(false);
  };

  useEffect(() => { fetchRandom(); }, []);

  // Filters
  useEffect(() => {
    if (category)
      fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  }, [category]);

  useEffect(() => {
    if (area)
      fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  }, [area]);

  useEffect(() => {
    if (ingredient)
      fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  }, [ingredient]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((r) => r.json())
      .then((d) => setCategories(d.meals || []));
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((r) => r.json())
      .then((d) => setAreas(d.meals || []));
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((r) => r.json())
      .then((d) => setIngredients(d.meals || []));
  }, []);

  // ------------------- MODAL -------------------
  const [selectedMeal, setSelectedMeal] = useState(null);
  const openModal = (meal) => setSelectedMeal(meal);
  const closeModal = () => setSelectedMeal(null);

  return (
    <div className="app-container">

      {/* ---------- NAVBAR ---------- */}
      <div style={{ marginBottom: "10px" }}>
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/favorites" className="nav-btn">Favorites ⭐</Link>

        {user ? (
          <>
            <span style={{ margin: "0 10px" }}>{user.email}</span>
            <button className="nav-btn" style={{ background: "#d9534f" }} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-btn">Login</Link>
        )}

        {/* Theme Toggle */}
        <button className="nav-btn" onClick={toggleTheme}>🌓 Theme</button>
      </div>

      <h1 className="title">Food Menu App 🍽️</h1>

      {/* ---------- FILTERS ---------- */}
      <FilterBar
        categories={categories}
        areas={areas}
        ingredients={ingredients}
        setCategory={setCategory}
        setArea={setArea}
        setIngredient={setIngredient}
      />

      {/* ---------- SEARCH ---------- */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search meals like Briyani, Pizza, Chicken..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchSearch} className="search-button">
          Search
        </button>
      </div>

      {loading && <p className="loading-text">Loading recipes...</p>}

      {/* ---------- RECIPES ---------- */}
      <h2 className="title">Recipes</h2>
      <div className="recipe-list">
        {recipes.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            recipe={meal}
            openModal={openModal}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite(meal.idMeal)}
             user={user}
          />
        ))}
      </div>

      {/* ---------- FAVORITES ---------- */}
      <h2 className="title" style={{ marginTop: "30px" }}>⭐ Favorite Recipes</h2>
      <div className="recipe-list">
        {favorites.length === 0 && <p className="no-data">No favorites yet!</p>}
        {favorites.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            recipe={meal}
            openModal={openModal}
            toggleFavorite={toggleFavorite}
            isFavorite={true}
          />
        ))}
      </div>

      {selectedMeal && <RecipeModal meal={selectedMeal} closeModal={closeModal} />}
    </div>
  );
};

export default RecipeSearch;


















