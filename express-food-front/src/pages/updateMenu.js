import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

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
  const [backendData, setBackendData] = useState([]);
  const navigate = useNavigate();
  console.log(food);

  const update = async (e) => {
    e.preventDefault();
    try {
      axios.patch(
        `http://localhost:5000/api/food/update/${food._id}`,
        backendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onRequestClose();
      navigate("/menu");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    if (event.target.type === "checkbox") {
      let value = 0;
      if (event.target.checked) value = 1;
      setBackendData((values) => ({ ...values, [name]: value }));
    } else {
      const value = event.target.value;
      setBackendData((values) => ({ ...values, [name]: value }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {food !== undefined && (
        <>
          <h1>Modifier le produit: {food.name}</h1>
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
                  defaultValue={food.name}
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
                  defaultValue={food.image}
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
                  defaultValue={food.origins}
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
                    defaultValue={food.category}
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
                    defaultValue={food.price}
                  />
                  <Form.Text className="text-muted">Sous forme "**€"</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Présent sur la carte"
                    name="flag"
                    onChange={handleChange}
                    defaultChecked={food.flag == 1}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Dessert"
                    name="is_dessert"
                    onChange={handleChange}
                    defaultChecked={food.is_dessert == 1}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Végétarien"
                    name="is_vegetarian"
                    onChange={handleChange}
                    defaultChecked={food.is_vegetarian == 1}
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
                  defaultValue={food.description}
                />
              </Form.Group>
              <Button onClick={update} variant="primary" type="button">
                Submit
              </Button>
            </Form>
          </div>
        </>
      )}
    </Modal>
  );
}
