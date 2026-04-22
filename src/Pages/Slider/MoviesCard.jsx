import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
//  MovieCardSlider — Horizontal scrollable slider
//
//  Props:
//    title      {string}    Section heading e.g. "Trending Now"
//    movies     {array}     Array of movie objects
//    categories {array}     Genre list for badge mapping
//    genreColors {object}   Genre name → tailwind class string
//    StarRating  {component} Your existing StarRating component
// ─────────────────────────────────────────────────────────────

export default function MoviesCard({
  movie,
  index,
  categories,
  genreColors,
  StarRating,
}) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/view/${movie.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden bg-[#111118] border border-white/[0.06] cursor-pointer
        transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1
        flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3] ">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : movie.poster
          }
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Hover play button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
        >
          <button className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl shadow-yellow-400/40 hover:bg-yellow-300 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#000"
              className="ml-1"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </button>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#facc15">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-white text-[11px] font-bold">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10
                     flex items-center justify-center opacity-0 group-hover:opacity-100
                     transition-all duration-300 hover:bg-white/20"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Hover description */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-400 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
        >
          <p className="text-white/75 text-xs leading-relaxed line-clamp-3">
            {movie.overview || movie.desc}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-1">
            {movie.title|| movie.name}
          </h3>
        </div>

        <div className="flex flex-wrap justify-end gap-1.5 pb-1.5">
          {movie.genre_ids?.map((id) => {
            const genre = categories?.find((g) => g.id === id);
            const name = genre?.name;
            return (
              <span
                key={id}
                className={`flex-shrink-0 text-[7px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${genreColors?.[name] ||
                  "text-gray-300 bg-gray-500/10 border-gray-500/30"
                  }`}
              >
                {name}
              </span>
            );
          })}
        </div>

        <div className="flex pt-0.5 flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            {StarRating && <StarRating rating={movie.vote_average} />}
          </div>
          <div className="flex items-center py-1 gap-1.5 text-white/35 text-[10px]">
            <span>{movie.release_date}</span>
            <span>·</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
