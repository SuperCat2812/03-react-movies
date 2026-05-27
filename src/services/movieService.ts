import axios from "axios";
import type { Movie } from "../types/movie";
const token = import.meta.env.VITE_API_KEY;

axios.defaults.baseURL = "https://api.themoviedb.org/3/search";

interface AxiosParams {
  params: {
    query: string;
  };
  headers: {
    Authorization: string;
  };
}

interface MoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const option: AxiosParams = {
    params: {
      query: query,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get<MoviesResponse>("/movie", option);
  return data.results;
};
