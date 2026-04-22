import { useState } from "react";
import { SearchMovies } from "../Service/Api";

export const useSearch = () => {
  const [result, setResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);


  const fetchSearch = async (query = "") => {
    if (!query.trim()) {
      setResult([]);
      return;
    }

    try {
      setSearchLoader(true);

      const data = await SearchMovies(query);

      setResult(data?.results || data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoader(false);
    }
  };

  return { result, searchLoader, fetchSearch };
};
