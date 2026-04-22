import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ViewMovies from "./Pages/ViewMovies/viewMovies";
import LandingPage from "./Pages/LandingPage";
import { Route, Routes } from "react-router";
import Practice from "./Components/practice";
import { useState } from "react";
import MoviesSection from "./Pages/Movies/MoviesSection";

const App = () => {

  return (
    <div>
      {/* { <Practice /> } */}
      <Navbar />


      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/view/:id" element={<ViewMovies />} />

        <Route path="/view-all/:type" element={<MoviesSection />} />
      </Routes>

      <Footer />

    </div>
  );
};

export default App;
