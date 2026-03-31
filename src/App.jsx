import Navbar from "./Components/Navbar";
import Hero from "./Pages/HeroSection/Hero";
import MoviesSection from "./Pages/Movies/MoviesSection";
import Footer from "./Components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import ViewMovies from "./Pages/ViewMovies/viewMovies";
import LandingPage from "./Pages/LandingPage";
import { Route, Routes } from "react-router";
// import { Routes, Route } from "react-router-dom";

const API_KEY = "4870e9cc97ce97a44eb4bc3f3b09ceb3";
const BASE_URL = "https://api.themoviedb.org/3";

// export const getGenres = async () => {
//   const res = await axios.get(
//     `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
//   );
//   return res.data.genres;
// };

// const rest = await getGenres();

// console.log(rest);

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/view/:id" element={<ViewMovies />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
