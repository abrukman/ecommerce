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
        console.log(username, admin);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, admin}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);