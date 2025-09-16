import axios from 'axios'

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000'

export const http = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } })

export const api = {
  async register(payload: { email: string; password: string; displayName: string; avatar?: string }) {
    const { data } = await http.post('/api/auth/register', payload)
    return data
  },
  async login(payload: { email: string; password: string }) {
    const { data } = await http.post('/api/auth/login', payload)
    return data
  },
  async me(token: string) {
    const { data } = await http.get('/api/user/me', { headers: { Authorization: `Bearer ${token}` } })
    return data
  },
  async quizzes(params?: any) {
    const { data } = await http.get('/api/quiz', { params })
    return data
  },
  async quiz(id: string) {
    const { data } = await http.get(`/api/quiz/${id}`)
    return data
  },
  async submit(token: string, quizId: string, answers: number[]) {
    const { data } = await http.post('/api/quiz/submit', { quizId, answers }, { headers: { Authorization: `Bearer ${token}` } })
    return data
  },
  async updateAccessibility(token: string, body: any) {
    const { data } = await http.patch('/api/user/settings/accessibility', body, { headers: { Authorization: `Bearer ${token}` } })
    return data
  },
  async updateProfile(token: string, body: any) {
    const { data } = await http.patch('/api/user/profile', body, { headers: { Authorization: `Bearer ${token}` } })
    return data
  },
  async leaderboard() {
    const { data } = await http.get('/api/leaderboard')
    return data
  },
  async summary(token: string) {
    const { data } = await http.get('/api/user/summary', { headers: { Authorization: `Bearer ${token}` } })
    return data
  }
}
