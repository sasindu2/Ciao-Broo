import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodList from "./components/food/foodList";
import CartPage from "./components/cart/cartPage";
import Categories from "./components/Categories";
import AdminRoutes from "./routes/AdminRoutes";
import FoodDescription from "./components/description/foodDescription";
import Login from "./admin/components/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/foods/:id/:name" element={<FoodList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<Categories />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
          <Route path="/foodDescription/:foodId" element={<FoodDescription />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
