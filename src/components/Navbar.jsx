import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Film } from "lucide-react";

export default function Navbar() {

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${isActive
      ? "bg-primary text-dark shadow-[0_0_30px_rgba(57,255,20,0.15)]"
      : "text-primary/70 hover:text-primary"
    }`;

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.nav
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}

      className="
         mt-4 justify-center items-center m-auto  
        w-[92%] sm:w-[70%] lg:w-[50%]
        z-50
        bg-[#040404]/90 backdrop-blur-xl
        border border-primary/20
        rounded-full
        shadow-2xl shadow-black/40
      "
    >
      <div className="px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => {
            window.location.assign("/")
          }}
          className="flex items-center gap-3 cursor-pointer">
          <div className="rounded-full border border-primary/30 bg-[#090909] p-2">
            <Film className="w-5 h-5 text-primary" />
          </div>

          <h1 className="text-white font-bold text-lg">
            Meme Library
          </h1>
        </div>

        {/* Links */}
        <div className="flex gap-2">
          <NavLink onClick={scrollTop} to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink onClick={scrollTop} to="/memes" className={linkClass}>
            Memes
          </NavLink>
        </div>

      </div>
    </motion.nav>
  );
}