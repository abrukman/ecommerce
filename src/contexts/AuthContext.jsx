import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);

    const login = (username) => {

        const token = `fake-token-${username}`;
        if(username === 'admin@gmail.com'){ //contrasena: test12
            setAdmin(true);
        };
        localStorage.setItem('authToken', token);
        setUser(username);
    };

    const isLoged = () => {
        if (localStorage.authToken == 'fake-token-admin@gmail.com') {
            setAdmin(true);
            setUser(localStorage.authToken);
        } else if (localStorage.length > 0) {
            setUser(localStorage.authToken);
        };
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, admin, isLoged}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);