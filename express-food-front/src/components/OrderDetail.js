export default function OrderDetail({ order }) {
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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={index}>
              <th>
                <img src={product.foodImage} alt="product" width="80" />
              </th>
              <td>{product.foodName}</td>
              <td>
                {product.foodPrice} € x {product.foodQuantity}
              </td>
              <td>
                <strong>{product.foodPrice * product.foodQuantity} €</strong>
              </td>
              <td></td>
            </tr>
          ))}

          <tr>
            <th colSpan="2">
              <span>Statut :</span>
              <span className="badge badge-success status-badge">PAYÉ</span>
            </th>
            <td>
              <span className="text-muted">Prix de votre commande :</span>
              <br />
              <strong>{order.orderPrice} €</strong>
            </td>
            <td>
              <span className="text-muted">Frais de livraison :</span>
              <br />
              <strong>{order.orderPrice > 19.99 ? 0.0 : 2.99} €</strong>
            </td>
            <td>
              <span className="text-muted">Prix total :</span>
              <br />
              <strong>
                {order.orderPrice > 19.99 ? order.orderPrice : order.orderPrice}{" "}
                €
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
