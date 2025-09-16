import React, { useState } from 'react'
import { useAuth } from '../state/auth'

export function Register() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('avatar-1')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setError(null)
      await register(email, password, displayName, avatar)
      window.location.href = '/'
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="page auth">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Display name" value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <select value={avatar} onChange={e => setAvatar(e.target.value)}>
          <option value="avatar-1">Avatar 1</option>
          <option value="avatar-2">Avatar 2</option>
          <option value="avatar-3">Avatar 3</option>
        </select>
        {error && <div className="error">{error}</div>}
        <button className="button emerald" type="submit">Create account</button>
      </form>
    </div>
  )
}
