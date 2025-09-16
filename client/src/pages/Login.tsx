import React, { useState } from 'react'
import { useAuth } from '../state/auth'

export function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setError(null)
      await login(email, password)
      window.location.href = '/'
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="page auth">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
