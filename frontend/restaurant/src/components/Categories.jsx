import { useState, useEffect } from "react";
import Header from "./Header";
import { categoryData } from "../data/categoryData";
import "./styles.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCategories(categoryData.categories);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="categories-container">
        <h2 className="categories-title">Categories</h2>
        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
              </div>
              <div className="category-overlay">
                <span className="categories-name">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
