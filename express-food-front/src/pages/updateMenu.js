import axios from "axios";
import React from "react";
import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import { getErrorFromBackend } from "../utils";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

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

export default function UpdateFood({ isOpen, onRequestClose, food, token }) {
  //   preventDefault();
  console.log(food);
  const create = async (e) => {
    e.preventDefault();
    try {
      axios.patch(`http://localhost:5000/api/food/update/${food._id}`, food, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Navigate("/menu");
    } catch (error) {
      console.log(getErrorFromBackend(error));
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    if (event.target.type === "checkbox") {
      const value = parseInt(event.target.value);
      console.log(value);
      //   setBackendData((values) => ({ ...values, [name]: value }));
    } else {
      const value = event.target.value;
      //   setBackendData((values) => ({ ...values, [name]: value }));
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h1>Modifier le produit: </h1>
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
    </Modal>
  );
}
