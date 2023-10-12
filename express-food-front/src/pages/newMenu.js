import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { getErrorFromBackend } from "./../utils";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

export default function NewMenu() {
  const [backendData, setBackendData] = useState([]);
  const navigate = useNavigate();
  const { state } = useCart();
  const { userInfo } = state;
  const token = userInfo.token;

  const handleChange = (event) => {
    const name = event.target.name;
    if (event.target.type === "checkbox") {
      const value = parseInt(event.target.value);
      console.log(value);
      setBackendData((values) => ({ ...values, [name]: value }));
    } else {
      const value = event.target.value;
      setBackendData((values) => ({ ...values, [name]: value }));
    }
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(`http://localhost:5000/api/food`, backendData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate("/menu");
        })
        .catch((error) => {
          console.error(error);
          console.log(getErrorFromBackend(error));
        });
    } catch (error) {
      console.log(getErrorFromBackend(error));
      toast.error(getErrorFromBackend(error));
    }
  };

  return (
    <div>
      <h1>Ajouter un nouveau plat</h1>
      <div className="formProduct">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom du Plat</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom du plat"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Url de l'image principale</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image"
              name="image"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Origine du plat</Form.Label>
            <Form.Control
              type="text"
              placeholder="Origine du plat"
              name="origins"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Categorie"
                name="category"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="text"
                placeholder="Prix"
                name="price"
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">Sous forme "**€"</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                value={"on" ? 1 : 0}
                type="checkbox"
                label="Présent sur la carte"
                name="flag"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                value={"on" ? 1 : 0}
                type="checkbox"
                label="Dessert"
                name="is_dessert"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                value={!"on" ? 0 : 1}
                type="checkbox"
                label="Végétarien"
                name="is_vegetarian"
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button onClick={create} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
