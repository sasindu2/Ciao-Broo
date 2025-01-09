import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import "../styles/EditCategoryModal.css";

const EditCategoryModal = ({ category, isOpen, onClose, onSave }) => {
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    image: "",
  });
  const [categoryImage, setCategoryImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (category) {
      setEditedCategory({
        name: category.name || "",
        image: category.image || "",
      });
      setImageUrl(category.image || "");
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setIsUploading(true);
      try {
        const storageRef = ref(storage, `category-images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Error uploading image:", error);
            setIsUploading(false);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUrl(url);
            setEditedCategory((prev) => ({
              ...prev,
              image: url,
            }));
            console.log("Firebase Storage URL:", url);
            setIsUploading(false);
          }
        );
      } catch (error) {
        console.error("Error starting upload:", error);
        setIsUploading(false);
      }
    }
  };

  const handleCancelImage = () => {
    setCategoryImage(null);
    setImageUrl("");
    setUploadProgress(0);
    setIsUploading(false);
    setEditedCategory((prev) => ({
      ...prev,
      image: "",
    }));
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
          <div className="form-group-edit-cate">
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
          <div className="form-group-edit-cate">
            <label>Category Image</label>
            <div className="upload-section">
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="file-upload"
                  className="file-upload-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {!imageUrl ? (
                  <label
                    htmlFor="file-upload"
                    className="file-upload-edit-label"
                  >
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className="upload-icon"
                    />
                    <span>Choose a file or drag it here</span>
                  </label>
                ) : (
                  <div className="image-preview-container">
                    <button
                      type="button"
                      className="cancel-image-btn"
                      onClick={handleCancelImage}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="image-preview">
                      <img src={imageUrl} alt="Category preview" />
                    </div>
                    {isUploading && (
                      <div className="upload-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {Math.round(uploadProgress)}%
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
              disabled={isUploading}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
