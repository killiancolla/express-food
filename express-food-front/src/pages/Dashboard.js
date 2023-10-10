import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function Dashboard() {
  const [key, setKey] = useState("home");
  const [food, setFood] = useState([]);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const list = async () => {
      const response = await axios.get("http://localhost:5000/api/food");
      setFood(response.data);
    };
    list();
  }, []);

  useEffect(() => {
    const listUser = async () => {
      const response = await axios.get("http://localhost:5000/api/user");
      setUser(response.data);
    };
    listUser();
  }, []);

  useEffect(() => {
    const listOrder = async () => {
      const response = await axios.get("http://localhost:5000/api/order");
      setOrder(response.data);
    };
    listOrder();
  }, []);

  console.log(food);
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
                .filter((user) => user.is_admin === 0)
                .map((user, index) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                      <img src="" />
                      {user.name}
                    </td>
                    <td>{user.firstname}</td>
                    <td>{user.mail}</td>
                    <td>{user.is_admin === 1 ? "ADMIN" : "CLIENT"}</td>
                    <td>
                      <button>Modifier</button>
                      <button>Supprimer</button>
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
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user
                .filter((user) => user.is_admin === 0)
                .map((user, index) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                      <img src="" />
                      {user.name}
                    </td>
                    <td>{user.firstname}</td>
                    <td>{user.mail}</td>
                    <td>{user.is_admin === 1 ? "ADMIN" : "CLIENT"}</td>
                    <td>
                      <button>Modifier</button>
                      <button>Supprimer</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="food" title="Food">
          <h2>Plats</h2>
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
                  <tr key={food._id}>
                    <td>{food._id}</td>
                    <td>
                      <img style={{ width: "60px" }} src={food.image} />
                      {food.name}
                    </td>
                    <td>{food.origins}</td>
                    <td>{food.description}</td>
                    <td>{food.category}</td>
                    <td>{food.price}</td>
                    <td>N/A</td>
                    <td>
                      <button>Modifier</button>
                      <button>Supprimer</button>
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
                  <tr key={food._id}>
                    <td>{food._id}</td>
                    <td>
                      <img style={{ width: "60px" }} src={food.image} />
                      {food.name}
                    </td>
                    <td>{food.origins}</td>
                    <td>{food.description}</td>
                    <td>{food.category}</td>
                    <td>{food.price}</td>
                    <td>N/A</td>
                    <td>
                      <button>Modifier</button>
                      <button>Supprimer</button>
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
                <th>Demande de la commande</th>
                <th>Commande livrée</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.map((order, index) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.customer}</td>
                  <td>{order.delivers}</td>
                  <td>{order.status}</td>
                  <td>{order.products}</td>
                  <td>{order.code}</td>
                  <td>{order.order_start}</td>
                  <td>{order.order_end}</td>
                  <td>
                    <button>Modifier</button>
                    <button>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
}
