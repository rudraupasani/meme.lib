import { Github, Heart, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-primary/20 mt-20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Green Screen Meemes</h3>
            <p className="text-primary/70">A black and neon green meme hub for creators and editors.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary/70">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/memes" className="hover:text-primary transition-colors">Memes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Browse</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 text-center text-primary/50 flex items-center justify-center gap-2">
          <span>Made with</span>
          <Heart className="w-4 h-4 fill-primary text-primary" />
          <span>for creators</span>
        </div>
      </div>
    </footer>
  )
}
