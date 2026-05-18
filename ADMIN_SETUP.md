# Meme Library Admin Panel Setup

## Admin Access

### Local Login Credentials
- **Email:** `r@meme.com`
- **Password:** `admin@meme.com`

### Admin Panel URL
Navigate to: `http://localhost:5173/admin/login`

## Features

### Admin Login Page
- Simple, secure authentication interface
- Demo credentials displayed for easy access
- Local storage-based session management

### Admin Panel
- **Add Meme:** Create new meme entries with title, category, tags, thumbnail, and video URL
- **Edit Meme:** Update existing meme information
- **Delete Meme:** Remove memes from the collection
- **View All:** Table view of all current memes

## Supabase Integration Setup (Optional)

To connect with Supabase storage for production data:

1. **Create Supabase Project:**
   - Go to https://supabase.com
   - Create a new project
   - Get your API credentials

2. **Configure Environment:**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase URL and Anon Key:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Create Database Tables:**
   - Create a `memes` table in Supabase with columns:
     - id (integer, primary key)
     - title (text)
     - category (text)
     - tags (array or json)
     - thumbnail (text, URL)
     - video (text, URL)
     - created_at (timestamp)

## File Structure

```
src/
├── pages/
│   ├── AdminLogin.jsx      # Login page
│   └── AdminPanel.jsx      # Main admin interface
├── components/
│   └── ProtectedRoute.jsx  # Auth wrapper
├── store/
│   └── authStore.js        # Zustand auth state
└── lib/
    └── supabase.js         # Supabase client config
```

## How It Works

1. **Authentication:**
   - Uses local storage for session persistence
   - Checks credentials against hardcoded admin account
   - Auto-restores session on page reload

2. **Data Management:**
   - Currently uses in-memory state (resets on refresh)
   - Ready to integrate with Supabase for persistence
   - Form validation for all meme fields

3. **Protected Routes:**
   - `/admin/login` - Public login page
   - `/admin` - Protected admin panel (redirects to login if not authenticated)

## Future Enhancements

- [ ] Supabase authentication integration
- [ ] Database persistence
- [ ] Bulk upload support
- [ ] User role management
- [ ] Audit logging
- [ ] Media upload to Supabase Storage
