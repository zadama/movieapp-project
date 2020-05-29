import React, { useState } from "react";

const Search = ({ updateSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = event => {
    setSearch(event.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (search === "") {
      return;
    }

    updateSearch(search);

    setSearch("");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        placeholder="Sök film"
        className="search-input"
        name="movie"
        type="text"
        onChange={handleSearchChange}
        value={search}
      ></input>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default Search;
