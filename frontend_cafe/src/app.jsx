import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./scr/pages/login";
import Registro from "./pages/register";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
