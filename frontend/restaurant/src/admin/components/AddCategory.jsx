import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
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
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>

        <div className="form-group">
          <label>Category Image</label>
          <div className="upload-section">
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="file-upload"
                className="file-upload-input"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {!categoryImage ? (
                <label htmlFor="file-upload" className="file-upload-label">
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className="upload-icon"
                  />
                  <span>Choose a file or drag it here</span>
                </label>
              ) : (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(categoryImage)}
                    alt="Category preview"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
