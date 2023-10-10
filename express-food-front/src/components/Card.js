import { useState } from "react";
import "../style/Card.css";
import Modal from "react-modal";
import { useCart } from "./CartContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function Card({ data }) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    console.log("close");
    setIsOpen(false);
  }

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
    dispatch({ type: "ADD_FOOD", item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: "REMOVE_FOOD", id });
  };

  return (
    <article className="card" onClick={openModal}>
      <img className="card__image" src={data.image} alt={data.image} />
      <div className="card__data">
        <div className="card__info">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
        <h3 className="card__price">{data.price}€</h3>
        <button
          className={`card__add ${buttonClicked ? "card__add--clicked" : ""}`}
          onClick={handleClick}
        >
          {buttonClicked ? "✔" : "+"}
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="DetailFood">
          <img src={data.image} alt={data.name} />
          <div>
            <p>{data.is_dessert ? "Dessert" : "Plat"}</p>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{data.name}</h2>
            <p>{data.origins}</p>
            <p>{data.description}</p>
            <div>
              <button>Ajouter au panier</button>
              <button onClick={closeModal}>close</button>
            </div>
          </div>
        </div>
      </Modal>
    </article>
  );
}
