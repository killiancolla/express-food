import { useState } from 'react';
import { Row, Form, Button } from "react-bootstrap";
import Maps from '../components/Maps.js';
import "../style/delivery.css";

export default function Delivery() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <span id="delivery">
      <Maps destination={{ latitude: 48.85, longitude: 2.3856721 }} />

      <Form className="form-confirm mt-5 mb-5" noValidate validated={validated}>
        <Row className="mb-3">
          <Form.Group controlId="validationCustom01">
            <Form.Label>Code de la commande</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="00"
              maxLength={2}
              className="input-confirm"
            />
          </Form.Group>
        </Row>
        <Button type="button" onClick={handleSubmit}>Confirmer</Button>
      </Form>
    </span>
  );
}
