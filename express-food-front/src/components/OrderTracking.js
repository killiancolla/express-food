export default function OrderTracking() {
  return (
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
            <li>En cours de préparation</li>
            <li>En cours de livraison</li>
            <li>Livrée</li>
          </ul>
          {"Code de validation"}
        </div>
      </div>
    </div>
  );
}
