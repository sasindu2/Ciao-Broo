import React, {  useEffect, useRef } from "react";

import { Routes, Route } from "react-router-dom";
import Dashboard from "../admin/components/Dashboard";
import AddCategory from "../admin/components/AddCategory";
import CategoryList from "../admin/components/CategoryList";
import ItemList from "../admin/components/ItemList";
import AddItems from "../admin/components/AddItems";
import AdminLayout from "../admin/components/AdminLayout";
import axios from "axios";
import io from "socket.io-client";

const AdminRoutes = () => {
    const socketRef = useRef(null);
  

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API}`);


    socketRef.current.on("newOrder", (data) => {
      console.log("New order data received:", data);

      if (data && data.order) {
        const { order } = data;

        if (Notification.permission === "granted") {
          const notification = new Notification("New Order Received", {
            body: `Order for ${order.customerName} at table ${order.tableNumber}`,
            icon: order.products[0]?.image,
          });
          notification.onclick = () => {
            const orderDetailsURL = `${window.location.origin}/admin/dashboard`;
            window.open(orderDetailsURL, "_blank");
          };

          
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              const notification = new Notification("New Order Received", {
                body: `Order for ${order.customerName} at table ${order.tableNumber}`,
                icon: order.products[0]?.image,
              });
              notification.onclick = () => {
                const orderDetailsURL = `${window.location.origin}/admin/dashboard`;
                window.open(orderDetailsURL, "_blank");
              };
            }
          });
        }

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
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="itemlist" element={<ItemList />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="add-items" element={<AddItems />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
