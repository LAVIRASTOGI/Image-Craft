import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import PropTypes from "prop-types";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
