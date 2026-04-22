import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Categories from "./Categories";
import MovieCard from "./MovieCard";
import StarRating from "./StarRating";
import Loader from "../../Components/Loader";
import ErrorMessage from "../../Components/ErrorMessage";
import { getViewAllData, getGenres } from "../../Service/Api";
import { useSearch } from "../../Hooks/useSearch";
import SearchBar from "../../Components/SearchBar";

const genreColors = {
  "Science Fiction": "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  Romance: "text-yellow-300 bg-yellow-300/10 border-yellow-300/30",
  Action: "text-red-500 bg-red-500/10 border-red-500/30",
  Thriller: "text-violet-400 bg-violet-400/10 border-violet-400/30",
  Mystery: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  Fantasy: "text-indigo-400 bg-indigo-400/10 border-indigo-400/30",
  Horror: "text-red-900 bg-red-900/10 border-red-900/40",
  Animation: "text-pink-400 bg-pink-400/10 border-pink-400/30",
  Adventure: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  Family: "text-green-400 bg-green-400/10 border-green-400/30",
  Comedy: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  Crime: "text-gray-500 bg-gray-500/10 border-gray-500/40",
  Drama: "text-rose-400 bg-rose-400/10 border-rose-400/30",
};


export default function MoviesSection() {
  const { type } = useParams();

  // ================= STATES
  const [Movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================== Searchbar 
  const { result, searchLoader, fetchSearch } = useSearch();


  // ================= DISPLAY LOGIC (MAIN FIX)
  const filteredMovies =
    activeCategory === "All"
      ? Movies
      : Movies.filter((m) =>
        m.genre_ids?.includes(activeCategory)
      );


  const displayData =
    result.length > 0 ? result || result.results : filteredMovies;

  // ================= FETCH MOVIES
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getViewAllData(type, page);
      setMovies(data);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= EFFECTS
  useEffect(() => {
    fetchData();
  }, [type, page]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setCategories(data);
    };
    fetchGenres();
  }, []);



  // ================= LOADING / ERROR (COMBINED FIX)
  if (loading) {
    return <Loader variant="reel" text="Loading..." fullscreen />;
  }


  if (error) {
    return (
      <ErrorMessage
        message={error}
        variant="fullscreen"
        onRetry={fetchData}
      />
    );
  }

  return (
    <div className="pt-18 bg-[#0a0a0f]">
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 sm:py-16">

        <div className="flex flex-col pb-5 gap-4 sm:flex-row sm:items-center sm:justify-between sm:flex-wrap pr-3">
          {/* HEADER */}
          <div className="mb-0">
            <h2 className="text-white text-4xl font-black">
              All <span className="text-white/20">Movies</span>
            </h2>
          </div>
          <SearchBar onSearch={fetchSearch} />
        </div>


        {/* CATEGORY */}
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          Movies={Movies}
          setMovies={setMovies}
          genreColors={genreColors}
        />

        {/* COUNT */}
        <p className="text-white/30 text-sm mb-4">
          Showing {displayData?.length || 0} results
        </p>

        {/* GRID */}
        {displayData?.length > 0 ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

            {displayData.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                categories={categories}
                StarRating={StarRating}
                genreColors={genreColors}
              />
            ))}

          </div>
        ) : (
          <p className="text-white/40 text-center py-20">
            No results found
          </p>
        )}

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-3 py-6 mt-6">

          {/* Prev button */}
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                border transition-all duration-200
                ${page === 1
                ? "border-white/5 text-white/20 cursor-not-allowed bg-white/[0.02]"
                : "border-yellow-400/30 text-yellow-400 bg-yellow-400/5 hover:bg-yellow-400/10 hover:border-yellow-400/50 active:scale-95"
              }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Page indicator */}
          <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="text-white/30 text-xs font-medium">Page</span>
            <span className="text-yellow-400 text-sm font-black min-w-[1.5rem] text-center">
              {page}
            </span>
          </div>

          {/* Next button */}
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
               border border-yellow-400/30 text-yellow-400 bg-yellow-400/5
               hover:bg-yellow-400/10 hover:border-yellow-400/50
               active:scale-95 transition-all duration-200"
          >
            <span className="hidden sm:inline">Next</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>

        </div>
      </section>
    </div>
  );
}