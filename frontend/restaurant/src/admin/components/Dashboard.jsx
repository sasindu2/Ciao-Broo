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
      items: ["Burger", "Fries", "Coke"],
      status: "pending",
      date: "2024-03-15",
      totalAmount: 25.99,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      phoneNumber: "+1 234-567-8901",
      items: ["Pizza", "Wings"],
      status: "in_progress",
      date: "2024-03-15",
      totalAmount: 35.5,
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      phoneNumber: "+1 234-567-8902",
      items: ["Salad", "Sandwich", "Tea"],
      status: "completed",
      date: "2024-03-15",
      totalAmount: 28.75,
    },
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState("all");

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
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.items.join(", ")}</td>
                    <td>${order.totalAmount}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="action-cell">
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
    </div>
  );
};

export default Dashboard;
