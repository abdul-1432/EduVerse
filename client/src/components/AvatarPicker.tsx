import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from '../state/auth'

export function AvatarPicker() {
  const { user, setUser, token } = useAuth() as any
  const [selected, setSelected] = useState(user?.avatar || 'avatar-1')
  const [saving, setSaving] = useState(false)
  const avatars = useMemo(() => ['avatar-1','avatar-2','avatar-3','avatar-4'], [])

  useEffect(() => {
    setSelected(user?.avatar || 'avatar-1')
  }, [user?.avatar])

  async function save() {
    if (!user || !token) return
    try {
      setSaving(true)
      const { user: updated } = await api.updateProfile(token, { avatar: selected })
      setUser(updated)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="avatar-picker">
      {avatars.map(a => (
        <button
          key={a}
          className={selected === a ? 'avatar selected' : 'avatar'}
          onClick={() => setSelected(a)}
        >{a.replace('avatar-','Avatar ')}</button>
      ))}
      <button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Avatar'}</button>
    </div>
  )
}
