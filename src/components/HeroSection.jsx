import { motion } from 'framer-motion'
import { Search } from 'lucide-react'


export default function HeroSection({ onSearch, searchQuery }) {
  return (
    <motion.div
      className="px-4 text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.12),transparent_55%)] pointer-events-none" />
      <motion.h1
        className="text-5xl md:text-6xl font-black mb-4 text-white tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        Search the meemes collection faster.
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-primary/70 mb-10 max-w-2xl mx-auto leading-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Discover green-screen meme clips with crisp dark UI, animated controls, and instant preview. Type a tag or title to filter the full library.
      </motion.p>

      <motion.div
        className="max-w-2xl mx-auto relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
          <input
            type="text"
            placeholder="Search memes by title..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-[32px] bg-[#111] border border-primary/30 text-white placeholder-primary/40 shadow-[inset_0_0_30px_rgba(57,255,20,0.07)] focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
