import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodList from "./components/food/foodList";
import CartPage from "./components/cart/cartPage";
import Categories from "./components/Categories";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/foods" element={<FoodList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
