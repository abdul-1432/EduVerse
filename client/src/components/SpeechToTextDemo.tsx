import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from '../state/auth'

export function SpeechToTextDemo() {
  const [enabled, setEnabled] = useState(false)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const SpeechRecognition: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  const recognition = useMemo(() => (SpeechRecognition ? new SpeechRecognition() : null), [SpeechRecognition])

  useEffect(() => {
    if (!recognition) return
    recognition.lang = 'en-US'
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript
      setTranscript(text)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
  }, [recognition])

  function start() {
    if (!enabled || !recognition) return
    setTranscript('')
    setListening(true)
    recognition.start()
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} /> Enable speech-to-text
      </label>
      <button disabled={!enabled || !recognition || listening} onClick={start}>
        {listening ? 'Listening…' : 'Start Speaking'}
      </button>
      {transcript && <div>Heard: {transcript}</div>}
    </div>
  )
}
