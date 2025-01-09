import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import "../styles/AddItems.css";

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setIsUploading(true);

      try {
        const storageRef = ref(storage, `item-images/${file.name}`);
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
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImageUrl("");
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      imageUrl: imageUrl, // Include the Firebase URL
    });
  };

  return (
    <div className="add-items">
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group-add-item">
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
          <div className="form-group-add-item">
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
          <div className="form-group-add-item">
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
          <div className="form-group-add-item">
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
                {!formData.image ? (
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
                        src={imageUrl || URL.createObjectURL(formData.image)}
                        alt="Preview"
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
        </div>

        <button type="submit" className="submit-btn" disabled={isUploading}>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItems;
