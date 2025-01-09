import { useState } from "react";
import "../components/styles.css";
import { categoryData } from "../data/categoryData";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);

    if (value.trim()) {
      const filteredSuggestions = categoryData.categories
        .filter((category) =>
          category.name.toLowerCase().includes(value.toLowerCase())
        )
        .map((category) => category.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  return (
    <header className="header">
      <div className="header-section">
        <img src="./assets/3d@4x.png" alt="Logo" className="logo" />
      </div>

      <div className="banner">
        <h1 className="slogen">Flavors of Italy, Served with Passion</h1>
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Category Name"
              className="category-name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="search-button">Search</button>
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <img
          src="./assets/bannerImage.png"
          className="banner-img"
          alt="banner"
        />
      </div>
    </header>
  );
};

export default Header;
