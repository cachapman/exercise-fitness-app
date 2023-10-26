import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedUserRoute = () => {
  // Get logged-in user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo;

  // If authorized user, continue to Outlet; otherwise redirect to login
  return (
    user ? <Outlet /> : <Navigate to="/" replace />
  )
};

export default ProtectedUserRoute;