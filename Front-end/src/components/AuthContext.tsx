import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true'
    })

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem('isAuthenticated', 'true')
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('jwt_token')
    }
    

    return (
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}