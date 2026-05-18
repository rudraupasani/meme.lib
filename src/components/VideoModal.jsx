import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Copy, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { downloadVideo } from '../lib/download'

export default function VideoModal({ show, meme, onClose }) {
  const [copied, setCopied] = useState(false)

  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    await downloadVideo(meme.video, meme.title)
    setIsDownloading(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meme.video)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {show && <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative bg-card border border-primary/30 rounded-xl max-w-3xl w-full overflow-hidden z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-black/30 aspect-video">
            <video
              src={meme.video}
              autoPlay
              loop
              className="w-full h-full"
            />

            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 bg-dark/80 hover:bg-dark text-primary p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{meme.title}</h2>
            <p className="text-primary/60 mb-4">Category: {meme.category}</p>

            {Array.isArray(meme.tags) && meme.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {meme.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 bg-secondary/20 hover:bg-secondary/30 text-secondary py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isDownloading ? { scale: 1.05 } : {}}
                whileTap={!isDownloading ? { scale: 0.95 } : {}}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-secondary" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download Video
                  </>
                )}
              </motion.button>

              <motion.button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  )
}
