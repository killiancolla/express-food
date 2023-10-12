import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorFromBackend } from "./../utils";
import { toast } from "react-toastify";

export default function UserInfos({ userInfo, dispatch, deliveryAddress }) {
  const { Formik } = formik;

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/account";

  const test = async (values) => {
    const updateData = {
      firstname: values.firstname,
      name: values.name,
      username: values.username,
      mail: values.mail,
    };
    const local = {
      country: values.country,
      address: values.address,
      postalCode: values.postalCode,
      city: values.city,
      bte: values.bte,
      phone: values.phone,
    };
    try {
      const data = await axios.patch(
        `http://localhost:5000/api/user/update/${userInfo._id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "USER_SIGNIN", payload: data.data });
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      dispatch({ type: "SAVE_DELIVERY_ADDRESS", payload: local });
      localStorage.setItem("deliveryAddress", JSON.stringify(local));
      toast.success("Information mis à jour");
      navigate(redirect || "/account");
    } catch (error) {
      toast.error(getErrorFromBackend(error));
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5>Informations personnelles</h5>
        <Formik
          onSubmit={(values) => test(values)}
          initialValues={{
            username: userInfo?.username,
            firstname: userInfo?.firstname,
            name: userInfo?.name,
            mail: userInfo?.mail,
            password: "",
            country: deliveryAddress.country,
            address: deliveryAddress.address,
            postalCode: deliveryAddress.postalCode,
            city: deliveryAddress.city,
            bte: deliveryAddress.bte,
            phone: deliveryAddress.phone,
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="Prénom"
                    value={values.firstname}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      name="mail"
                      value={values.mail}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Pseudo</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Pseudo"
                    value={values.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="5">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Téléphone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="5">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Pays</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pays"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Adresse"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Code postal</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Code postal"
                    name="postalCode"
                    value={values.postalCode}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="3">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ville"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>N° batiment</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="N° batiment"
                    name="bte"
                    value={values.bte}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Button type="submit">Enregistré</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
