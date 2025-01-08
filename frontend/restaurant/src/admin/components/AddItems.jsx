import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/AddItems.css";

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="add-items">
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <div className="upload-section">
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="form-control file-upload-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className="upload-icon"
                  />
                  <span>Choose a file or drag it here</span>
                </label>
              </div>
              {formData.image && (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItems;
