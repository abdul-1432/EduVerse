import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

export function Quests() {
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [group, setGroup] = useState<string>('')
  const [subgroup, setSubgroup] = useState<string>('')
  const [difficulty, setDifficulty] = useState<string>('')

  useEffect(() => { fetchQuizzes() }, [group, subgroup, difficulty])

  async function fetchQuizzes() {
    const params: any = {}
    if (group) params.group = group
    if (subgroup) params.subgroup = subgroup
    if (difficulty) params.difficulty = difficulty
    const { quizzes } = await api.quizzes(params)
    setQuizzes(quizzes)
  }

  const groups = [
    { value: '', label: 'All groups' },
    { value: 'Schooling', label: 'Schooling (Class 1-10)' },
    { value: 'HighSchool', label: 'High School (Class 11-12)' },
    { value: 'Graduates', label: 'Graduates' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Medic', label: 'Medic' },
    { value: 'General', label: 'General (Aptitude)' },
  ]

  const subgroupMap: Record<string, string[]> = {
    Schooling: ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10'],
    HighSchool: ['Class 11','Class 12'],
    Engineering: ['CSE', 'ECE', 'EEE', 'MEC'],
    Medic: ['B-Pharma', 'D-Pharma', 'MBBS'],
    General: ['Aptitude']
  }
  const subgroups = group && subgroupMap[group] ? subgroupMap[group] : []

  return (
    <div className="page">
      <h2>Quests</h2>

      <div className="card padded" style={{display:'grid',gap:12,gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))'}}>
        <select value={group} onChange={e => { setGroup(e.target.value); setSubgroup('') }}>
          {groups.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select>
        <select value={subgroup} onChange={e => setSubgroup(e.target.value)} disabled={!subgroups.length}>
          <option value="">{subgroups.length ? 'Select subgroup' : 'No subgroup'}</option>
          {subgroups.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="">All difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="button ghost" onClick={() => { setGroup(''); setSubgroup(''); setDifficulty('') }}>Reset</button>
      </div>

      <ul style={{listStyle:'none', padding:0, marginTop:12}}>
        {quizzes.map(q => (
          <li key={q._id}>
            <div className="quest fade-in">
              <div>
                <strong style={{fontSize:'1.1rem'}}>{q.title}</strong>
                <div className="muted">{q.description}</div>
                <div className="muted">{q.group}{q.subgroup ? ` • ${q.subgroup}` : ''} {q.difficulty ? ` • ${q.difficulty}` : ''}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span className="ribbon"><span className="dot" /> <span className="badge gold">+{q.xpReward} XP</span></span>
                {q.badgeReward && <span className="badge">{q.badgeReward}</span>}
                <Link className="button" to={`/quiz/${q._id}`}>Start</Link>
              </div>
            </div>
          </li>
        ))}
        {quizzes.length === 0 && <li className="muted" style={{padding:8}}>No quests found for selected filters.</li>}
      </ul>
    </div>
  )
}
