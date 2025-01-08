/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  // Mock data for testing
  const mockOrders = [
    {
      id: 1,
      customerName: "John Doe",
      phoneNumber: "+1 234-567-8900",
      tableNumber: "T1",
      items: [
        { name: "Burger", price: 12.99 },
        { name: "Fries", price: 4.99 },
        { name: "Coke", price: 2.99 },
      ],
      status: "pending",
      date: "2024-03-15",
      totalAmount: 20.97,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      phoneNumber: "+1 234-567-8901",
      tableNumber: "T2",
      items: [
        { name: "Pizza", price: 15.99 },
        { name: "Wings", price: 10.99 },
      ],
      status: "in_progress",
      date: "2024-03-15",
      totalAmount: 26.98,
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      phoneNumber: "+1 234-567-8902",
      tableNumber: "T3",
      items: [
        { name: "Salad", price: 8.99 },
        { name: "Sandwich", price: 10.99 },
        { name: "Tea", price: 3.99 },
      ],
      status: "completed",
      date: "2024-03-15",
      totalAmount: 23.97,
    },
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // In a real app, you would make an API call here
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleRowClick = (order, e) => {
    // Prevent the click event from reaching the select element
    if (
      e.target.tagName.toLowerCase() === "select" ||
      e.target.tagName.toLowerCase() === "option"
    ) {
      return;
    }
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderUpdate = (updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    handleModalClose();
  };

  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0)
      .toFixed(2);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-section">
        <div className="status-buttons">
          <button
            className={`status-btn ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All Orders
          </button>
          <button
            className={`status-btn ${
              filterStatus === "pending" ? "active" : ""
            }`}
            onClick={() => setFilterStatus("pending")}
          >
            New Orders
          </button>
          <button
            className={`status-btn ${
              filterStatus === "in_progress" ? "active" : ""
            }`}
            onClick={() => setFilterStatus("in_progress")}
          >
            In Progress
          </button>
          <button
            className={`status-btn ${
              filterStatus === "completed" ? "active" : ""
            }`}
            onClick={() => setFilterStatus("completed")}
          >
            Completed
          </button>
        </div>

        <div className="orders-section">
          <div className="orders-table-section">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Table No.</th>
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={(e) => handleRowClick(order, e)}
                    className="clickable-row"
                    style={{ cursor: "pointer" }}
                  >
                    <td>#{order.id}</td>
                    <td>{order.tableNumber}</td>
                    <td>{order.customerName}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.items.map((item) => item.name).join(", ")}</td>
                    <td>${order.totalAmount}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td
                      className="action-cell"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal rendered outside the table structure */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="close-btn" onClick={handleModalClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOrderUpdate(selectedOrder);
                }}
              >
                <div className="form-group">
                  <label>Order ID:</label>
                  <input type="text" value={`#${selectedOrder.id}`} disabled />
                </div>
                <div className="form-group">
                  <label>Table Number:</label>
                  <input
                    type="text"
                    value={selectedOrder.tableNumber}
                    onChange={(e) =>
                      setSelectedOrder({
                        ...selectedOrder,
                        tableNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Customer Name:</label>
                    <input
                      type="text"
                      value={selectedOrder.customerName}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      value={selectedOrder.phoneNumber}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Order Items:</label>
                  <div className="items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const newItems = [...selectedOrder.items];
                            newItems[index] = {
                              ...newItems[index],
                              name: e.target.value,
                            };
                            setSelectedOrder({
                              ...selectedOrder,
                              items: newItems,
                              totalAmount: calculateTotal(newItems),
                            });
                          }}
                          placeholder="Item name"
                        />
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const newItems = [...selectedOrder.items];
                            newItems[index] = {
                              ...newItems[index],
                              price: parseFloat(e.target.value) || 0,
                            };
                            setSelectedOrder({
                              ...selectedOrder,
                              items: newItems,
                              totalAmount: calculateTotal(newItems),
                            });
                          }}
                          placeholder="Price"
                          className="price-input"
                          step="0.01"
                          min="0"
                        />
                        <button
                          type="button"
                          className="remove-item"
                          onClick={() => {
                            const newItems = selectedOrder.items.filter(
                              (_, i) => i !== index
                            );
                            setSelectedOrder({
                              ...selectedOrder,
                              items: newItems,
                              totalAmount: calculateTotal(newItems),
                            });
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-item"
                      onClick={() => {
                        const newItems = [
                          ...selectedOrder.items,
                          { name: "", price: 0 },
                        ];
                        setSelectedOrder({
                          ...selectedOrder,
                          items: newItems,
                          totalAmount: calculateTotal(newItems),
                        });
                      }}
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Total Amount:</label>
                    <input
                      type="number"
                      value={selectedOrder.totalAmount}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
