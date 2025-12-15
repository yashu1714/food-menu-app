import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import FilterBar from "./FilterBar";
import RecipeModal from "./RecipeModal";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const RecipeSearch = () => {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [ingredient, setIngredient] = useState("");

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [selectedMeal, setSelectedMeal] = useState(null);

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
      if (!user) {
        saveLocal([]);
        return;
      }
      const ref = doc(db, "favorites", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        saveLocal(snap.data().meals);
      }
    };
    loadCloud();
  }, [user]);

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      let meals = data.meals || [];

      if (meals.length && !meals[0].strInstructions) {
        const fullMeals = [];
        for (const m of meals) {
          const r = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`
          );
          const d = await r.json();
          fullMeals.push(d.meals[0]);
        }
        meals = fullMeals;
      }

      setRecipes(meals);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = () => {
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    setCategory("");
    setArea("");
    setIngredient("");
  };

  const fetchRandom = async () => {
    setLoading(true);
    const arr = [];
    for (let i = 0; i < 6; i++) {
      const r = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const d = await r.json();
      arr.push(d.meals[0]);
    }
    setRecipes(arr);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  useEffect(() => {
    if (category) {
      fetchMeals(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
    }
  }, [category]);

  useEffect(() => {
    if (area) {
      fetchMeals(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
    }
  }, [area]);

  useEffect(() => {
    if (ingredient) {
      fetchMeals(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
    }
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

  const openModal = (meal) => setSelectedMeal(meal);
  const closeModal = () => setSelectedMeal(null);

  return (
    <>
      <h1 className="title">Food Menu App 🍽️</h1>

      <FilterBar
        categories={categories}
        areas={areas}
        ingredients={ingredients}
        setCategory={setCategory}
        setArea={setArea}
        setIngredient={setIngredient}
      />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search meals like Biryani, Pizza..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchSearch} className="search-button">
          Search
        </button>
      </div>

      {loading && <p className="loading-text">Loading recipes...</p>}

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

      {selectedMeal && (
        <RecipeModal meal={selectedMeal} closeModal={closeModal} />
      )}
    </>
  );
};

export default RecipeSearch;

