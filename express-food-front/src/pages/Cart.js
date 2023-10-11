import "../style/Cart.css";
import { useCart } from "../components/CartContext";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {

  const navigate = useNavigate();

  // Recuperation info panier & user 
  const { state, dispatch } = useCart();
  const { cart, userInfo } = state;
  const [total, setTotal] = useState(0);
  const [fdp, setFdp] = useState(0);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_FOOD', id });
  };

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

      if (orderData.code < 10) {
        orderData.code = "0" + orderData.code
      }

      const response = await axios.post('http://localhost:5000/api/order', orderData);

      console.log('Order created:', response.data);
      clearCart()
      navigate("/account")
      toast.success('Votre commande à bien été enregistrée !')
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
    if (newTotal >= 19) {
      setFdp(0)
    } else if (newTotal == 0) {
      setFdp(0)
    } else {
      setFdp(2.99)
    }
  }, [state]);

  return (
    <span id="cart">
      <div className="grid-2">
        <div className="listCart">
          {cart.length > 0 ? (
            cart.map((plat, index) => (
              <div className="glassMorph" key={index}>
                <img src={plat.image} alt={plat.name} />
                <div className="flexRow">
                  <h2 onClick={() => { console.log(state); }}>{plat.name}</h2>
                  <span>{plat.price} €</span>
                </div>
                <div className="input-container">
                  <input
                    value={plat.nb}
                    min={1}
                    type="number"
                    onChange={(e) => {
                      if (e.target.value >= 1 && e.target.value < 1000) {
                        const nb = parseInt(e.target.value, 10);
                        dispatch({ type: 'UPDATE_NB', id: plat._id, nb });
                      }
                    }}
                  />
                  <i onClick={() => removeItemFromCart(plat._id)} class="ri-delete-bin-line"></i>
                </div>
                <hr></hr>
              </div>
            ))
          ) : (
            <p>Votre panier est vide.</p>
          )}
        </div>
        <div className="resumeCart">
          <div>Produits<span>{total} €</span></div>
          <div>Livraison<span>{fdp} €</span></div>
          <hr></hr>
          <div style={{ fontWeight: "bold" }}>Total<span>{Math.round((total + fdp) * 100) / 100} €</span></div>
          <button onClick={handleOrder}>Valider ma commande</button>
        </div>
      </div>
    </span >
  );
}