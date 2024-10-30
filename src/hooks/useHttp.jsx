import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagePopUp from "../utils/Popup/FormPopUp/ManagePopUp";



const mainURL = "http://192.168.1.176:5000";
// const mainURL = "http://localhost:5000";

// const mainURL = "http://192.168.90.24:8080";
// const mainURL = "http://localhost:8080";


const ErrorHandleContext = createContext();

export const useErrorHandle = () => useContext(ErrorHandleContext);

export const usePostReq = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showErrorPopUp } = useErrorHandle();

  const postReq = async (url, body, token) => {
    try {
      setLoading(true);
      console.log("====================================");
      console.log(url, body, token);
      console.log("====================================");
      const response = await fetch(`${mainURL}/${url}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          navigate("/login", { replace: true });
          sessionStorage.clear();
          throw new Error("Unauthorized Access");
        }
        showErrorPopUp(data.message);
        throw new Error(data.message || "Error Occurred");
      }
      return data;
    } catch (error) {
      showErrorPopUp(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [postReq, { error, loading }];
};

export const useGetReq = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showErrorPopUp } = useErrorHandle();

  const getReq = async (url, token) => {
    try {
      setLoading(true);
      const response = await fetch(`${mainURL}/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          navigate("/login", { replace: true });
          sessionStorage.clear();
          throw new Error("Unauthorized Access");
        }
        showErrorPopUp(data.message);
        throw new Error(data.message || "Error Occurred");
      }
      return data;
    } catch (error) {
      showErrorPopUp(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [getReq, { error, loading }];
};

export const useDeleteReq = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showErrorPopUp } = useErrorHandle();

  const deleteReq = async (url, token) => {
    try {
      setLoading(true);
      const response = await fetch(`${mainURL}/${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          navigate("/login", { replace: true });
          sessionStorage.clear();
          throw new Error("Unauthorized Access");
        }
        showErrorPopUp(data.message);
        throw new Error(data.message || "Error Occurred");
      }
      return data;
    } catch (error) {
      showErrorPopUp(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [deleteReq, { error, loading }];
};

export const usePatchReq = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showErrorPopUp } = useErrorHandle();

  const patchReq = async (url, body, token) => {
    try {
      setLoading(true);
      const response = await fetch(`${mainURL}/${url}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          navigate("/", { replace: true });
          sessionStorage.clear();
          throw new Error("Unauthorized Access");
        }
        showErrorPopUp(data.message);
        throw new Error(data.message || "Error Occurred");
      }
      return data;
    } catch (error) {
      showErrorPopUp(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [patchReq, { error, loading }];
};

export const usePutReq = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showErrorPopUp } = useErrorHandle();

  const putReq = async (url, body, token) => {
    try {
      setLoading(true);
      const response = await fetch(`${mainURL}/${url}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          navigate("/", { replace: true });
          sessionStorage.clear();
          throw new Error("Unauthorized Access");
        }
        showErrorPopUp(data.message);
        throw new Error(data.message || "Error Occurred");
      }
      return data;
    } catch (error) {
      showErrorPopUp(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [putReq, { error, loading }];
};

export const ErrorPopupProvider = ({ children }) => {
  const [popupMessage, setPopupMessage] = useState(null);

  const showErrorPopUp = (message) => {
    setPopupMessage(message);
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <ErrorHandleContext.Provider value={{ showErrorPopUp }}>
      {children}
      {popupMessage && (
        <ManagePopUp
          takeData={popupMessage}
          setUtilFor={"error"}
          setPopupShow={closePopup}
        />
      )}
    </ErrorHandleContext.Provider>
  );
};
