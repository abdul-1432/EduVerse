import React from 'react'

export function BadgeList({ badges }: { badges: string[] }) {
  if (!badges?.length) return null
  return (
    <div className="badges">
      {badges.map((b, i) => (
        <span className="badge" key={i}>{b}</span>
      ))}
    </div>
  )
}
