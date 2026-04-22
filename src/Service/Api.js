import axios from "axios";

const API_KEY = "4870e9cc97ce97a44eb4bc3f3b09ceb3";
const BASE_URL = "https://api.themoviedb.org/3";

// =========== for Hero Section
export const getTrendingMovies = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
    );
    return res.data.results;
  } catch (error) {
    console.log("Error fetching movies", error);
    return [];
  }
};

// for Slider with multiple Categories
export const getMoviesByType = async (type) => {
  let endpoint = "";

  switch (type) {
    case "Trending":
      endpoint = "/trending/movie/day";
      break;
    case "Popular":
      endpoint = "/movie/popular";
      break;
    case "Top Rated":
      endpoint = "/movie/top_rated";
      break;
    case "Upcoming":
      endpoint = "/movie/upcoming";
      break;
    default:
      endpoint = "/trending/movie/day";
  }

  try {
    const res = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    return res.data.results;
  } catch (error) {
    console.log("Error fetching movies", error);
    return [];
  }
};

// ============== Series
export const getSeriecByType = async (type) => {
  let endpoint = "";

  switch (type) {
    case "Popular":
      endpoint = "/tv/popular";
      break;
    case "Top Rated":
      endpoint = "/tv/top_rated";
      break;
    default:
      endpoint = "/trending/tv/day";
  }

  try {
    const res = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    return res.data.results;
  } catch (error) {
    console.log("Error fetching movies", error);
    return [];
  }
};

// ================  view Page
export const getViewAllData = async (type, page = 1) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/${type}/popular?api_key=${API_KEY}&page=${page}`,
    );

    return res.data.results; // ✅ MUST
  } catch (error) {
    console.log("Error Fetching movies", error);
  }
};

// ============= For Search Bar
export const SearchMovies = async (query) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    );
    return res.data.results;
  } catch (error) {
    console.log("Error fetching movies", error);
    return [];
  }
};

//==================  Get categories form Api
export const getGenres = async () => {
  const res = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  );
  return res.data.genres;
};

export const getMovieTrailer = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);

  const data = await res.json();

  const trailer = data?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  return trailer?.key || null;
};

export const Viewpage = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.data;
};

// const rest = await Viewpage(12345);
// console.log(rest);
