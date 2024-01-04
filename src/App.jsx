// import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import { CartProvider } from "./CartProvider/CartProvider";
import { Cart } from "./Components/Cart/Cart";

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          {/* Default */}
          <Route path="/*" element={<Navigate to={"/login"} />}></Route>

          {/* Private */}
          <Route path="/home" element={<PrivateRoute />} />

          {/* cart */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
