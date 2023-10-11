import "../style/Cart.css";
import { useCart } from "../components/CartContext";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';

export default function Cart() {

  // Recuperation info utilisateur 
  // const { userState, dispatch: ctxDispatch } = useContext(Store);
  // const { userInfo } = userState;

  // Fonctions du panier
  const { state, dispatch } = useCart();
  const { cart, userInfo } = state;

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_FOOD', item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_FOOD', id });
  };

  const [total, setTotal] = useState(0);

  const handleOrder = async () => {
    try {
      const products = cart.map(item => ({
        foodId: item._id,
        quantity: item.nb
      }));
      const orderData = {
        customer: userInfo._id, // id utilisateur
        products,
        code: Math.floor(Math.random() * 99 + 1).toString() // Numero aléatoire entre 1 et 99
      };

      if(orderData.code < 10) {
        orderData.code = "0" + orderData.code
      }

      const response = await axios.post('http://localhost:5000/api/order', orderData);
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {
    let newTotal = 0;
    cart.forEach(element => {
      for (let i = 0; i < element.nb; i++) {
        newTotal += element.price;
      }
    });
    setTotal(Math.round(newTotal * 100) / 100);
  }, [state]);

  return (
    <span id="cart">
      <div className="grid-3">
        {cart.length > 0 ? (
          cart.map((plat, index) => (
            <div className="glassMorph" key={index}>
              <h2 onClick={() => { console.log(state); }}>{plat.name}</h2>
              <img src={plat.image} alt={plat.name} />
              <span>{plat.price}€ * {plat.nb}</span>
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
      <button onClick={handleOrder}>Valider ma commande</button>
    </span>
  );
}