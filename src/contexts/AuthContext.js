import React, { useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
const axios = require("axios");
const AuthContext = React.createContext();
const usersBackendUrl = require("../utils").usersBackendUrl;

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(() => {
        try {
            let item = window.sessionStorage.getItem("user");
            if (window.localStorage.getItem("user")) {
                item = window.localStorage.getItem("user");
            }
            console.log(item);
            return item;
        } catch (error) {
            return null;
        }
    });
    
    const [loading, setLoading] = useState(false);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function loginWithGoogle() {
        setLoading(true);
        auth.signInWithPopup(googleProvider).then((res,err) => {
            try {
                setLoading(false);
                axios({
                    method: "post",
                    url: usersBackendUrl,
                    data: { email: res.user.email },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                return res;
            } catch (error) {
                setLoading(false);
                return null;
            }
        });
    }

    useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        loginWithGoogle,
        loading,
        setLoading
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}