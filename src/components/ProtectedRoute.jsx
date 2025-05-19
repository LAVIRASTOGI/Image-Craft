import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { backendUrl, token, setUser, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(backendUrl + "/api/user/fetch-user", {
        headers: { token },
      });
      if (data.success) {
        setUser(data.user);
      } else {
        navigate("/login");
      }
    };
    if (token) {
      if (!user) {
        fetchUserData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
