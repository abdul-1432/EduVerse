import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'

type User = { id: string; email: string; displayName: string; avatar: string; xp: number; badges: string[] }

type AuthContextType = {
  token: string | null
  user: User | null
  setUser: (u: User) => void
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string, avatar?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>(null as any)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [user, setUserState] = useState<User | null>(null)

  useEffect(() => {
    if (!token) return
    api.me(token).then(({ user }) => setUserState(user)).catch(() => setToken(null))
  }, [token])

  async function login(email: string, password: string) {
    const { token, user } = await api.login({ email, password })
    localStorage.setItem('token', token)
    setToken(token)
    setUserState(user)
  }

  async function register(email: string, password: string, displayName: string, avatar?: string) {
    const { token, user } = await api.register({ email, password, displayName, avatar })
    localStorage.setItem('token', token)
    setToken(token)
    setUserState(user)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUserState(null)
  }

  function setUser(u: User) { setUserState(u) }

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
