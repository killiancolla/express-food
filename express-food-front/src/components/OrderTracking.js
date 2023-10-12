export default function OrderTracking({ order }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="top-status">
          <h5>Suivi de commande</h5>
          <ul className="timeline">
            <li
              className={`${order.orderStatus === "Préparation de votre commande"
                ? "active"
                : "valid"
                }`}
            >
              <img alt="svg" src="toque.svg" />
            </li>
            <li
              className={`${order.orderStatus === "Votre livreur est en route"
                ? "active"
                : order.orderStatus === "Livrée"
                  ? "valid"
                  : ""
                }`}
            >
              <img alt="svg" src="bike.svg" />
            </li>
            <li className={`${order.orderStatus === "Livrée" ? "valid" : ""}`}>
              <img alt="svg" src="eat.svg" />
            </li>
          </ul>
          <ul className="timeline-text">
            <li>En cours de préparation</li>
            <li>En cours de livraison</li>
            <li>Livrée</li>
          </ul>
          <br />
          <span style={{ padding: "1rem" }}>
            Code de validation : {order.orderCode}
          </span>
        </div>
      </div>
    </div>
  );
}
