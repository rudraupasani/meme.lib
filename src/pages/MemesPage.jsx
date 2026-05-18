import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import CategoryFilter from '../components/CategoryFilter'
import MemeGrid from '../components/MemeGrid'
import { supabase } from '../lib/supabase'
import memesFallback from '../data/memes.json'

export default function MemesPage() {
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchMemes()
  }, [])

  const fetchMemes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('memes').select('*').order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase fetch failed, using local data:', error.message)
        setMemes(memesFallback)
      } else if (data && data.length > 0) {
        setMemes(data)
      } else {
        console.warn('No data from Supabase, using local data')
        setMemes(memesFallback)
      }
    } catch (err) {
      console.error('Error fetching memes:', err)
      setMemes(memesFallback)
    } finally {
      setLoading(false)
    }
  }

  const categories = useMemo(() => {
    return ['All', ...new Set(memes.map(m => m.category))]
  }, [memes])

  const filteredMemes = useMemo(() => {
    return memes.filter((meme) => {
      const matchesSearch =
        meme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(meme.tags) && meme.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

      const matchesCategory = selectedCategory === 'All' || meme.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [memes, searchQuery, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark pt-28 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-primary/70">Loading meemes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <HeroSection searchQuery={searchQuery} onSearch={setSearchQuery} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <MemeGrid memes={filteredMemes} />
    </div>
  )
}
