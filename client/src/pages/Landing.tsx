import React from 'react'
import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <div className="page">
      <section className="hero card padded fade-in">
        <h1 className="title">Gamified Learning for Everyone</h1>
        <p className="subtitle">Quests, XP, badges, and accessibility built-in. Learn faster. Have fun. Be included.</p>
        <div style={{display:'flex',gap:12,marginTop:12}}>
          <Link className="button emerald" to="/register">Get Started</Link>
          <Link className="button ghost" to="/login">I already have an account</Link>
        </div>
      </section>

      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16,marginTop:16}}>
        <div className="card padded fade-in">
          <h3>Quests & Quizzes</h3>
          <p className="muted">Modular lessons as quests with short quizzes. Earn XP and unlock badges.</p>
        </div>
        <div className="card padded fade-in">
          <h3>Accessibility Mode</h3>
          <p className="muted">Dyslexia-friendly font, high contrast, reduced motion, and speech-to-text support.</p>
        </div>
        <div className="card padded fade-in">
          <h3>Leaderboard</h3>
          <p className="muted">Friendly competition that motivates progress while keeping it inclusive.</p>
        </div>
      </section>

      <section style={{marginTop:20}}>
        <div className="card padded fade-in" style={{overflow:'hidden'}}>
          <h3 style={{marginTop:0}}>How EduVerse Works</h3>
          <div className="muted" style={{marginBottom:8}}>A quick visual walkthrough</div>
          <img src="/ai-landing.svg" alt="EduVerse walkthrough" style={{width:'100%',borderRadius:12,display:'block'}} />
        </div>
      </section>
    </div>
  )
}