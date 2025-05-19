import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AppContext } from "./AppContext";

const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const loadCreditsData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });
      if (data.success) {
        setCredit(data.credits);
        // setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeBackground = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const { data } = await axios.post(
        backendUrl + "/api/image/remove-background",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to remove background");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const fetchUserData = useCallback(async () => {
    const { data } = await axios.get(backendUrl + "/api/user/fetch-user", {
      headers: { token },
    });
    if (data.success) {
      setUser(data.user);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    if (token) {
      if (!user) {
        fetchUserData();
        loadCreditsData();
      }
    }
  }, [token, loadCreditsData, fetchUserData, user]);

  const value = {
    token,
    setToken,
    user,
    setUser,
    credit,
    setCredit,
    loadCreditsData,
    backendUrl,
    generateImage,
    removeBackground,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
