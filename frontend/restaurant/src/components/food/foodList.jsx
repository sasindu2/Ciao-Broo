import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./foodList.css";
import pizzaImage from "../../assets/pizza.jpg";
import logo from "../../assets/3d@4x.png";

function FoodList() {
  const { categoryId } = useParams();
  const [foods, setFoods] = useState([]);
  const [categoryName, setCategoryName] = useState("");

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

      // Add more food items...
    ]);
  }, [categoryId]);

  return (
    <div className="food-list-container">
      <div className="food-list-header">
        <img src={logo} alt="Website Logo" className="site-logo" />
        <div className="header-left">
          <h2 className="category-title">{categoryName}</h2>
          <Link to="/cart" className="cart-button">
            <span className="cart-icon">🛒</span>
            View Cart
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
                  <button className="add-to-cart-btn">Add to Cart</button>
                  <button className="view-btn">View</button>
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
