import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Lock, LogIn } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const success = login(email, password)
    if (success) {
      setTimeout(() => navigate('/admin'), 300)
    } else {
      setError('Invalid credentials. Use r@meme.com / admin@meme.com')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 pt-20">
      <motion.div
        className="w-full max-w-md rounded-3xl border border-primary/20 bg-[#090909] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-[#0c0c0c] p-4 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-primary/70 mt-2 uppercase tracking-[0.2em]">Meme Library</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="r@meme.com"
              className="w-full px-4 py-3 rounded-2xl bg-[#111] border border-primary/20 text-white placeholder-primary/40 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-[#111] border border-primary/20 text-white placeholder-primary/40 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {error && (
            <motion.div
              className="rounded-2xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary py-3 font-semibold text-dark shadow-[0_0_30px_rgba(57,255,20,0.15)] hover:bg-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 p-4 rounded-2xl bg-[#0c0c0c] border border-primary/15">
          <p className="text-xs text-primary/60 uppercase tracking-[0.15em] mb-2">Demo Credentials</p>
          <p className="text-sm text-white font-mono">Email: r@meme.com</p>
          <p className="text-sm text-white font-mono">Pass: admin@meme.com</p>
        </div>
      </motion.div>
    </div>
  )
}
