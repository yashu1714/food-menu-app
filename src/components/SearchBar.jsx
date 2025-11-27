import React, { useState } from "react";

const SearchBar = ({ setQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim() === "") return;
    setQuery(input);
    setInput("");
  };

  return (
    <div className="search-bar">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search food..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
