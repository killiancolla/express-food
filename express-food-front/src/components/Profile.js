import { Link } from "react-router-dom";

export default function Profile({ userInfo, isClicked, setIsClicked }) {
  return (
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
              <h4>{userInfo?.username}</h4>
            </div>
            <div className="mt-3">
              <h6>
                {userInfo?.firstname} {userInfo?.name}
              </h6>
              <p className="text-secondary mb-1">{userInfo?.mail}</p>
            </div>
          </div>
          <div className="list-group list-group-flush text-center mt-4">
            <Link
              to="#"
              onClick={(e) => setIsClicked(true)}
              className={`list-group-item list-group-item-action border-0 ${isClicked ? "active" : ""}`}
            >
              Vos informations
            </Link>
            <Link
              to="#"
              onClick={(e) => setIsClicked(false)}
              className={`list-group-item list-group-item-action border-0 ${!isClicked ? "active" : ""}`}
            >
              Votre commande
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
