import "./styles.css";
import bgImage from "../../public/assets/BG-1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import "./styles.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/Category`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id, name) => {
    navigate(`/foods/${id}/${name}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="categories-container">
        <h2 className="categories-title">Categories</h2>
        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <div
              key={category._id}
              className="category-card"
              onClick={() =>
                handleCategoryClick(category._id, category.category_name)
              }
              style={{ cursor: "pointer" }}
            >
              <div className="image-wrapper">
                <img
                  src={category.image}
                  alt={category.category_name}
                  className="category-image"
                />
              </div>
              <div className="category-overlay">
                <span className="categories-name">
                  {category.category_name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
