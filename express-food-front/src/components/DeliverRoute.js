import { Navigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

export default function DeliverRoute({ children }) {
  const { state } = useCart();
  const { userInfo } = state;
  return (userInfo && userInfo.is_deliverer) ||
    (userInfo && userInfo.is_admin) ? (
    children
  ) : (
    <Navigate to="/auth" />
  );
}
