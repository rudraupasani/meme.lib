import { motion } from 'framer-motion'

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-8 flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.55 }}
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${selectedCategory === category
              ? 'bg-primary text-dark shadow-[0_0_30px_rgba(57,255,20,0.15)]'
              : 'bg-[#111] text-primary/70 border border-primary/15 hover:border-primary/40 hover:text-primary'
            }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  )
}
