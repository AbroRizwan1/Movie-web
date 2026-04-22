import { useRef, useState } from "react";
import MoviesCard from "./MoviesCard";
import Loader from "../../Components/Loader";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router";

export default function MovieCardSlider({
  titleAccent = "Movies",
  title,
  filters = ["Popular", "Top Rated", "Trending", "Upcoming"],
  activeFilter = "Popular",
  onFilterChange,
  movies = [],
  categories = [],
  genreColors = {},
  StarRating,
  view = "All Movies",
  type,

  loading = false,
  error = null,

}) {
  const sliderRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const navigate = useNavigate()

  const SCROLL_AMOUNT = 600;

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  return (
    <div className="relative w-full">
      {/* ── Header ── */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-1">
        {/* Top row: Title + View All + Arrows */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 className="text-white font-black text-2xl sm:text-4xl lg:text-5xl leading-none tracking-tight">
            {title} <span className="text-white/20">{titleAccent}</span>
          </h2>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* View All button */}
            <button
              onClick={() => navigate(`/view-all/${type}/`)}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-white/[0.04] text-white/70 border border-white/[0.08] hover:bg-yellow-400 hover:text-black transition-all whitespace-nowrap"
            >
              {view} →
            </button>

            {/* Arrow buttons — desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!showLeft}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
                ${showLeft
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-white/5 text-white/20 cursor-not-allowed"
                  }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!showRight}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
                ${showRight
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-white/5 text-white/20 cursor-not-allowed"
                  }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filter buttons — scrollable on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => onFilterChange?.(item)}
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all duration-200 border
              ${activeFilter === item
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20 scale-[1.02]"
                  : "bg-white/[0.04] text-white/50 border-white/[0.08] hover:bg-white/[0.08] hover:text-white/80 hover:border-white/15"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* ── Left fade gradient ── */}
      {showLeft && (
        <div className="absolute left-0 top-10 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
      )}

      {/* ── Right fade gradient ── */}
      {showRight && (
        <div className="absolute right-0 top-10 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
      )}

      {/* ── Scrollable row ── */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex relative min-h-[400px] gap-3 sm:gap-4 overflow-x-auto pb-4 scroll-smooth px-4 sm:px-6 mt-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading ? (
          <div className="absolute inset-0 flex justify-center items-center bg-[#0a0a0f]/60 z-10">
            <Loader   />
          </div>
        ) : error ? (
          <div className="text-center w-full min-h-[200px] flex flex-col items-center justify-center">
            <ErrorMessage message={error} />
            <p className="text-sm text-white/50 mt-2">{error}</p>
          </div>
        ) : (
          movies?.map((movie, i) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              index={i}
              categories={categories}
              genreColors={genreColors}
              StarRating={StarRating}
            />
          ))
        )}
      </div>
    </div>
  );
}
