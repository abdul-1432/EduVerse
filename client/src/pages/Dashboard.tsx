import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AvatarPicker } from '../components/AvatarPicker'
import { useAuth } from '../state/auth'

export function Dashboard() {
  const { user } = useAuth()
  const [time, setTime] = useState<string>('')
  useEffect(() => { setTime(new Date().toLocaleString()) }, [])

  return (
    <div className="page">
      <div className="hero card padded fade-in">
        <h1 className="title">Welcome {user ? user.displayName : 'to EduVerse'}</h1>
        <p className="subtitle">Build your avatar, complete quests, earn XP, and climb the leaderboard.</p>
        {user ? (
          <div style={{display:'flex',gap:12,alignItems:'center',marginTop:12}}>
            <AvatarPicker />
            <Link className="button emerald" to="/quests">Start a Quest</Link>
          </div>
        ) : (
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <Link className="button ghost" to="/login">Login</Link>
            <Link className="button" to="/register">Register</Link>
          </div>
        )}
        <small className="muted">Local time: {time}</small>
      </div>
    </div>
  )
}
