import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // ❤️ Icons

const RecipeCard = ({ recipe, openModal, toggleFavorite, isFavorite, user}) => {
  const imgStyle = {
    width: "100%",
    maxWidth: "240px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "12px",
    display: "block",
    margin: "0 auto",
  };

  return (
    <div className="recipe-card" onClick={() => openModal(recipe)}>
      {/* Image */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={imgStyle}
        loading="lazy"
      />

      {/* Title + Favorite Heart */}
      <h2 className="recipe-title">
        {recipe.strMeal}

        <span
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe);
               if (!user) return; 

            e.target.classList.add("heart-animate");
            setTimeout(() => {
              e.target.classList.remove("heart-animate");
            }, 400);
          }}
          className={`favorite-heart ${isFavorite ? "active" : ""}`}
        >
          {/* ❤️ Red heart if favorite, 🤍 outline if not */}
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </span>
      </h2>
    </div>
  );
};

export default RecipeCard;






