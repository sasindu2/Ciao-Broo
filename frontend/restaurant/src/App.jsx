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
import { useEffect } from "react";

function App() {


  // Load Google Translate script with only English and Italian
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Default language is English
          includedLanguages: "en,it", // Restrict to English and Italian
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
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
