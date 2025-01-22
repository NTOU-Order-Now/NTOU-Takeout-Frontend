import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [googleId, setGoogleId] = useState(null);
    const [gmail, setGmail] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    // login by google
    const loginWithGoogle = async () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.debug("Google login success: ", result);
        } catch (error) {
            console.error("Google login error: ", error);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await signOut(auth);
            setCurrentUser(null);
            setToken(null);
            setGoogleId(null);
            setGmail(null);
            setAvatarUrl(null);
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    useEffect(() => {
        console.debug("AuthProvider mounted");
        return onAuthStateChanged(auth, (user) => {
            console.debug("Auth state changed: ", user);
            if (user) {
                setCurrentUser(user);
                setGoogleId(user.uid);
                setCurrentUser(user);
                setGmail(user.email);
                setAvatarUrl(user.photoURL);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
            }
            setIsLoading(false);
        });
    }, []);

    const value = {
        currentUser,
        isLoading,
        token,
        googleId,
        gmail,
        avatarUrl,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
