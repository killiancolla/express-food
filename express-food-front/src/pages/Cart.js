import "../style/Cart.css";
import { useCart } from "../components/CartContext";
import { useEffect, useState } from "react";

export default function Cart() {

  // Fonctions du panier
  const { state, dispatch } = useCart();
  console.log(state);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_FOOD', item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_FOOD', id });
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    state.cart.forEach(element => {
      for (let i = 0; i < element.nb; i++) {
        newTotal += element.price;
      }
    });
    setTotal(Math.round(newTotal * 100) / 100);
  }, [state]);

  return (
    <span id="cart">
      <div className="grid-3">
        {state.cart.length > 0 ? (
          state.cart.map((plat, index) => (
            <div className="glassMorph" key={index}>
              <h2 onClick={() => { console.log(state); }}>{plat.name}</h2>
              <img src={plat.image} alt={plat.name} />
              <span>{plat.price * plat.nb}€</span>
              <div className="input-container">
                <input
                  value={plat.nb}
                  min={1}
                  type="number"
                  onChange={(e) => {
                    if (e.target.value >= 1) {
                      const nb = parseInt(e.target.value, 10);
                      dispatch({ type: 'UPDATE_NB', id: plat._id, nb });
                    }
                  }}
                />
                <i onClick={() => removeItemFromCart(plat._id)} class="ri-delete-bin-line"></i>
              </div>
            </div>
          ))
        ) : (
          <p>Votre panier est vide.</p>
        )}
      </div>
      <div>Total : <span>{total}€</span></div>
      <button>Valider ma commande</button>
    </span>
  );
}