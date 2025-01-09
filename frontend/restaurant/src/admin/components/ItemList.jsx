import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ItemList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import EditModal from "./EditModal";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Burger", price: 9.99, isAvailable: true },
    { id: 2, name: "Pizza", price: 12.99, isAvailable: false },
    { id: 3, name: "Pasta", price: 8.99, isAvailable: true },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedItem) => {
    setItems(
      items.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
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
    }).then((result) => {
      if (result.isConfirmed) {
        setItems(items.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const handleAvailabilityToggle = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
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
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={item.isAvailable}
                      onChange={() => handleAvailabilityToggle(item.id)}
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
                    onClick={() => handleDelete(item.id)}
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
