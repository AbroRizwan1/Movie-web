import { useEffect, useState } from "react";
import Categories from "./Categories";
import MovieCard from "./MovieCard";
import StarRating from "./StarRating";
import { getpopularMovies, getGenres } from "../../Service/Api";

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
  const [activeCategory, setActiveCategory] = useState("All");

  const [popularMovies, setpopularMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getpopularMovies();
      setpopularMovies(data);
    };

    fetchData();
  }, []);

  // ============  Fetch Categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setCategories(data);
    };

    fetchGenres();
  }, []);

  const filteredMovies =
    activeCategory === "All"
      ? popularMovies
      : popularMovies.filter((m) => m.genre_ids.includes(activeCategory));

  return (
    <div>
      <section className="w-full bg-[#0a0a0f] px-4 sm:px-6 lg:px-10 xl:px-16 py-12 sm:py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-yellow-400 text-xs tracking-[0.2em] uppercase font-semibold mb-2">
              Browse Collection
            </p>
            <h2 className="text-white font-black text-3xl sm:text-4xl lg:text-5xl leading-none tracking-tight">
              Popular <span className="text-white/20">Movies</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-white/40 hover:text-white text-sm flex items-center gap-1.5 transition-colors group self-start sm:self-auto pb-1"
          >
            View all
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <Categories
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          popularMovies={popularMovies}
          setpopularMovies={setpopularMovies}
        />

        {/* Category Filter */}

        {/* Results count */}
        <p className="text-white/25 text-xs mb-6 tracking-wide">
          Showing
          <span className="text-white/50 font-medium">
            {filteredMovies.length}
          </span>
          {activeCategory === "All" ? "movies" : `"${activeCategory}" movies`}
        </p>

        {/* Grid */}
        {filteredMovies.length > 0 ? (
          <div
            className="grid gap-4 sm:gap-5
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6"
          >
            {filteredMovies.map((movie, i) => (
              <MovieCard
                key={movie.title}
                movie={movie}
                index={i}
                categories={categories}
                genreColors={genreColors}
                StarRating={StarRating}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                className="opacity-30"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="text-white/30 text-sm">
              No movies found in this category
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
