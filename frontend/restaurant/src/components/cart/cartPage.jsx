import { Link, useNavigate } from "react-router-dom";
import "./cartpagefor.css";
import { useState } from "react";
import useCartStore from "../../store/store";
import Swal from "sweetalert2";

function CartPage() {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    tableNumber: "",
  });
  const [showError, setShowError] = useState(false);

  const cartItemsets = useCartStore((state) => state.getAllItems());
  const itemupdateQuantity = useCartStore((state) => state.updateQuantity);
  const itemuremove = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const handleIncrement = (id, qty) => {
    itemupdateQuantity(id, qty + 1);
  };

  const handleDecrement = (id, qty) => {
    if (qty > 1) {
      itemupdateQuantity(id, qty - 1);
    }
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    if (
      !customerDetails.name ||
      !customerDetails.phone ||
      !customerDetails.tableNumber
    ) {
      setShowError(true);
      document
        .querySelector(".customer-details")
        .scrollIntoView({ behavior: "smooth" });
      return;
    }

    Swal.fire({
      title: "Confirm Order",
      text: `Total Amount: $${totalPrice.toFixed(2)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const orderData = {
            customerName: customerDetails.name,
            customerTel: customerDetails.phone,
            tableNumber: customerDetails.tableNumber,
            products: cartItemsets,
            totalPrice: totalPrice.toFixed(2),
          };

          const response = await fetch(
            `${import.meta.env.VITE_API}/api/Order`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            }
          );

          if (response.ok) {
            Swal.fire({
              title: "Success!",
              text: "Your order has been placed successfully. you will receive order within 15 minutes",
              icon: "success",
              confirmButtonColor: "#4CAF50",
            }).then(() => {
              useCartStore.getState().clearCart();
              navigate("/");
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to place order",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          }
        } catch (error) {
          console.error("Checkout error:", error);
          Swal.fire({
            title: "Error!",
            text: `An error occurred: ${error.message}`,
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="logo-container">
          <img
            src="./assets/3d@4x.png"
            alt="Restaurant Logo"
            className="cart-logo"
          />
        </div>
        <div className="header-content">
          <h2>Your Cart</h2>
          <button
            onClick={handleContinueShopping}
            className="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <div className="customer-details">
        <h3>Customer Details</h3>
        {showError && (
          <div className="error-message">
            Please fill in all customer details before proceeding
          </div>
        )}
        <div className="customer-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerDetails.name}
              onChange={handleCustomerDetailsChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerDetails.phone}
              onChange={handleCustomerDetailsChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tableNumber">Table Number:</label>
            <input
              type="number"
              id="tableNumber"
              name="tableNumber"
              value={customerDetails.tableNumber}
              onChange={handleCustomerDetailsChange}
              required
            />
          </div>
        </div>
      </div>

      {cartItemsets.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="start-shopping">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItemsets.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleDecrement(item.id, item.qty)}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => handleIncrement(item.id, item.qty)}
                      >
                        +
                      </button>
                    </div>
                    <span className="item-price">
                    €{(item.price * item.qty).toFixed(2)}
                    </span>
                    <button
                      className="remove-item"
                      onClick={() => itemuremove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="total">
              <span>Total:</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
