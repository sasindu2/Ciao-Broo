import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/CategoryList.css";
import axios from "axios";


const CategoryList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // const [categories, setCategories] = useState([
  //   { id: 1, name: "Appetizers", image: "appetizer-image-url" },
  //   { id: 2, name: "Main Course", image: "main-course-image-url" },
  //   { id: 3, name: "Desserts", image: "dessert-image-url" },
  // ]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {

        const response = await axios.get(`${import.meta.env.VITE_API}/api/Category/`);
        console.log(response.data)
        setCategories(response.data);

      } catch (error) {
        console.error("Error fetching Orders:", error);
      }
    };

    fetchdata();
  }, []);

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        const authData = JSON.parse(localStorage.getItem("authToken"));
        const token = authData?.token;
        const response = await axios.delete(`${import.meta.env.VITE_API}/api/Category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      }
    });
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-list-container">
      <div className="page-header">
        <h1>Categories</h1>
      </div>

      <div className="actions-bar">
        <div className="item-search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="add-item-btn"
          onClick={() => navigate("/admin/add-category")}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Category
        </button>
      </div>

      <div className="table-container">
        <table className="category-table">
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={category._id}>
                <td>#{index + 1}</td>
                <td>{category.category_name}</td>
                <td>
                  <img
                    src={category.image}
                    alt={category.category_name}
                    className="category-image"
                  />
                </td>
                <td className="action-cell">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(category._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
