export default function OrderDetail() {
  return (
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
              {/* <!-- Image du produit --> */}
              <img
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt="product"
                width="80"
              />
            </th>
            <td>Salade de fruit - Les fruits</td>
            <td>6,50 € x 2</td>
            <td>
              <strong>13 €</strong>
            </td>
            <td>
              <span className="badge badge-warning">PRÉPARATION</span>
            </td>
          </tr>
          <tr>
            <th colSpan="2">
              <span>Statut :</span>
              <span className="badge badge-success status-badge">PAYÉ</span>
            </th>
            <td>
              <span className="text-muted">Prix de votre commande :</span>
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
  );
}
