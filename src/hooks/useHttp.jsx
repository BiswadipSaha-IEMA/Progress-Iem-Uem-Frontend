import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagePopUp from "../utils/Popup/FormPopUp/ManagePopUp";


const mainURL = "http://192.168.90.24:5000";

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
                    setUtilFor={'error'}
                    setPopupShow={closePopup}
                />
            )}
        </ErrorHandleContext.Provider>
    );
};
