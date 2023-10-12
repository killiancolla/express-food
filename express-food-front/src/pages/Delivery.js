import { useState } from 'react';
import { Row, Form, Button } from "react-bootstrap";
import Maps from '../components/Maps.js';
import "../style/delivery.css";
import { getErrorFromBackend } from '../utils.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCart } from "../components/CartContext";

export default function Delivery() {
  const [code, setCode] = useState("");
  const { state, dispatch } = useCart();
  const { userInfo } = state;
  const token = userInfo.token;
  const id = "6526bd0be5b9d7c8d824f331";

  const handleChange = (e) => {
    const value = e.target.value;
    setCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`http://localhost:5000/api/order/code/${id}`, {
        orderCode: code
      });
      if (!data.data.success) {
        return toast.warning("Mauvais code de validation");
      }
      const status = await axios.get(`http://localhost:5000/api/order_status`);
      await axios.patch(`http://localhost:5000/api/order/update/${id}`, {
        status: status.data[2]._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return toast.success("Livraison validée");
    } catch (error) {
      toast.error(getErrorFromBackend(error));
    }
  };

  return (
    <span id="delivery">
      <Maps destination={{ latitude: 48.85, longitude: 2.3856721 }} />

      <Form className="form-confirm mt-5 mb-5" noValidate onSubmit={handleSubmit}>
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
  );
}
