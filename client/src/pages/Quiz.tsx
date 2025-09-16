import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../state/auth'

function useSpeechToText(enabled: boolean) {
  const [transcript, setTranscript] = useState<string>('')
  const [listening, setListening] = useState(false)
  const SpeechRecognition: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  const recognition = useMemo(() => (SpeechRecognition ? new SpeechRecognition() : null), [SpeechRecognition])

  useEffect(() => {
    if (!recognition) return
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false
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

  return { transcript, start, listening, supported: !!recognition }
}

export function Quiz() {
  const { id } = useParams()
  const { token } = useAuth()
  const [quiz, setQuiz] = useState<any | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<any | null>(null)
  const [useVoice, setUseVoice] = useState(false)
  const speech = useSpeechToText(useVoice)

  useEffect(() => {
    if (!id) return
    api.quiz(id).then(({ quiz }) => {
      setQuiz(quiz)
      setAnswers(new Array(quiz.questions.length).fill(-1))
    })
  }, [id])

  useEffect(() => {
    if (!quiz || !speech.transcript) return
    // Naive mapping: when transcript contains option index words
    const t = speech.transcript.toLowerCase()
    const optionWords = ['one','two','three','four','five','six','seven','eight','nine','zero']
    const idx = optionWords.findIndex(w => t.includes(w))
    if (idx >= 0 && answers.some(a => a === -1)) {
      const i = answers.findIndex(a => a === -1)
      const next = [...answers]
      next[i] = idx
      setAnswers(next)
    }
  }, [speech.transcript])

  async function submit() {
    if (!token || !quiz) return
    const { correct, total, passed, newXp, badges } = await api.submit(token, quiz._id, answers)
    setResult({ correct, total, passed, newXp, badges })
  }

  if (!quiz) return <div className="page"><p>Loading...</p></div>

  return (
    <div className="page">
      <h2>{quiz.title}</h2>
      <p className="muted">{quiz.description}</p>

      <div className="a11y-voice">
        <label>
          <input type="checkbox" checked={useVoice} onChange={e => setUseVoice(e.target.checked)} />
          Enable speech-to-text answering
        </label>
        {useVoice && (
          <button className="button" disabled={!speech.supported || speech.listening} onClick={speech.start}>
            {speech.listening ? (<span><span className="listening" /> Listening…</span>) : speech.supported ? 'Speak Now' : 'Not supported'}
          </button>
        )}
        {speech.transcript && <div className="muted">Heard: “{speech.transcript}”</div>}
      </div>

      {quiz.questions.map((q: any, i: number) => (
        <div key={i} className="question">
          <div className="qtext">{i + 1}. {q.text}</div>
          <div className="options">
            {q.options.map((opt: string, j: number) => (
              <label key={j} className={answers[i] === j ? 'opt selected' : 'opt'}>
                <input type="radio" name={`q${i}`} checked={answers[i] === j} onChange={() => {
                  const next = [...answers]; next[i] = j; setAnswers(next)
                }} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="button" onClick={submit} disabled={answers.includes(-1)}>Submit</button>

      {result && (
        <div className="result">
          <h3>Result</h3>
          <p>
            Correct {result.correct} / {result.total} • {result.passed ? 'Passed ✅' : 'Try again'}
          </p>
          <p>New XP: {result.newXp}</p>
          {result.badges?.length > 0 && <p>Badges: {result.badges.join(', ')}</p>}
        </div>
      )}
    </div>
  )
}
