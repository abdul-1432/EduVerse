import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use correct base path for GitHub Pages project sites so assets resolve under /<repo>/
  // On local dev and non-CI builds, keep base as '/'
  const isProd = mode === 'production'
  let base = '/'
  const repoEnv = process.env.GITHUB_REPOSITORY // e.g., "owner/EduVerse" on GitHub Actions
  if (isProd && repoEnv) {
    const repo = repoEnv.split('/')[1] || ''
    // For user/organization pages (owner.github.io) base should remain '/'
    // For project pages, use '/<repo>/'
    base = repo.endsWith('.github.io') ? '/' : `/${repo}/`
  }

  return {
    base,
    plugins: [react()],
    server: {
      port: 5173,
    },
    build: {
      outDir: 'dist',
    },
  }
})
