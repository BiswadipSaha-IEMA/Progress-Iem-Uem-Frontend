import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(false);
    const [userRegister, setUserRegister] = useState(false);
    const [userData, setUserData] = useState(null);
    const [registeredUserData, setRegisteredUserData] = useState(null);
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedUserData = await sessionStorage.getItem('user');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
                setUserLogin(true);
            }
        };
        checkLoginStatus();
    }, []);

    const register= async(user)=>{
        setRegisteredUserData(user)
        setUserRegister(true)
        await sessionStorage.setItem('registered', JSON.stringify(user))
    }

    const login = async (user) => {
        setUserData(user);
        setUserLogin(true);
        await sessionStorage.setItem('user', JSON.stringify(user));
    };

    const logout = async () => {
        setUserData(null);
        setUserLogin(false);
        await sessionStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ userData, userLogin, userRegister, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
