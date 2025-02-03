import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  return authToken ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
