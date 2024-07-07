import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/register" />;
};

export default ProtectedRoute;
