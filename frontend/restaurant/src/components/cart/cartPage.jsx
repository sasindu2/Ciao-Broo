import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css";
import { useState } from "react";
import logo from "../../assets/3d@4x.png";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    tableNumber: "",
  });
  const [showError, setShowError] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    if (
      !customerDetails.name ||
      !customerDetails.phone ||
      !customerDetails.tableNumber
    ) {
      setShowError(true);
      // Scroll to customer details section
      document
        .querySelector(".customer-details")
        .scrollIntoView({ behavior: "smooth" });
      return;
    }
    setShowError(false);
    // Proceed with checkout logic here
    console.log("Proceeding to checkout", { customerDetails, cartItems });
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="logo-container">
          <img src={logo} alt="Restaurant Logo" className="cart-logo" />
        </div>
        <div className="header-content">
          <h2>Your Cart</h2>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
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

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="start-shopping">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
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
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
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
              <span>${total.toFixed(2)}</span>
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
