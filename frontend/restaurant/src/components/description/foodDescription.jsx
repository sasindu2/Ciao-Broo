import React from 'react';
import { ArrowLeft } from 'lucide-react'; 
import './foodDescription.css'; 

function FoodDescription() {
  const product = {
    name: 'Hot Honey Chicken',
    price: '$34',
    description:
      'A dynamic duo of Spicy Nai Miris & mouthwatering Devilled Chicken. Where tradition meets taste! Made with the perfect blend of Mozzarella Cheese and a curated selection of 2 or more luscious toppings.A dynamic duo of Spicy Nai Miris & mouthwatering Devilled Chicken. Where tradition meets taste! Made with the perfect blend of Mozzarella Cheese and a curated selection of 2 or more luscious toppings.',
    image: '/src/assets/hotpizza.png', 
  };

  return (
    <div className="description-container">
      <div className="description-header">
        <ArrowLeft size={24} className="back-icon" />
        <h1 className="description-title">{product.name}</h1>
      </div>
      <div className="description-content">
        <img src={product.image} alt={product.name} className="description-image" />
        <div className="description-details">
          <h2 className="description-price">{product.price}</h2>
          <p className="description-text">{product.description}</p>
          <button className="buy-button">Buy</button>
        </div>
      </div>
    </div>
  );
}

export default FoodDescription;
