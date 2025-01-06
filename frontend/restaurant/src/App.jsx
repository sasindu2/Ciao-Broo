import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Categories from "./components/Categories";
import FoodList from "./components/food/foodList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/categories" element={<Categories />} />
        <Route path="/foods" element={<FoodList />} />
      </Routes>
    </Router>
  );
}

export default App;
