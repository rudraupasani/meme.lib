import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Play, Loader2 } from 'lucide-react'
import VideoModal from './VideoModal'
import { downloadVideo } from '../lib/download'

export default function MemeCard({ meme }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Safety checks for missing data
  if (!meme || !meme.title || !meme.video) {
    return null
  }

  const tags = Array.isArray(meme.tags) ? meme.tags : []
  const category = meme.category || 'Uncategorized'

  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (e) => {
    e.stopPropagation()
    setIsDownloading(true)
    await downloadVideo(meme.video, meme.title)
    setIsDownloading(false)
  }

  return (
    <>
      <motion.div
        className="rounded-3xl overflow-hidden bg-[#111] border border-primary/20 cursor-pointer h-full shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.03, borderColor: 'rgba(57,255,20,0.45)' }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-video bg-[#0e0e0e] overflow-hidden flex items-center justify-center">
          {isHovered || !meme.thumbnail ? (
            <video
              src={meme.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.img
              src={meme.thumbnail}
              alt={meme.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.07 : 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-primary/20 bg-[#0a0a0a]/90 px-3 py-2 text-xs uppercase tracking-[0.18em] text-primary/80 shadow-[0_0_20px_rgba(57,255,20,0.08)]">
            {category}
          </div>

          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center gap-3 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center rounded-full bg-primary p-3 shadow-[0_0_40px_rgba(57,255,20,0.2)] text-dark hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6 fill-dark" />
              </motion.button>
              <motion.button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center rounded-full bg-[#181] px-3 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-dark shadow-[0_0_30px_rgba(57,255,20,0.15)] hover:bg-[#2aff3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isDownloading ? { scale: 1.03 } : {}}
                whileTap={!isDownloading ? { scale: 0.95 } : {}}
              >
                {isDownloading ? (
                  <span className="flex items-center gap-1">
                    <Loader2 className="w-4 h-4 animate-spin text-dark" />
                    Saving...
                  </span>
                ) : (
                  'Download'
                )}
              </motion.button>
            </motion.div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-bold text-white text-base md:text-lg line-clamp-2 mb-2">{meme.title}</h3>
          {tags.length > 0 && (
            <p className="text-xs uppercase tracking-[0.18em] text-primary/70 mb-3">{tags.slice(0, 2).map(tag => `#${tag}`).join(' · ')}</p>
          )}

          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[11px] uppercase text-primary/70 bg-[#111] border border-primary/15 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setShowModal(true)}
              className="w-full rounded-2xl bg-primary/20 text-primary py-2 text-sm font-semibold transition hover:bg-primary/30"
            >
              Preview
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full rounded-2xl bg-[#121] text-secondary py-2 text-sm font-semibold transition hover:bg-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                  Downloading...
                </>
              ) : (
                'Download'
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <VideoModal key={`modal-${meme.id}`} show={showModal} meme={meme} onClose={() => setShowModal(false)} />
    </>
  )
}
