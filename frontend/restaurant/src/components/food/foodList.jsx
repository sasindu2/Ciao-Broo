import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./foodList.css";
import pizzaImage from "../../assets/pizza.jpg";
import logo from "../../assets/3d@4x.png";
import { useCart } from "../../context/CartContext";

function FoodList() {
  const { categoryId } = useParams();
  const [foods, setFoods] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { cartItems, addToCart } = useCart();

  // Dummy data - replace with your API call
  useEffect(() => {
    // Example data
    setCategoryName("Italian Food");
    setFoods([
      {
        id: 1,
        name: "Margherita Pizza",
        price: 12.99,
        description: "Fresh tomatoes, mozzarella, and basil",
        image: pizzaImage,
      },
      {
        id: 2,
        name: "Margherita Pizza",
        price: 15.99,
        description: "Fresh tomatoes, mozzarella, and basil",
        image: pizzaImage,
      },
      {
        id: 3,
        name: "Margherita Pizza",
        price: 10.99,
        description: "Fresh tomatoes, mozzarella, and basil",
        image: pizzaImage,
      },
      // Add more food items...
    ]);
  }, [categoryId]);

  const handleAddToCart = (food) => {
    console.log("Adding to cart:", food); // Debug log
    addToCart(food);
  };

  return (
    <div className="food-list-container">
      <div className="food-list-header">
        <img src={logo} alt="Website Logo" className="site-logo" />
        <div
          className="header-left"
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <h2 className="category-title">{categoryName}</h2>
          <Link to="/cart" className="cart-button">
            <span className="cart-icon">🛒</span>
            View Cart ({cartItems.length})
          </Link>
        </div>
      </div>

      <div className="food-grid">
        {foods.map((food) => (
          <div key={food.id} className="food-card">
            <img src={food.image} alt={food.name} className="food-image" />
            <div className="food-details">
              <h3 className="food-name">{food.name}</h3>
              <p className="food-description">{food.description}</p>
              <div className="food-card-footer">
                <span className="food-price">${food.price}</span>
                <div className="button-group">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(food)}
                  >
                    Add to Cart
                  </button>
                  <Link to={`/food/${food.id}`} className="view-btn">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodList;
