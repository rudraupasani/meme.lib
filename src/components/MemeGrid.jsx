import { motion } from 'framer-motion'
import MemeCard from './MemeCard'

export default function MemeGrid({ memes }) {
  const validMemes = Array.isArray(memes) ? memes.filter(m => m && m.id && m.title) : []

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-20">
      {validMemes.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl text-primary/60">No memes found. Try adjusting your search or filters.</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {validMemes.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <MemeCard meme={meme} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
