import "../style/Account.css";
import Profile from "../components/Profile";
import OrderTracking from "../components/OrderTracking";
import OrderDetail from "../components/OrderDetail";
import { useCart } from "../components/CartContext";
import { useEffect, useState } from "react";
import { useInterval } from "../utils";
import UserInfos from "../components/UserInfos";
import axios from "axios";

export default function Account() {
  const { state, dispatch } = useCart();
  const { userInfo, deliveryAddress } = state;
  const [isClicked, setIsClicked] = useState(true);
  const [userLastOrder, setUserLastOrder] = useState("");

  useEffect(() => {
    fetchUserOrders();
  }, [userInfo]);

  useInterval(() => {
    fetchUserOrders();
  }, 10000);

  const fetchUserOrders = async () => {
    const userOders = await axios.get(
      `http://localhost:5000/api/order/user/${userInfo._id}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    const orders = await Promise.all(
      userOders.data.map(async (order) => {
        const orderStatus = await axios.get(
          `http://localhost:5000/api/order_status/${order.status}`
        );

        const products = order.products.map(async (product) => {
          const food = await axios.get(
            `http://localhost:5000/api/food/${product.foodId}`
          );
          return {
            foodQuantity: product.quantity,
            foodName: food.data.name,
            foodPrice: food.data.price,
            foodImage: food.data.image,
          };
        });
        return {
          _id: order._id,
          orderStatus: orderStatus.data.name,
          products: await Promise.all(products),
          orderCode: order.code,
          orderDate: order.order_start,
          orderPrice: order.price,
        };
      })
    );
    const orderSort = orders.sort(
      (a, b) => new Date(b.order_start) - new Date(a.order_start)
    );

    const lastOrder = orderSort[orderSort.length - 1];
    setUserLastOrder(lastOrder);
  };

  return (
    <span id="account">
      <section className="my-5">
        <div className="container">
          <div className="main-body">
            <div className="row">
              <Profile
                userInfo={userInfo}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
              />
              {!isClicked ? (
                <div className="col-lg-8">
                  <OrderTracking order={userLastOrder} />
                  <div className="card mt-4">
                    <OrderDetail order={userLastOrder} />
                  </div>
                </div>
              ) : (
                <div className="col-lg-8">
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
