import React from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Quests } from './pages/Quests'
import { Quiz } from './pages/Quiz'
import { Leaderboard } from './pages/Leaderboard'
import { Landing } from './pages/Landing'
import { Profile } from './pages/Profile'
import { useAuth } from './state/auth'
import { AccessibilityToggle } from './components/AccessibilityToggle'

function Nav() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <nav className="nav">
      <Link className="brand" to="/">EduVerse</Link>
      <div className="spacer" />
      <Link to="/">Home</Link>
      <Link to="/app">App</Link>
      <Link to="/quests">Quests</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <AccessibilityToggle />
      {user ? (
        <>
          <span className="user">{user.displayName} • XP {user.xp}</span>
          <Link className="button ghost" to="/profile">Profile</Link>
          <button className="button ghost" onClick={() => { logout(); nav('/login') }}>Logout</button>
        </>
      ) : (
        <>
          <Link className="button ghost" to="/login">Login</Link>
          <Link className="button" to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quests" element={<PrivateRoute><Quests /></PrivateRoute>} />
        <Route path="/quiz/:id" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </div>
  )
}
