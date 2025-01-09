import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ItemList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import EditModal from "./EditModal";
import axios from "axios";

const ItemList = () => {
  // const [items, setItems] = useState([
  //   { id: 1, name: "Burger", price: 9.99, isAvailable: true },
  //   { id: 2, name: "Pizza", price: 12.99, isAvailable: false },
  //   { id: 3, name: "Pasta", price: 8.99, isAvailable: true },
  // ]);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedItem) => {
    // console.log(editedItem);

    const authData = JSON.parse(localStorage.getItem("authToken"));
    const token = authData?.token;
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API}/api/Food/${editedItem._id}`,
        {
          name: editedItem.name,
          price: editedItem.price,
          description: editedItem.description

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = "/admin/ItemList";

    } catch (error) {
      console.error("Error fetching Orders:", error);
    }

    // setItems(
    //   items.map((item) => (item.id === editedItem.id ? editedItem : item))
    // );
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };
  const handleAddNew = () => {
    navigate("/admin/add-items");
  };

  const handleDelete = (id) => {
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
        await axios.delete(
          `${import.meta.env.VITE_API}/api/Food/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.location.reload();
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const handleAvailabilityToggle = async (id) => {
    const authData = JSON.parse(localStorage.getItem("authToken"));
    const token = authData?.token;
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/Food/availablity/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Updated food item:", response.data);
      window.location.reload();
  
    } catch (error) {
      console.error("Error updating availability status:", error);
    }
  };
    

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/Food`
        );
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching Orders:", error);
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="item-list-container">
      <header className="page-header">
        <h1>Food Items</h1>
      </header>

      <div className="actions-bar">
        <div className="item-search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-item-btn" onClick={handleAddNew}>
          <FontAwesomeIcon icon={faPlus} /> Add Item
        </button>
      </div>

      <div className="table-container">
        <table className="items-table">
          <thead>
            <tr>
              <th>Food ID</th>
              <th>Food Name</th>
              <th>Food Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item._id}>
                <td>#{index + 1}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={item.isAvailable}
                      onChange={() => handleAvailabilityToggle(item._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(item)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditModal
        item={selectedItem}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default ItemList;
