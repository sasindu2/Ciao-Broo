
import React, { useState, useEffect } from 'react';
import './styles.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/Category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const handleCategoryClick = (id,name) => {
    navigate(`/foods/${id}/${name}`);
  };


  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category._id}
            className="category-card"
            onClick={() => handleCategoryClick(category._id, category.category_name)}
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
              <span className="categories-name">{category.category_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;