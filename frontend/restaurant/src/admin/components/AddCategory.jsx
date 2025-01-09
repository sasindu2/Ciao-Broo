import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import "../styles/AddCategory.css";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category Name:", categoryName);
    console.log("Category Image URL:", imageUrl);
  };

  return (
    <div className="add-category">
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group-add-category">
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

        <div className="form-group-add-category">
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
                <div className="image-preview-container">
                  <button
                    type="button"
                    className="cancel-image-btn"
                    onClick={handleCancelImage}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <div className="image-preview">
                    <img
                      src={imageUrl || URL.createObjectURL(categoryImage)}
                      alt="Category preview"
                    />
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

        <button type="submit" className="submit-btn" disabled={isUploading}>
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
