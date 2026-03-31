import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = ["Movies", "Series", "Originals", "My List"];

  return (
    <nav className="absolute top-0 left-0 right-0 z-[10] flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center">
          <span className="text-black font-black text-sm">C</span>
        </div>
        <span className="text-white font-bold text-xl tracking-tight">
          Cine<span className="text-yellow-400">Max</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((item) => (
          <button
            key={item}
            className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            {item}
          </button>
        ))}
      </div>
      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>
    </nav>
  );
};

export default Navbar;
