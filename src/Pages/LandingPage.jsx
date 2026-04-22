import React, { useEffect, useState } from "react";
import Hero from "./HeroSection/Hero";
import MovieCardSlider from "./Slider/MoviesCardSlider";
import { getMoviesByType, getGenres, getSeriecByType } from "../Service/Api";
import Loader from "../Components/Loader";

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

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Popular");
  const [Movies, setMovies] = useState([])
  const [activeTvFilter, setActiveTvFilter] = useState("Trending")
  const [tvSeries, setTvSeries] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ============ Movies 
  const fetchDataMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMoviesByType(activeFilter);
      setMovies(data);

    } catch (error) {
      setError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDataMovies();
  }, [activeFilter]);

  // ================ Tv Series 
  const [loadingSeries, setLoadingSeries] = useState(false)
  const [SeriesError, setSeriesError] = useState(null)

  const fetchDataSeries = async () => {
    try {
      setLoadingSeries(true);
      setSeriesError(null);

      const data = await getSeriecByType(activeTvFilter)
      setTvSeries(data);

    } catch (error) {
      setSeriesError(error?.message || "Something went wrong");
    } finally {
      setLoadingSeries(false);
    }
  };

  useEffect(() => {
    fetchDataSeries();
  }, [activeTvFilter]);

  

  // ============  Fetch Categories
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setCategories(data);
    };

    fetchGenres();
  }, []);



  return (

    <div className=" bg-black pb-16 ">


      <Hero />

      <MovieCardSlider
        title="What's"
        titleAccent="Popular"
        filters={["Popular", "Top Rated", "Trending", "Upcoming"]}
        activeFilter={activeFilter}
        onFilterChange={((filter) => { setActiveFilter(filter); })}
        movies={Movies}
        categories={categories}
        genreColors={genreColors}
        loading={loading}
        error={error}
        view="All Movies"
        type="movie"

      // StarRating={StarRating}
      />

      <MovieCardSlider
        title="TV"
        titleAccent="Shows"
        filters={["Trending", "Popular", "Top Rated"]}
        activeFilter={activeTvFilter}
        onFilterChange={((filter) => { setActiveTvFilter(filter) })}
        movies={tvSeries}
        categories={categories}
        genreColors={genreColors}
        loading={loadingSeries}
        error={SeriesError}
        view="All Series"
        type="tv"
      />




    </div>
  );
};

export default LandingPage;
