import "../style/Card.css";
import { useCart } from "./CartContext";

export default function Card({ data }) {

  // Fonctions du panier
  const { state, dispatch } = useCart();

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_FOOD', item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_FOOD', id });
  };

  return (
    <article className="card">
      <img className="card__image" src={data.image} alt={data.image} />
      <div className="card__data">
        <div className="card__info">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
        <h3 className="card__price">{data.price}€</h3>
        <button onClick={() => {addItemToCart(data)}} className="card__add">+</button>
      </div>
    </article>
  )
}