import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import MemeGrid from '../components/MemeGrid'
import { supabase } from '../lib/supabase'
import memes from '../data/memes.json'

const stats = [
  { label: 'Memes ready', value: '20+' },
  { label: 'Instant download', value: '1 click' },
  { label: 'Creator friendly', value: '24/7 access' },
]

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeatured()
  }, [])

  const fetchFeatured = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('memes').select('*').limit(8).order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase fetch failed, using local data:', error.message)
        const localData = memes.slice(0, 6)
        console.log('Setting featured from local:', localData)
        setFeatured(localData)
      } else if (data && data.length > 0) {
        console.log('Setting featured from Supabase:', data)
        setFeatured(data)
      } else {
        console.warn('No data from Supabase, using local data')
        const localData = memes.slice(0, 6)
        console.log('Setting featured from local:', localData)
        setFeatured(localData)
      }
    } catch (err) {
      console.error('Error fetching featured memes:', err)
      const localData = memes.slice(0, 6)
      console.log('Setting featured from local after error:', localData)
      setFeatured(localData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-10">
      <section className="px-4 py-6 max-w-6xl mx-auto">
        <motion.div
          className="rounded-[32px] border border-primary/15 bg-[#090909] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mx-auto max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/60 mb-4"></p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Better home for clean green-screen meemes.
            </h1>
            <p className="text-base md:text-lg text-primary/70 leading-8 mb-10">
              Explore the freshest green screen meme clips, built for editors, creators, and meme hunters. No gradients, no clutter  just bold black style with neon green highlights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/memes"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-dark shadow-[0_0_30px_rgba(57,255,20,0.18)] hover:bg-secondary transition-all"
            >
              Browse all Memes
            </Link>
            <a
              href="#featured"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-8 py-3 text-sm font-semibold text-primary hover:border-secondary hover:text-secondary transition-all"
            >
              See featured clips
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                className="rounded-3xl border border-primary/15 bg-[#0c0c0c] p-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.12, duration: 0.45 }}
              >
                <p className="text-3xl font-bold text-white mb-2">{item.value}</p>
                <p className="text-sm text-primary/70">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="featured" className="px-4 py-12 border-t border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/70">Featured</p>
              <h2 className="text-3xl font-bold text-white mt-3">
                Top memes ready to preview.
              </h2>
            </div>
            <p className="text-sm text-primary/70 max-w-xl">
              Preview a curated selection of the best green screen clips
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
              <p className="text-primary/70">Loading featured meemes...</p>
            </div>
          ) : featured.length > 0 ? (
            <MemeGrid memes={featured} />
          ) : (
            <div className="text-center py-20">
              <p className="text-primary/70">No meemes available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
