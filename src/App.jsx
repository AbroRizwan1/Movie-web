import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ViewMovies from "./Pages/ViewMovies/viewMovies";
import LandingPage from "./Pages/LandingPage";
import { Route, Routes } from "react-router";

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
