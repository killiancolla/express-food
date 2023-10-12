import { Navigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

export default function AdminRoute({ children }) {
  const { state } = useCart();
  const { userInfo } = state;
  return userInfo && userInfo.is_admin === 1 ? (
    children
  ) : (
    <Navigate to="/auth" />
  );
}
