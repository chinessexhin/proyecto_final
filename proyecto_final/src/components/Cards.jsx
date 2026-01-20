import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cards = ({ id, img, title, text, price }) => {
  const { addToCart } = useCart();

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={img} className="card-img-top" alt={title} />

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <p className="card-text fw-bold">${price}</p>

        <div className="d-flex gap-2">
          <button
            onClick={() => addToCart({ id, title, price, img })}
            className="btn btn-dark"
          >
            Añadir ☕
          </button>

          <Link to={`/cafe/${id}`} className="btn btn-outline-primary">
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
