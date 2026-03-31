import { useEffect, useState } from "react";
import Button from "../../Components/Button";
import Heading from "../../Components/Heading";
import Paragraph from "../../Components/Paragraph";
import { FaPlay } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";
import { getMovieTrailer } from "../../Service/Api";
import TrailerModal from "../../Components/TrailerModal";

const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  27: "Horror",
  10749: "Romance",
  878: "Sci-Fi",
};

const LeftSide = ({ infoVisible, m }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const handleTrailerClick = async (id) => {
    try {
      const key = await getMovieTrailer(id); // 👈 API se key

      console.log("Trailer Key:", key);

      setTrailerKey(key); // store key
      setShowTrailer(true); // modal open
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // ============= Categories
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genres[id] || "Unknown");
  };

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && setShowTrailer(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [showTrailer]);

  return (
    <div className=" ">
      {/* ================= HERO SECTION ================= */}
      <div
        className={`absolute z-[6] flex flex-col justify-end
    md:pb-54  sm:pb-60 lg:pb-0 pb-46 lg:justify-center
    inset-x-0 bottom-0 px-6 sm:px-10 lg:px-16
    lg:top-0 lg:w-[55%] xl:w-[48%]
    transition-all duration-500
    ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* Genre badge */}
        <span className="inline-flex items-center gap-1.5 self-start mb-4 px-3 py-1.5 rounded-full border border-yellow-400/50 bg-yellow-400/10 text-yellow-400 text-xs tracking-widest uppercase backdrop-blur-sm">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {getGenreNames(m.genre_ids || [])[0] || "Unknown"}
        </span>

        {/* Title */}
        <Heading level={1} weight="bold">
          {m.title}
        </Heading>

        {/* Meta */}
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
            ★ {m?.vote_average ? m.vote_average.toFixed(1) : "N/A"}
          </span>
          <span className="text-white/50 text-sm">{m.release_date}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
        </div>

        {/* Overview */}
        <Paragraph size="sm sm:base" className="max-w-md text-white/70   ">
          {m.overview ? m.overview.slice(0, 160) + "..." : ""}
        </Paragraph>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          {/* PLAY TRAILER BUTTON */}
          <Button
            onClick={() => handleTrailerClick(m.id)}
            variant="yellow"
            icon={<FaPlay size={9} />}
          >
            {m.id ? "Play Trailer" : "No Trailer"}
          </Button>

          <Button variant="outline" icon={<LuInfo />}>
            More Info
          </Button>

          <Button variant="outline" className="!px-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* ================= TRAILER MODAL ================= */}
      {showTrailer && trailerKey && (
        <TrailerModal
          trailerKey={trailerKey}
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
};

export default LeftSide;
