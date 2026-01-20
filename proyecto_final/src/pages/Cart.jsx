import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    total,
    addToCart,
    removeFromCart,
    clearCart
  } = useCart();

  const { token } = useUser();
  const navigate = useNavigate();

  const [mensajeExito, setMensajeExito] = useState("");

  const restarCantidad = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id);
    } else {
      removeFromCart(item.id);
      addToCart({ ...item, quantity: item.quantity - 1 });
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      alert("Debes iniciar sesión para pagar");
      navigate("/login");
      return;
    }

    try {
      setMensajeExito("Compra realizada con éxito!");
      clearCart();
    } catch (error) {
      console.error("Error al pagar:", error);
      alert("Error al pagar");
    }
  };

  useEffect(() => {
    if (mensajeExito) {
      const timer = setTimeout(() => setMensajeExito(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [mensajeExito]);

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h4 className="mb-4"> Tu pedido</h4>

      {mensajeExito && (
        <div className="alert alert-success">{mensajeExito}</div>
      )}

      {cartItems.length === 0 && (
        <p>No tienes cafés en el carrito</p>
      )}

      {cartItems.map((item) => (
        <div key={item.id} className="d-flex align-items-center mb-3">
          {item.img && (
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
          )}

          <div className="ms-3 flex-grow-1">
            <div className="fw-bold">{item.title}</div>
            <div>${item.price.toLocaleString()}</div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => restarCantidad(item)}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => addToCart(item)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <hr />

      <h5>Total: ${total.toLocaleString()}</h5>

      <button
        className="btn btn-dark mt-3 w-100"
        onClick={handleCheckout}
        disabled={!token || cartItems.length === 0}
      >
        Pagar
      </button>

      {!token && (
        <p className="text-danger mt-2">
          Debes iniciar sesión para pagar!.
        </p>
      )}
    </div>
  );
};

export default Cart;
