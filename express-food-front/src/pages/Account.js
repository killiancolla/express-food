import { Link } from "react-router-dom";
import "../style/Account.css";
export default function Account() {
  return (
    <span id="account">
      <section class="my-5">
        <div class="container">
          <div class="main-body">
            <div class="row">
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        alt="Admin"
                        class="rounded-circle p-1 bg-warning"
                        width="110"
                      />
                      <div class="mt-3">
                        <h4>
                          {"Prénom"} {"Nom"}
                        </h4>
                        <p class="text-secondary mb-1">{"Adresse mail"}</p>
                        <p class="text-muted font-size-sm">
                          {"Adresse par défaut"}
                        </p>
                      </div>
                    </div>
                    <div class="list-group list-group-flush text-center mt-4">
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action border-0"
                      >
                        Vos informations
                      </Link>
                      <Link
                        href="#"
                        className="list-group-item list-group-item-action border-0 active"
                      >
                        Vos commandes
                      </Link>
                      <Link
                        href="#"
                        className="list-group-item list-group-item-action border-0"
                      >
                        Vos adresses
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="card">
                  <div class="card-body">
                    <div class="top-status">
                      <h5>Historique de commande</h5>
                      <ul>
                        <li class="active">
                          <img alt="svg" src="order.svg" />
                          <span>En cours</span>
                        </li>
                      </ul>
                      {"Code de validation"}
                    </div>
                  </div>
                </div>
                <div class="card mt-4">
                  <div class="card-body p-0 table-responsive">
                    <h4 class="p-3 mb-0">Détails de commande</h4>
                    <table class="table mb-0">
                      <thead>
                        <tr>
                          <th scope="col" colspan="2">
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
                            <span class="badge badge-warning">PRÉPARATION</span>
                          </td>
                          {/* <td><span class="badge badge-warning">EN ROUTE</span></td> 
                                            <td><span class="badge badge-warning">LIVRÉE</span></td>  */}
                        </tr>
                        <tr>
                          <th colspan="2">
                            <span>Statut :</span>
                            <span class="badge badge-success">PAYÉ</span>
                          </th>
                          <td>
                            <span class="text-muted">
                              Prix de votre commande :
                            </span>
                            <br />
                            <strong>13,00 €</strong>
                          </td>
                          <td>
                            <span class="text-muted">Frais de livraison :</span>
                            <br />
                            <strong>2,00 €</strong>
                          </td>
                          <td>
                            <span class="text-muted">Prix total :</span>
                            <br />
                            <strong>15,00 €</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="card mt-4">
                  <div class="card-body">
                    <h4>Timeline</h4>
                    <ul class="timeline">
                      <li class="active">
                        <h6>En cours de préparation</h6>
                        <p class="mb-0 text-muted">
                          Vos plats sont en cours de préparation.
                        </p>
                      </li>
                      <li>
                        <h6>En cours de livraison</h6>
                        <p class="mb-0 text-muted">
                          Notre meilleur livreur est route !
                        </p>
                      </li>
                      <li>
                        <h6>Commande livrée</h6>
                        <p class="mb-0 text-muted">
                          Votre repas vous a été livré.
                        </p>
                      </li>
                    </ul>
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
