import React, { useEffect, useState } from "react";
import { getMovieTrailer } from "../../Service/Api";
import TrailerModal from "../../Components/TrailerModal";
const Overview = ({ activeTab, movieData, StarRating }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailer, setTrailer] = useState(null);

  const handleTrailerClick = async (id) => {
    try {
      const key = await getMovieTrailer(id); // 👈 API se key
      setTrailer(key);
      setShowTrailer(true);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <div className="">
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                Synopsis
              </h2>

              <p className="text-zinc-300 leading-relaxed text-base">
                {movieData?.overview
                  ? movieData.overview
                  : "No overview available for this movie."}
              </p>
            </div>

            {/* Trailer */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                Trailer
              </h2>
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-900 group cursor-pointer">
                <img
                  src={
                    movieData.poster_path
                      ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
                      : "/fallback.jpg"
                  }
                  alt={movieData.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handleTrailerClick(movieData.id)}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-amber-400 
               flex items-center justify-center shadow-xl shadow-amber-400/30 
               group-hover:scale-110 active:scale-95 transition-transform"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-zinc-950 ml-0.5 sm:ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <span className="absolute bottom-4 left-4 text-xs text-zinc-300 font-medium">
                  Official Trailer · 2:45
                </span>
              </div>
            </div>
          </div>

          {/* =================  Trailer  */}
          {showTrailer && trailer && (
            <TrailerModal
              trailerKey={trailer}
              isOpen={showTrailer}
              onClose={() => setShowTrailer(false)}
            />
          )}

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score card */}
            <div className="bg-gradient-to-br from-amber-400/10 to-transparent rounded-2xl p-5 border border-amber-400/20 text-center">
              <div className="text-5xl font-black text-amber-400">
                {movieData?.vote_average.toFixed(1)}
              </div>
              <div className="text-zinc-400 text-sm mt-1">out of 10</div>
              <div className="flex justify-center mt-2">
                <StarRating vote_average={movieData?.vote_average} />
              </div>
              <div className="text-zinc-500 text-xs mt-2">
                Based on 248K ratings
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
