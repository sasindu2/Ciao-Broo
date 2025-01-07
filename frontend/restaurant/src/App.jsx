import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodList from "./components/food/foodList";
import CartPage from "./components/cart/cartpage";
import Categories from "./components/Categories";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/foods" element={<FoodList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
