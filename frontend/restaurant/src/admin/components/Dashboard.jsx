/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "../styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import io from "socket.io-client";


const Dashboard = () => {

  const socketRef = useRef(null);
  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("authToken"));
        const token = authData?.token;
        // console.log(token)
        const response = await axios.get(`${import.meta.env.VITE_API}/api/Order/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const apiOrders = response.data
          .map((order) => ({
            id: order._id,
            customerName: order.customerName,
            phoneNumber: order.customerTel,
            tableNumber: order.tableNumber,
            items: order.products.map((product) => ({
              name: product.name,
              price: parseFloat(product.price),
              qty: product.qty
            })),
            status: order.order_status,
            date: new Date(order.createdAt).toLocaleDateString(),
            totalAmount: parseFloat(order.totalPrice),
            createdAt: new Date(order.createdAt),
          }))
          .sort((a, b) => b.createdAt - a.createdAt);

        setOrders(apiOrders);


      } catch (error) {
        console.error("Error fetching Orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000/");


    socketRef.current.on("newOrder", (data) => {
      console.log("New order data received:", data);

      if (data && data.order) {
        const { order } = data;

        setOrders((prevOrders) => [
          ...prevOrders,
          {
            id: order._id,
            customerName: order.customerName,
            phoneNumber: order.customerTel,
            tableNumber: order.tableNumber,
            items: order.products.map((product) => ({
              name: product.name,
              price: parseFloat(product.price),
              qty: product.qty
            })),
            status: order.order_status,
            date: new Date(order.createdAt).toLocaleDateString(),
            totalAmount: parseFloat(order.totalPrice),
            createdAt: new Date(order.createdAt),
          }
        ]);
      } else {
        console.error("Order data is undefined or malformed", data);
      }
    });


    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);


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
            className={`status-btn ${filterStatus === "pending" ? "active" : ""
              }`}
            onClick={() => setFilterStatus("pending")}
          >
            New Orders
          </button>
          <button
            className={`status-btn ${filterStatus === "in_progress" ? "active" : ""
              }`}
            onClick={() => setFilterStatus("in_progress")}
          >
            In Progress
          </button>
          <button
            className={`status-btn ${filterStatus === "delivered" ? "active" : ""
              }`}
            onClick={() => setFilterStatus("delivered")}
          >
            Delivered
          </button>
          <button
            className={`status-btn ${filterStatus === "completed" ? "active" : ""
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
                    <td>{order.id.slice(-5)}</td>
                    <td>{order.tableNumber}</td>
                    <td>{order.customerName}</td>
                    <td>{order.phoneNumber}</td>
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
                      <button
                        className="delete-btn"
                        onClick={() => {
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
                              const response = await axios.delete(`${import.meta.env.VITE_API}/api/Order/${order.id}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              });
                              setOrders(
                                orders.filter((o) => o.id !== order.id)
                              );
                              Swal.fire(
                                "Deleted!",
                                "Order has been deleted.",
                                "success"
                              );
                            }
                          });
                        }}
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
                <div className="form-group-1">
                  <label>Order ID:</label>
                  <input type="text" value={`#${selectedOrder.id}`} disabled />
                </div>
                <div className="form-group-1">
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
                    disabled />
                </div>
                <div className="form-row">
                  <div className="form-group-1">
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
                      disabled />
                  </div>
                  <div className="form-group-1">
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
                      disabled />
                  </div>
                </div>
                <div className="form-group-1">
                  <label>Order Items:</label>
                  <div className="items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <input type="text" value={item.name} readOnly />
                        <input type="text" value={`qty: ${item.qty}`} disabled />
                        <input type="text" value={`price: ${item.price}`} disabled />

                        {/* <button
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
                        </button> */}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group-1">
                    <label>Total Amount:</label>
                    <input
                      type="number"
                      value={selectedOrder.totalAmount}
                      readOnly
                    />
                  </div>
                  <div className="form-group-1">
                    <label>Status:</label>
                    <select
                      value={selectedOrder.status}
                      onChange={async (e) => {
                        setSelectedOrder((prevOrder) => ({
                          ...prevOrder,
                          status: e.target.value,
                        }));

                        const authData = JSON.parse(localStorage.getItem("authToken"));
                        const token = authData?.token;

                        try {
                          // Send a PATCH request to update the order status
                          const response = await axios.patch(
                            `${import.meta.env.VITE_API}/api/Order/${selectedOrder.id}`,
                            {
                              order_status: e.target.value, // Update the status with the new value
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`, // Pass the token for authentication
                              },
                            }
                          );

                          console.log("Order status updated:", response.data);

                          alert("Order status updated successfully!");
                        } catch (error) {
                          console.error("Error updating order status:", error);
                          alert("Failed to update order status. Please try again.");
                        }
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="delivered">Delivered</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Cancelled</option>
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
