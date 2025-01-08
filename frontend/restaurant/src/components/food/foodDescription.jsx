import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./foodDescription.css";

function FoodDescription() {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // TODO: Replace with actual API call
    setFood({
      id: foodId,
      name: "Margherita Pizza",
      price: 12.99,
      description: "Fresh tomatoes, mozzarella, and basil",
      longDescription:
        "Our classic Margherita Pizza features a thin, crispy crust topped with fresh San Marzano tomatoes, buffalo mozzarella, fresh basil leaves, and a drizzle of extra virgin olive oil. Made in traditional Neapolitan style.",
      image: "path_to_image",
    });
  }, [foodId]);

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="food-description-container">
      <div className="food-description-content">
        <img src={food.image} alt={food.name} className="food-detail-image" />
        <div className="food-info">
          <h1>{food.name}</h1>
          <p className="price">${food.price}</p>
          <p className="description">{food.longDescription}</p>
          <div className="action-buttons">
            <button onClick={() => addToCart(food)} className="add-to-cart-btn">
              Add to Cart
            </button>
            <Link to="/foods" className="back-btn">
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDescription;
