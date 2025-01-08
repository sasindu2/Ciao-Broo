
import React, { useState, useEffect } from 'react';
import { categoryData } from '../data/categoryData';
import './styles.css'


const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoryData.categories);
  }, []);

  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
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
  );
};

export default Categories;