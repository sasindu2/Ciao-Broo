import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./foodList.css";

import logo from "../../assets/3d@4x.png";
// import { useCart } from "../../context/CartContext";
import axios from "axios";
import useCartStore from "../../store/store";

function FoodList() {
  // const { categoryId } = useParams();
  const { id, name } = useParams();
  const [foods, setFoods] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  // const { cartItems, addToCart } = useCart();

  const addToCart = useCartStore((state) => state.addToCart);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryName(name);
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/Food/${id}`
        );
        setFoods(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [id]);

  const handleAddToCart = (food) => {
    // _id: "677e385dd3a1f0d35e692fbb"
    // category: "677cf988b141581ce03d9737"
    // description: "description"
    // image: "https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg"
    // name: "test"
    // price: "12"

    addToCart({
      id: food._id,
      name: food.name,
      image: food.image,
      price: food.price,
      qty: 1,
    });
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
            View Cart ({itemCount})
          </Link>
        </div>
      </div>

      <div className="food-grid">
        {foods.map((food) => (
          <div key={food._id} className="food-card">
            <img src={food.image} alt={food.name} className="food-image" />
            <div className="food-details">
              <h3 className="food-name">{food.name}</h3>
              {/* <p className="food-description">{food.description}</p> */}
              <div className="food-card-footer">
                <span className="food-price">${food.price}</span>
                <div className="button-group">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(food)}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/foodDescription/${food._id}`}
                    state={food} 
                    className="view-btn"
                  >
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
