import { Link } from "react-router-dom";
import "../style/Account.css";
export default function Account() {
  return (
    <span id="account">
      <section className="my-5">
        <div className="container">
          <div className="main-body">
            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        alt="Admin"
                        className="rounded-circle p-1 bg-warning"
                        width="110"
                      />
                      <div className="mt-3">
                        <h4>
                          {"Prénom"} {"Nom"}
                        </h4>
                        <p className="text-secondary mb-1">{"Adresse mail"}</p>
                        <p className="text-muted font-size-sm">
                          {"Adresse par défaut"}
                        </p>
                      </div>
                    </div>
                    <div className="list-group list-group-flush text-center mt-4">
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action border-0"
                      >
                        Vos informations
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action border-0 active"
                      >
                        Votre commande
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action border-0"
                      >
                        Vos adresses
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="top-status">
                      <h5>Suivi de commande</h5>
                      <ul className="timeline">
                        <li className="active">
                          <img alt="svg" src="order.svg" />
                        </li>
                        <li className="active">
                          <img alt="svg" src="order.svg" />
                        </li>
                        <li className="active">
                          <img alt="svg" src="order.svg" />
                        </li>
                      </ul>
                      <ul className="timeline-text">
                        <li>
                          En cours de préparation
                        </li>
                        <li>
                          En cours de livraison
                        </li>
                        <li>
                          Livrée
                        </li>
                      </ul>
                      {"Code de validation"}
                    </div>
                  </div>
                </div>
                <div className="card mt-4">
                  <div className="card-body p-0 table-responsive">
                    <h4 className="p-3 mb-0">Détails de commande</h4>
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th scope="col" colSpan="2">
                            Plats/Desserts
                          </th>
                          <th scope="col">Quantité</th>
                          <th scope="col">Montant</th>
                          <th scope="col">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar6.png"
                              alt="product"
                              width="80"
                            />
                            {/* <!-- Image du produit --> */}
                          </th>
                          <td>Salade de fruit - Les fruits</td>
                          <td>6,50 € x 2</td>
                          <td>
                            <strong>13 €</strong>
                          </td>
                          <td>
                            <span className="badge badge-warning">PRÉPARATION</span>
                          </td>
                          {/* <td><span className="badge badge-warning">EN ROUTE</span></td> */}
                          {/* <td><span className="badge badge-success">LIVRÉE</span></td> */}
                        </tr>
                        <tr>
                          <th colSpan="2">
                            <span>Statut :</span>
                            <span className="badge badge-success status-badge">PAYÉ</span>
                          </th>
                          <td>
                            <span className="text-muted">
                              Prix de votre commande :
                            </span>
                            <br />
                            <strong>13,00 €</strong>
                          </td>
                          <td>
                            <span className="text-muted">Frais de livraison :</span>
                            <br />
                            <strong>2,00 €</strong>
                          </td>
                          <td>
                            <span className="text-muted">Prix total :</span>
                            <br />
                            <strong>15,00 €</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </span>
  );
}
