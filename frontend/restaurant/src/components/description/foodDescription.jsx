import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./foodDescription.css";
import useCartStore from "../../store/store";

function FoodDescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const food = location.state;
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (food) => {

    addToCart({
      id: food._id,
      name: food.name,
      image: food.image,
      price: food.price,
      qty: 1,
    });
    handleBack();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="description-container">
      <div className="description-header">
        <ArrowLeft
          size={24}
          className="back-icon"
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        />
        <h1 className="description-title">{food.name}</h1>
      </div>
      <div className="description-content">
        <img
          src={food.image}
          alt={food.name}
          className="description-image"
        />
        <div className="description-details">
          <h2 className="description-price">€{food.price}</h2>
          <p className="description-text">{food.description}</p>
          <button className="buy-button" onClick={() => handleAddToCart(food)}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default FoodDescription;
