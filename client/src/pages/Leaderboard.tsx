import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'

export function Leaderboard() {
  const [rows, setRows] = useState<any[]>([])
  useEffect(() => { api.leaderboard().then(({ leaderboard }) => setRows(leaderboard)) }, [])
  return (
    <div className="page">
      <h2>Leaderboard</h2>
      {rows.length === 0 ? <p className="muted">No data yet.</p> : (
        <ol style={{listStyle:'none', padding:0}}>
          {rows.map((u, i) => (
            <li key={u._id || i} className="card padded" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <span className="badge gold" style={{minWidth:28,textAlign:'center'}}>{i+1}</span>
                <strong>{u.displayName}</strong>
              </div>
              <span className="muted">{u.xp} XP</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
