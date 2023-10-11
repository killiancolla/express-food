import "../style/Account.css";
import Profile from "../components/Profile";
import OrderTracking from "../components/OrderTracking";
import OrderDetail from "../components/OrderDetail";
import { useCart } from "../components/CartContext";
import { useState } from "react";
import UserInfos from "../components/UserInfos";

export default function Account() {
  const { state, dispatch } = useCart();
  const { userInfo, deliveryAddress } = state;
  const [isClicked, setIsClicked] = useState(true);

  return (
    <span id="account">
      <section className="my-5">
        <div className="container">
          <div className="main-body">
            <div className="row">
              {/* profile */}
              <Profile
                userInfo={userInfo}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
              />
              {!isClicked ? (
                <div className="col-lg-8">
                  {/* suivi de commande */}
                  <OrderTracking />
                  <div className="card mt-4">
                    {/* detail de commande*/}
                    <OrderDetail />
                  </div>
                </div>
              ) : (
                <div className="col-lg-8">
                  {/* user infos */}
                  <UserInfos
                    userInfo={userInfo}
                    dispatch={dispatch}
                    deliveryAddress={deliveryAddress}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </span>
  );
}
