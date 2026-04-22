import { useState, useRef, useEffect } from "react";

export default function SearchBar({

  placeholder = "Search movies, shows...",
  onSearch,
  delay = 500,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const timer = useRef(null);


  // debounce logic
  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      onSearch(query);
    }, delay);

    return () => clearTimeout(timer.current);
  }, [query, delay]);


  // Focus input
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Click outside close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Key handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query.trim());
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      onSearch("");
    }
  };

  // Clear button
  const handleClear = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  const SearchIcon = () => (
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
  );

  return (
    <div ref={containerRef} className="relative flex items-center">

      {/* Closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-2 rounded-lg"
        >
          <SearchIcon />
          <span className="hidden sm:inline">Search</span>
        </button>
      )}

      {/* Open */}
      {isOpen && (
        <div className="flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm px-3 py-2 rounded-lg w-[220px] sm:w-[300px]">

          <SearchIcon />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none"
          />

          {query && (
            <button
              onClick={handleClear}
              className="text-white/40 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}