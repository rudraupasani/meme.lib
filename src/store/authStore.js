import { create } from 'zustand'

const DEFAULT_ADMIN = {
  email: 'r@meme.com',
  password: 'admin@meme.com',
}

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  adminEmail: null,

  login: (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      set({ isLoggedIn: true, adminEmail: email })
      localStorage.setItem('admin_logged_in', 'true')
      localStorage.setItem('admin_email', email)
      return true
    }
    return false
  },

  logout: () => {
    set({ isLoggedIn: false, adminEmail: null })
    localStorage.removeItem('admin_logged_in')
    localStorage.removeItem('admin_email')
  },

  checkAuth: () => {
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true'
    const adminEmail = localStorage.getItem('admin_email')
    if (isLoggedIn && adminEmail) {
      set({ isLoggedIn: true, adminEmail })
    }
  },
}))
