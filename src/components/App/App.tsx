import "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { type Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = (query: string) => {
    async function render() {
      try {
        setIsLoading(true);
        const data = await fetchMovies(query);
        setMovies(data);
        if (data.length === 0) {
          toast.error("No movies found for your request.");
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    render();
  };
  const onSelect = (movieSelect: Movie) => {
    setMovie(movieSelect);
  };
  const onclose = () => {
    setMovie(null);
  };
  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid
          onSelect={onSelect}
          movies={movies}
        />
      )}
      {isError && <ErrorMessage />}
      {movie && (
        <MovieModal
          movie={movie}
          onClose={onclose}
        />
      )}
    </>
  );
}

export default App;
