import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/EditCategoryModal.css";

const EditCategoryModal = ({ category, isOpen, onClose, onSave }) => {
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (category) {
      setEditedCategory({
        name: category.name || "",
        image: category.image || "",
      });
      setImagePreview(category.image || null);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditedCategory((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...category, ...editedCategory });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Category Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedCategory.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Category Image:</label>
            <div className="image-upload-container">
              <div className="upload-area">
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="file-input"
                  accept="image/*"
                />
                <span>Click to upload image</span>
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
