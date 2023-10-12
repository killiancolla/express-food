import "../style/Cart.css";
import { useCart } from "../components/CartContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const navigate = useNavigate();

  // Recuperation info panier & user
  const { state, dispatch } = useCart();
  const { cart, userInfo } = state;
  const [total, setTotal] = useState(0);
  const [fdp, setFdp] = useState(0);

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: "REMOVE_FOOD", id });
  };

  const handleOrder = async () => {
    if (!userInfo) {
      navigate("/auth");
      return;
    } else if (cart.length < 1) {
      toast.warning("Votre panier est vide");
      return;
    } else if (!coordinates) {
      toast.warning("Veuillez entrer votre adresse");
    }

    try {
      const products = cart.map((item) => ({
        foodId: item._id,
        quantity: item.nb,
      }));
      const orderData = {
        customer: userInfo._id, // id utilisateur
        address: coordinates,
        price: Math.round((total + fdp) * 100) / 100,
        products,
        code: Math.floor(Math.random() * 99 + 1).toString(), // Numero aléatoire entre 1 et 99
      };

      if (orderData.code < 10) {
        orderData.code = "0" + orderData.code;
      }

      const response = await axios.post(
        "http://localhost:5000/api/order",
        orderData
      );

      console.log("Order created:", response.data);
      clearCart();
      navigate("/account");
      toast.success("Votre commande à bien été enregistrée !");
      return;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    let newTotal = 0;
    cart.forEach((element) => {
      for (let i = 0; i < element.nb; i++) {
        newTotal += element.price;
      }
    });
    setTotal(Math.round(newTotal * 100) / 100);
    if (newTotal >= 19) {
      setFdp(0);
    } else if (newTotal == 0) {
      setFdp(0);
    } else {
      setFdp(2.99);
    }
  }, [state]);

  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );

      if (response.data.length > 0) {
        const location = response.data[0];
        setCoordinates({
          longitude: location.lon,
          latitude: location.lat,
        });
        toast.success("Votre adresse a bien été mise à jour");
        return;
      } else {
        toast.warning("Adresse non trouvée");
        return;
      }
    } catch (error) {
      console.error("Une erreur s’est produite:", error);
    }
  };

  return (
    <span id="cart">
      <div className="grid-2">
        <div className="listCart">
          {cart.length > 0 ? (
            cart.map((plat, index) => (
              <div className="glassMorph" key={index}>
                <img src={plat.image} alt={plat.name} />
                <div className="flexRow">
                  <h2
                    onClick={() => {
                      console.log(state);
                    }}
                  >
                    {plat.name}
                  </h2>
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
                        dispatch({ type: "UPDATE_NB", id: plat._id, nb });
                      }
                    }}
                  />
                  <i
                    onClick={() => removeItemFromCart(plat._id)}
                    className="ri-delete-bin-line"
                  ></i>
                </div>
                <hr></hr>
              </div>
            ))
          ) : (
            <p className="empty">Votre panier est vide.</p>
          )}
        </div>
        <div className="resumeCart">
          <div>
            Produits<span>{total} €</span>
          </div>
          <div>
            Livraison<span>{fdp} €</span>
          </div>
          <hr></hr>
          <div style={{ fontWeight: "bold" }}>
            Total<span>{Math.round((total + fdp) * 100) / 100} €</span>
          </div>
          <div>
            <input
              type="text"
              className="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Entrez une adresse"
            />
            <button className="validate" onClick={fetchCoordinates}>
              <i className="ri-check-line"></i>
            </button>
          </div>
          <button className="command" onClick={handleOrder}>
            Valider ma commande
          </button>
        </div>
      </div>
    </span>
  );
}
