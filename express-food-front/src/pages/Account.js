import "../style/Account.css";
import Profile from "../components/Profile";
import OrderTracking from "../components/OrderTracking";
import OrderDetail from "../components/OrderDetail";
import { useCart } from "../components/CartContext";
import { useEffect, useState } from "react";
import UserInfos from "../components/UserInfos";
import axios from "axios";

export default function Account() {
  const { state, dispatch } = useCart();
  const { userInfo, deliveryAddress } = state;
  const [isClicked, setIsClicked] = useState(true);
  // const [orderUser, setOrderUser] = useState("");
  const [userLastOrder, setUserLastOrder] = useState("");

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userOders = await axios.get(
        `http://localhost:5000/api/order/user/${userInfo._id}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      // const deliver = await axios.get(`http://localhost:5000/api/deliverer/`);

      // console.log(userOders.data, orderStatus.data, food.data, deliver.data);
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
      // setOrderUser(orders);
      // console.log(orders);
      const orderSort = orders.sort(
        (a, b) => new Date(b.order_start) - new Date(a.order_start)
      );

      const lastOrder = orderSort[orderSort.length - 1];
      setUserLastOrder(lastOrder);
      // console.log(lastOrder);
    };
    fetchUserOrders();
  }, []);

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
                  <OrderTracking order={userLastOrder} />
                  <div className="card mt-4">
                    {/* detail de commande*/}
                    <OrderDetail order={userLastOrder} />
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
