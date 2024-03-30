import React, { useState, createContext } from 'react'
import { loginUser } from '../api/register'

export const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (userData) => {
    const response = await loginUser(userData)
    if (response === 'Usuario o contraseña incorrecta') return response
    setUser(response)
  }

  const logout = () => {
    setUser(null)
  }

  const valueContext = { user, login, logout }

  return <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
}
