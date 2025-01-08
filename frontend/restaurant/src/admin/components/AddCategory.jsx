import React, { useState } from "react";
import "../styles/AddCategory.css";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Category Name:", categoryName);
    console.log("Category Image:", categoryImage);
  };

  return (
    <div className="add-category">
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryImage">Category Image</label>
          <input
            type="file"
            id="categoryImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {categoryImage && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(categoryImage)}
                alt="Category preview"
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
