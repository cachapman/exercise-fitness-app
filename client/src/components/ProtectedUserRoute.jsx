import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedUserRoute = () => {
  // Get logged in authorized user information
  const { userInfo } = useSelector((state) => state.auth);

  // If authorized user, continue to Outlet; otherwise redirect to login
  return (
    userInfo ? <Outlet /> : <Navigate to="/login" replace />
  )
};

export default ProtectedUserRoute;