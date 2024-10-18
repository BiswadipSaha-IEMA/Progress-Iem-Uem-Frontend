import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagePopUp from "../utils/Popup/FormPopUp/ManagePopUp";

// Base URL for API calls
const mainURL = "http://192.168.90.24:5000";

const ErrorHandleContext = createContext();

export const useErrorHandle = () => useContext(ErrorHandleContext);

// Hook for making POST requests
export const usePostReq = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showErrorPopUp } = useErrorHandle(); // Correctly destructuring from context

    // Function to make the POST request
    const postReq = async (url, body, token) => {
        try {
            setLoading(true);
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
                    throw new Error("Unauthorized Access");
                }
                showErrorPopUp(data.message);
                throw new Error(data.message || 'Error Occurred');
            }
            return data; // Return the data on success
        } catch (error) {
            showErrorPopUp(error.message);
            throw error; // Propagate the error
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return [postReq, { error, loading }]; // Ensure you return the postReq function and other states
};

// Context provider for error handling
export const ErrorPopupProvider = ({ children }) => {
    const [popupMessage, setPopupMessage] = useState(null);

    // Function to display the error popup
    const showErrorPopUp = (message) => {
        setPopupMessage(message);
    };

    // Function to close the error popup
    const closePopup = () => {
        setPopupMessage(null);
    };

    return (
        <ErrorHandleContext.Provider value={{ showErrorPopUp }}> {/* Providing the function */}
            {children}
            {popupMessage && (
                <ManagePopUp
                    takeData={popupMessage}
                    setUtilFor={'error'}
                    setPopupShow={closePopup}
                />
            )}
        </ErrorHandleContext.Provider>
    );
};
