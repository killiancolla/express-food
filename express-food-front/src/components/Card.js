import "../style/Card.css";
import { useCart } from "./CartContext";
import { useState } from "react";

export default function Card({ data }) {

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {

    addItemToCart(data);

    setButtonClicked(true);

    setTimeout(() => {
      setButtonClicked(false);
    }, 2000);
  };

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
        <button 
      className={`card__add ${buttonClicked ? 'card__add--clicked' : ''}`} 
      onClick={handleClick}
    >
      {buttonClicked ? '✔' : '+'}
    </button>
      </div>
    </article>
  )
}