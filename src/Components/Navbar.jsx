import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router";
import SearchBar from "./SearchBar";
import { useSearch } from "../Hooks/useSearch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = ["Movies", "Series"];

  const navigate = useNavigate()

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 ">
      {/* ── Main bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-10 lg:px-16 py-5">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <span className="text-black font-black text-sm">C</span>
          </div>
          <button
            className="text-white font-bold text-xl tracking-tight cursor-pointer"
            onClick={() => {
              // console.log('button is clicked');
              
              navigate("/") 
            } }
          >
            Cine<span className="text-yellow-400">Max</span>
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => navigate(`/view-all/${item === "Movies" ? "movie" : "tv"}`)}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right side: search + hamburger */}
        <div className="flex items-center gap-3">

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all gap-[5px]"
            aria-label="Toggle menu"
          >
            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 origin-center
              ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-4 h-0.5 bg-white transition-all duration-300
              ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-4 h-0.5 bg-white transition-all duration-300 origin-center
              ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="mx-4 mb-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => {
                navigate(`/view-all/${item === "Movies" ? "movie" : "tv"}`);
                setMenuOpen(false);
              }}
              className="text-white/70 hover:text-white text-sm font-medium text-left py-2 px-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
