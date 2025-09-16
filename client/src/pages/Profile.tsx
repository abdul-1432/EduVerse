import React, { useEffect, useState } from 'react'
import { useAuth } from '../state/auth'
import { BadgeList } from '../components/BadgeList'
import { api } from '../lib/api'

export function Profile() {
  const { user, token } = useAuth() as any
  const [rank, setRank] = useState<number | null>(null)
  const [recent, setRecent] = useState<any[]>([])

  useEffect(() => {
    if (!token) return
    api.summary(token).then(({ rank, recent }) => { setRank(rank); setRecent(recent) })
  }, [token])

  if (!user) return <div className="page"><p>Please login.</p></div>
  return (
    <div className="page">
      <h2>Profile</h2>
      <div className="card padded" style={{display:'grid',gap:8}}>
        <div><strong>{user.displayName}</strong> • {user.email}</div>
        <div>Avatar: {user.avatar}</div>
        <div>XP: {user.xp} {rank && <span className="badge">Rank #{rank}</span>}</div>
        <BadgeList badges={user.badges} />
      </div>

      <h3 style={{marginTop:16}}>Recent Quests</h3>
      {recent.length === 0 ? <div className="muted">No recent activity.</div> : (
        <ul style={{listStyle:'none',padding:0}}>
          {recent.map(r => (
            <li key={r.id} className="card padded" style={{marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div><strong>{r.quizTitle}</strong> <span className="muted">{r.group}{r.subgroup ? ` • ${r.subgroup}` : ''}{r.difficulty ? ` • ${r.difficulty}` : ''}</span></div>
                <div className="muted">{r.correct}/{r.total} • {r.passed ? 'Passed' : 'Try again'}</div>
              </div>
              <div className="muted">{new Date(r.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
