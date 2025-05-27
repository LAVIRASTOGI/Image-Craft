import { AppContext } from "../context/AppContext";
import { useContext, useEffect, startTransition } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Use startTransition to avoid UI suspension on redirect
      startTransition(() => {
        navigate("/login");
      });
    }
  }, [token, navigate]);

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
