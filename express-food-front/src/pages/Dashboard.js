import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useCart } from "../components/CartContext";
import { getErrorFromBackend } from "./../utils";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import DataChart from "../components/ChartNbOrder";
import ProfitChart from "../components/ChartProfitOrder";
import ChartMenu from "../components/ChartMenu";
import Modal from "react-modal";
import UpdateFood from "./updateMenu";

Modal.setAppElement("#root");

export default function Dashboard() {
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("home");
  const [food, setFood] = useState([]);
  const [user, setUser] = useState([]);
  const [deliver, setDeliver] = useState([]);

  const [isModalUserOpen, setModalUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isLivreurUser, setIsLivreurUser] = useState(false);

  const [order, setOrder] = useState([]);
  const { state } = useCart();
  const { userInfo } = state;
  const token = userInfo.token;
  const [last7Days, setLast7Days] = useState([]);
  const [ordersNb, setOrdersNb] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [nbPlats, setNbPlat] = useState(0);
  const [nbDessert, setNbDessert] = useState(0);
  const navigate = useNavigate();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "65%",
      height: "80%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "hide",
    },
  };

  function openModal(foodId) {
    setSelectedFoodId(foodId);
  }

  function closeModal() {
    setSelectedFoodId(null);
  }
  const selectedFood = food.find((f) => f._id === selectedFoodId);

  function deleteRow(id, table) {
    const list = async () => {
      await axios.delete(`http://localhost:5000/api/${table}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (table === "user") {
        setUser(user.filter((user) => user._id !== id));
      } else if (table === "food") {
        setFood(food.filter((food) => food._id !== id));
      } else if (table === "order") {
        setOrder(order.filter((order) => order._id !== id));
      }
    };
    list();
  }

  const openUserModal = (user) => {
    setSelectedUser(user);
    setModalUserOpen(true);
  };

  const closeUserModal = () => {
    setModalUserOpen(false);
  };

  const handleSaveUserUpdate = async () => {
    const isDeliver = deliver.find((d) => d.user_id === selectedUser._id);

    if (!isDeliver && isLivreurUser) {
      // Ajouter en tant que livreur
      try {
        const response = await axios.post(
          "http://localhost:5000/api/deliverer/add",
          {
            user_id: selectedUser._id,
          }
        );
        setDeliver([...deliver, response.data]);
      } catch (error) {
        console.error("Erreur lors de l'ajout du livreur", error);
      }
    } else if (isDeliver && !isLivreurUser) {
      // Supprimer en tant que livreur
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/deliverer/delete`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
            data: { id: isDeliver._id },
          }
        );
        setDeliver(deliver.filter((d) => d.user_id !== selectedUser._id));
      } catch (error) {
        console.error("Erreur lors de la suppression du livreur", error);
      }
    }

    if (selectedUser.is_admin == 0 && isAdminUser) {
      // Ajouter en tant qu'admin
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/user/update/${selectedUser._id}`,
          { is_admin: 1 },
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        setUser(
          user.map((u) =>
            u._id === selectedUser._id ? { ...u, is_admin: 1 } : u
          )
        );
        setSelectedUser({ ...selectedUser, is_admin: 1 });
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'admin", error);
      }
    } else if (selectedUser.is_admin == 1 && !isAdminUser) {
      // Supprimer en tant qu'admin
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/user/update/${selectedUser._id}`,
          { is_admin: 0 },
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        setUser(
          user.map((u) =>
            u._id === selectedUser._id ? { ...u, is_admin: 0 } : u
          )
        );
        setSelectedUser({ ...selectedUser, is_admin: 0 });
      } catch (error) {
        console.error("Erreur lors de la suppression de l'admin", error);
      }
    }
  };

  useEffect(() => {
    const list = async () => {
      const response = await axios.get("http://localhost:5000/api/food", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFood(response.data);
    };
    list();
  }, [token]);

  useEffect(() => {
    const listUser = async () => {
      const response = await axios.get("http://localhost:5000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      try {
        setUser(response.data);
      } catch (error) {
        console.error(getErrorFromBackend(error));
      }
    };
    listUser();
  }, [token]);

  useEffect(() => {
    const listDeliver = async () => {
      const response = await axios.get("http://localhost:5000/api/deliverer/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      try {
        setDeliver(response.data);
      } catch (error) {
        console.error(getErrorFromBackend(error));
      }
    };
    listDeliver();
  }, [token]);

  useEffect(() => {
    const listOrder = async () => {
      const response = await axios.get("http://localhost:5000/api/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      try {
        setOrder(response.data);
      } catch (error) {
        console.error(getErrorFromBackend(error));
      }
    };
    listOrder();
  }, [token]);

  useEffect(() => {
    const last7DaysArray = [];
    const ordersNbArray = [];
    const currentDate = new Date();
    const totalOrders = [];
    let plat = 0;
    let dessert = 0;

    const foodOrdered = order.map((o) => o.products);
    foodOrdered.map((f) => {
      return f.map((fo) => {
        const thisFood = food.find((food) => food._id === fo.foodId);
        return thisFood && thisFood.is_dessert === 1
          ? (dessert += fo.quantity)
          : (plat += fo.quantity);
      });
    });
    for (let i = 0; i < 7; i++) {
      const previousDate = new Date();
      previousDate.setDate(currentDate.getDate() - i);
      last7DaysArray.push(previousDate.toISOString().slice(0, 10));
    }

    last7DaysArray.sort().map((day) => {
      const nbOrder = order.filter((o) => o.order_start.startsWith(day));
      let total = 0;
      nbOrder.map((o) => {
        return (total += o.price);
      });
      totalOrders.push(total);
      return ordersNbArray.push(nbOrder.length);
    });

    setLast7Days(last7DaysArray);
    setOrdersNb(ordersNbArray);
    setTotalOrders(totalOrders);
    setNbPlat(plat);
    setNbDessert(dessert);
  }, [order, food]);

  return (
    <div>
      <h1>Dashboard</h1>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="customers" title="Customers">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user
                // .filter((user) => user.is_admin === 0)
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.firstname}</td>
                    <td>{user.mail}</td>
                    <td>{user.is_admin === 1 ? "ADMIN" : "CLIENT"}</td>
                    <td>
                      <i
                        onClick={() => openUserModal(user)}
                        className="ri-edit-line"
                      ></i>
                      <i
                        onClick={(e) => deleteRow(user._id, "user")}
                        className="ri-delete-bin-7-fill"
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="delivers" title="Delivers">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliver.length > 0 &&
                deliver.map((d, index) => {
                  const thisDeliver = user.find((u) => u._id === d.user_id);
                  if (thisDeliver) {
                    return (
                      <tr key={index}>
                        <td>{d._id}</td>
                        <td>{thisDeliver.name}</td>
                        <td>{thisDeliver.firstname}</td>
                        <td>{thisDeliver.mail}</td>
                        <td>
                          {d.status === "6523f3231cfc63a841e73698"
                            ? "Non disponible"
                            : d.status === "6523f32a1cfc63a841e7369a"
                            ? "Disponible"
                            : "En livraison"}
                        </td>
                        <td>
                          <i className="ri-edit-line"></i>
                          <i
                            onClick={(e) => deleteRow(user._id, "user")}
                            className="ri-delete-bin-7-fill"
                          ></i>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="food" title="Food">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Plats</h2>

            <Link to="/newMenu">
              <Button variant="success">Ajouter un plat</Button>
            </Link>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Plat</th>
                <th>Origine</th>
                <th>Description</th>
                <th>Categorie</th>
                <th>Prix</th>
                <th>Nb vente</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {food
                .filter((food) => food.is_dessert === 0)
                .map((food, index) => (
                  <tr key={index}>
                    <td>{food._id}</td>
                    <td>
                      <img
                        style={{ width: "60px" }}
                        src={food.image}
                        alt="imagefood"
                      />
                      {food.name}
                    </td>
                    <td>{food.origins}</td>
                    <td>{food.description}</td>
                    <td>{food.category}</td>
                    <td>{food.price}€</td>
                    <td>N/A</td>
                    <td>
                      <i
                        onClick={() => openModal(food._id)}
                        className="ri-edit-line"
                      ></i>
                      <i
                        onClick={(e) => deleteRow(food._id, "food")}
                        className="ri-delete-bin-7-fill"
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <h2>Desserts</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Plat</th>
                <th>Origine</th>
                <th>Description</th>
                <th>Categorie</th>
                <th>Prix</th>
                <th>Nb vente</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {food
                .filter((food) => food.is_dessert === 1)
                .map((food, index) => (
                  <tr key={index}>
                    <td>{food._id}</td>
                    <td>
                      <img
                        style={{ width: "60px" }}
                        src={food.image}
                        alt="imagefooooood"
                      />
                      {food.name}
                    </td>
                    <td>{food.origins}</td>
                    <td>{food.description}</td>
                    <td>{food.category}</td>
                    <td>{food.price}€</td>
                    <td>N/A</td>
                    <td>
                      <i
                        onClick={() => openModal(food._id)}
                        className="ri-edit-line"
                      ></i>
                      <i
                        onClick={(e) => deleteRow(food._id, "food")}
                        className="ri-delete-bin-7-fill"
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Livreur</th>
                <th>Statut</th>
                <th>Produits</th>
                <th>Code</th>
                <th>Total</th>
                <th>Demande de la commande</th>
                <th>Commande livrée</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.map((order, index) => {
                const thisCustomer = user.find((u) => u._id === order.customer);
                const thisDeliver = user.find((u) => u._id === order.delivers);
                const status =
                  order.status === "6523fc62641daa40634124d7"
                    ? "Préparation de votre commande"
                    : order.status === "6523fc6b641daa40634124d9"
                    ? "Votre livreur est en route"
                    : "Livrée";
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    {thisCustomer !== undefined ? (
                      <td title={order.customer}>{thisCustomer.username}</td>
                    ) : (
                      <td>Client supprimé</td>
                    )}
                    {thisDeliver !== undefined ? (
                      <td title={order.delivers}>{thisDeliver.username}</td>
                    ) : (
                      <td>Non attribué</td>
                    )}
                    <td>{status}</td>
                    <td>
                      {order.products.map((product, index) => {
                        const thisProduct = food.find(
                          (f) => f._id === product.foodId
                        );
                        return (
                          <>
                            {thisProduct !== undefined && thisProduct.name && (
                              <span key={index}>{thisProduct.name} </span>
                            )}
                          </>
                        );
                      })}
                    </td>
                    <td>{order.code}</td>
                    <td>{order.price}€</td>
                    <td>{order.order_start}</td>
                    <td>{order.order_end}</td>
                    <td>
                      <i
                        onClick={(e) => deleteRow(order._id, "order")}
                        className="ri-delete-bin-7-fill"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="stats" title="Statistiques">
          <div style={{ display: "flex" }}>
            <DataChart days={last7Days} orders={ordersNb} />
            <ProfitChart days={last7Days} orders={totalOrders} />
            <ChartMenu plat={nbPlats} dessert={nbDessert} />
          </div>
        </Tab>
      </Tabs>

      <UpdateFood
        isOpen={selectedFoodId !== null}
        onRequestClose={closeModal}
        food={selectedFood}
        token={token}
      />

      <Modal
        isOpen={isModalUserOpen}
        onRequestClose={closeUserModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Edit User</h2>
        {selectedUser && (
          <div>
            <p>ID: {selectedUser._id}</p>
            <p>Username: {selectedUser.username}</p>
            <input
              type="checkbox"
              defaultChecked={selectedUser.is_admin == 1}
              onChange={(e) => setIsAdminUser(e.target.checked)}
            />
            <label>Admin</label>

            <input
              type="checkbox"
              defaultChecked={
                !!deliver.find((d) => d.user_id === selectedUser._id)
              }
              onChange={(e) => setIsLivreurUser(e.target.checked)}
            />
            <label>Livreur</label>
          </div>
        )}
        <button onClick={handleSaveUserUpdate}>Enregistrer</button>
        <button onClick={closeUserModal}>Fermer</button>
      </Modal>
    </div>
  );
}
