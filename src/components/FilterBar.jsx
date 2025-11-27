import React from "react";

const FilterBar = ({ categories, areas, ingredients, setCategory, setArea, setIngredient }) => {
  return (
    <div className="filter-bar">
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Category</option>
        {categories.map((c) => <option key={c.strCategory}>{c.strCategory}</option>)}
      </select>

      <select onChange={(e) => setArea(e.target.value)}>
        <option value="">Area</option>
        {areas.map((a) => <option key={a.strArea}>{a.strArea}</option>)}
      </select>

      <select onChange={(e) => setIngredient(e.target.value)}>
        <option value="">Ingredient</option>
        {ingredients.map((i) => <option key={i.strIngredient}>{i.strIngredient}</option>)}
      </select>
    </div>
  );
};
export default FilterBar;




