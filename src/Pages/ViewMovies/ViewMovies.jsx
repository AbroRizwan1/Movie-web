import { use, useEffect, useState } from "react";
import Main from "./Main";
import { Viewpage, getGenres } from "../../Service/Api";
import { useParams } from "react-router";
import Heading from "../../Components/Heading";
import Loader from "../../Components/Loader";
import ErrorMessage from "../../Components/ErrorMessage";

const StarRating = ({ vote_average }) => {
  const stars = Math.round(vote_average / 2);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= stars ? "text-amber-400" : "text-zinc-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function ViewMovies() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();

  const [movieData, setMovieData] = useState(null);

  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setloading(true);
      setError(null);

      const data = await Viewpage(id);
      setMovieData(data);

    } catch (error) {
      setError(error?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);



  return (
    <div>
      {loading ? (
        <Loader variant="reel" text="Loading movies..." fullscreen />
      ) : error ? (
        <ErrorMessage message={error} variant="fullscreen" onRetry={fetchData} />
      ) : (
        <div className="min-h-screen bg-zinc-950  text-zinc-100 font-sans">
          {/* ── HERO ── */}

          <div className="relative h-[75vh] min-h-[480px] overflow-hidden">
            <img
              src={
                movieData?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`
                  : "/fallback.jpg"
              }
              alt={movieData?.title}
              className="absolute inset-0 w-full h-full object-cover scale-105"
              style={{ filter: "brightness(0.35)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />

            <div className="relative z-10 flex items-end h-full px-6 md:px-12 pb-10 pt-24">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-6xl mx-auto">
                {/* Poster */}
                <div className="hidden md:block flex-shrink-0">
                  <div className="relative w-44 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700">
                    <img
                      src={
                        movieData?.poster_path
                          ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
                          : "/fallback.jpg"
                      }
                      alt={movieData?.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded border border-zinc-600 text-zinc-400">
                      {movieData?.vote_average.toFixed(1)}
                    </span>
                    <span className="text-zinc-500">
                      {movieData?.release_date}
                    </span>
                    <span className="text-zinc-500">·</span>
                    <span className="text-zinc-500">{movieData?.runtime}</span>
                  </div>

                  <Heading
                    level={2}
                    size="6xl"
                    weights="light"
                    tracking="tight"
                    leading="none"
                  >
                    {movieData?.title}
                  </Heading>

                  <p className="text-amber-400 text-sm italic font-light tracking-widest uppercase">
                    {movieData?.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {movieData?.genres.map((g, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-amber-400/10 border-2 border-amber-400 flex flex-col items-center justify-center">
                        <span className="text-amber-400 font-black text-sm leading-none">
                          {movieData?.vote_average.toFixed(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">User Score</p>
                        <StarRating vote_average={movieData?.vote_average} />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 text-zinc-950 font-bold text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Watch Now
                    </button>
                    <button
                      onClick={() => setIsWatchlisted(!isWatchlisted)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border transition-colors ${isWatchlisted ? "bg-zinc-700 border-zinc-600 text-white" : "border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white"}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill={isWatchlisted ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      {isWatchlisted ? "Saved" : "Watchlist"}
                    </button>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${isLiked ? "border-rose-500 bg-rose-500/10 text-rose-400" : "border-zinc-600 text-zinc-400 hover:border-rose-500 hover:text-rose-400"}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ── MAIN CONTENT ── */}
          <Main
            activeTab={activeTab}
            movieData={movieData}
            StarRating={StarRating}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
    </div>
  );
}
