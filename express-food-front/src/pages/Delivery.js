import React, { useState, useEffect } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import axios from 'axios';
import * as utils from "../utils";
import { useCart } from "../components/CartContext";
import Maps from '../components/Maps.js';
import "../style/delivery.css";

export default function Delivery() {
  const { state } = useCart();
  const { userInfo } = state;

  return (
    <span id="delivery">
      {userInfo.is_deliverer === 1 ? (
        <Deliverer userInfo={userInfo} />
      ) : (
        <Waiter userInfo={userInfo} />
      )}
    </span>
  );
}

function Waiter({ userInfo }) {
  const token = userInfo.token;
  const [orders, setOrders] = useState([]);
  const [deliverers, setDeliverers] = useState([]);

  useEffect(() => {
    getOrders();
    getDeliverers();
  }, []);

  utils.useInterval(() => {
    getOrders();
    getDeliverers();
  }, 10000);

  const getOrders = async () => {
    let allOrders = await axios.get("http://localhost:5000/api/order");
    allOrders = allOrders.data.filter((element) => element.status === utils.orderStart._id);

    const orders = await Promise.all(
      allOrders.map(async (order) => {
        const products = order.products.map(async (product) => {
          const food = await axios.get(`http://localhost:5000/api/food/${product.foodId}`);
          return {
            quantity: product.quantity,
            name: food.data.name
          };
        });
        return {
          _id: order._id,
          products: await Promise.all(products),
          start: order.order_start,
          price: order.price
        };
      })
    );
    setOrders(orders);
  };

  const getDeliverers = () => {
    const getUsers = (deliverersData) => {
      setDeliverers([]);
      let i = 0;
      deliverersData.forEach(delivererData => {
        i++;
        axios
          .get(`http://localhost:5000/api/user/${delivererData.user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((res) => {
            let datas = {
              _id: res.data._id,
              delivererId: delivererData._id,
              firstname: res.data.firstname,
              name: res.data.name
            }
            if (i === 1) {
              setDeliverers([res.data]);
            } else {
              setDeliverers([...deliverers, res.data]);
            }
          })
          .catch((err) => {
            console.error("Failed to fetch user:", err);
          });
      });
    }
    axios
      .get("http://localhost:5000/api/deliverer", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        getUsers(res.data.filter((element) => element.status == utils.delivererVailable._id));
      })
      .catch((err) => {
        console.error("Failed to fetch deliverers:", err);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let orderId = e.target.id
    let delivererId = e.target[0].value;
    try {
      await axios.patch(`http://localhost:5000/api/order/update/${orderId}`, {
        delivers: delivererId,
        status: utils.orderShipped._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await axios.patch(`http://localhost:5000/api/deliverer/${delivererId}`, {
        status_id: utils.delivererDelivery._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <span className="waiterman">
      <h2>Liste des commandes</h2>
      <br />
      {orders.length > 0 ? (
        orders.map((data, index) => (
          <span key={index}>
            <form onSubmit={handleSubmit} id={data._id}>
              <div className="header">
                <div>
                  {new Date(data.start).toLocaleString(
                    "fr-FR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </div>
                <div>{data.price} €</div>
              </div>
              <ul>
                {data.products.map((product, idx) => (
                  <li key={idx}>
                    <span>{product.quantity} x {product.name}</span>
                  </li>
                ))}
              </ul>
              <div>
                <label>Livreur :</label>
                <select required>
                  {deliverers.length > 0 ? (
                    deliverers.map((data, index) => (
                      <option key={index} value={data.delivererId}>{data.firstname} {data.name}</option>
                    ))
                  ) : (
                    <option value="">Aucun livreur est disponible</option>
                  )}
                </select>
              </div>
              <Button type="submit">Envoyer en livraison</Button>
            </form>
            <br /><br />
          </span>
        ))
      ) : (
        <>
          <span>Aucune commande est à préparer</span>
        </>
      )
      }
    </span >
  );
}


function Deliverer({ userInfo }) {
  const token = userInfo.token;
  const [delivererData, setDelivererData] = useState(false);
  const [order, setOrder] = useState({});
  const [code, setCode] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/deliverer/user/${userInfo._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setDelivererData(res.data[0]);
        getOrder(res.data[0]._id);
      })
      .catch((err) => {
        console.error("Failed to fetch deliverer:", err);
      });
  }, []);

  utils.useInterval(() => {
    getOrder(delivererData._id);
  }, 5000);

  const getOrder = (id) => {
    axios
      .get(`http://localhost:5000/api/order/deliverer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setOrder(res.data.filter((element) => element.status === utils.orderShipped._id)[0]);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setCode(value);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`http://localhost:5000/api/order/code/${order._id}`, {
        orderCode: code
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!data.data.success) {
        return toast.warning("Mauvais code de validation");
      }
      await axios.patch(`http://localhost:5000/api/order/update/${order._id}`, {
        status: utils.orderDelivred._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await axios.patch(`http://localhost:5000/api/deliverer/${delivererData._id}`, {
        status: utils.delivererVailable._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return toast.success("Livraison validée");
    } catch (error) {
      toast.error(utils.getErrorFromBackend(error));
    }
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    const value = e.nativeEvent.submitter.value;
    try {
      let newStatus = utils.delivererUnvailable._id;
      if (value === "start") {
        newStatus = utils.delivererVailable._id;
      } else if (value !== "end") {
        return toast.error("Échec du changement de votre statut");
      }

      await axios.patch(`http://localhost:5000/api/deliverer/${delivererData._id}`, {
        status_id: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      axios
        .get(`http://localhost:5000/api/deliverer/user/${userInfo._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          setDelivererData(res.data[0]);
          setOrder({});
        })
        .catch((err) => {
          console.error("Failed to fetch deliverer:", err);
        });
    } catch (error) {
      toast.error(utils.getErrorFromBackend(error));
    }
  };

  return (
    <>
      {order !== undefined && order.address !== undefined ? (
        <span className="deliveryman-started">
          <Maps destination={{ latitude: order.address.latitude, longitude: order.address.longitude }} />

          <Form className="form-confirm mt-5 mb-5" noValidate onSubmit={handleSubmitOrder}>
            <Row className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Code de la commande</Form.Label>
                <Form.Control
                  className="input-confirm"
                  type="text"
                  name="code"
                  placeholder="00"
                  pattern="/\d{2}/"
                  maxLength={2}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Button type="submit">Confirmer</Button>
          </Form>
        </span>
      ) : (
        <span className="deliveryman-waiting">
          {delivererData.status === "6523f3231cfc63a841e73698" ? (
            <div>Vous n'avez pas commencez votre service</div>
          ) : (
            <div>Vous n'avez pas encore de commande</div>
          )}

          <Form className="mt-5 mb-5 form" noValidate onSubmit={handleSubmitStatus}>
            <div>
              {delivererData.status === "6523f3231cfc63a841e73698" ? (
                <Button type="submit" value="start">Commencer le service</Button>
              ) : (
                <Button type="submit" value="end">Arrêter le service</Button>
              )}
            </div>
          </Form>
        </span>
      )}
    </>
  );
}
