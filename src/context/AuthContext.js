import React, { useState, createContext } from 'react'

export const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const valueContext = { user, login, logout }

  return <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
}
