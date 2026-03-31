function ThumbCard({ movie, index, isActive, onClick, thumbRef }) {
  return (
    <div
      ref={thumbRef}
      onClick={onClick}
      className={`relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300
        ${isActive ? "scale-[1.04] ring-2 ring-yellow-400" : "hover:scale-[1.03] opacity-60 hover:opacity-90"}`}
    >
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-yellow-400 z-10" />
      )}
      <img
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : "/fallback.jpg"
        }
        alt={movie.title}
        loading={index < 4 ? "eager" : "lazy"}
        className="w-full h-24 sm:h-28 md:h-32 object-cover block"
      />
      <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-[9px] text-white/40 tracking-widest mb-0.5">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="text-[10px] text-white font-medium truncate leading-tight">
          {movie.title}
        </p>
        <p className="text-[9px] text-yellow-400 mt-0.5">
          ★ {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>
      </div>
    </div>
  );
}
export default ThumbCard;
