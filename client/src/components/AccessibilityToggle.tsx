import React from 'react'
import { useAccessibility } from '../state/accessibility'

export function AccessibilityToggle() {
  const { settings, setSettings } = useAccessibility()
  return (
    <div className="accessibility">
      <label>
        <input
          type="checkbox"
          checked={settings.dyslexiaFont}
          onChange={e => setSettings({ ...settings, dyslexiaFont: e.target.checked })}
        /> Dyslexia font
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.highContrast}
          onChange={e => setSettings({ ...settings, highContrast: e.target.checked })}
        /> High contrast
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.reducedMotion}
          onChange={e => setSettings({ ...settings, reducedMotion: e.target.checked })}
        /> Reduced motion
      </label>
    </div>
  )
}
