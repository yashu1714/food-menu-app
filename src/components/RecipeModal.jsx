import React from "react";

const RecipeModal = ({ meal, closeModal }) => {
  if (!meal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <span className="modal-close" onClick={closeModal}>✖</span>
        <h2 className="modal-title">{meal.strMeal}</h2>

        <img
          src={meal.strMealThumb + "/preview"}
          alt={meal.strMeal}
          className="modal-img"
        />

        <h3>Ingredients</h3>
        <ul>
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map((i) => ({
              ing: meal[`strIngredient${i}`],
              mes: meal[`strMeasure${i}`],
            }))
            .filter((i) => i.ing)
            .map((i, idx) => (
              <li key={idx}>{i.ing} — {i.mes}</li>
            ))}
        </ul>

        <h3>Instructions</h3>
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
};
export default RecipeModal;



