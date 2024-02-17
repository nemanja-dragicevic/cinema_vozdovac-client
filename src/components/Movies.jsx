import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as moviesActions from "../actions/movies";

const Movies = () => {
  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    dispatch(moviesActions.getMovies());
  }, [dispatch]);

  return movies === undefined ? (
    <h1>Nema</h1>
  ) : (
    <>
      {movies.map((movie) => (
        <div key={movie.movieID}>
          <h1>{movie.name}</h1>
          <h3>Genres: {movie.genres[0].name}</h3>
        </div>
      ))}
      <h1>Movies</h1>;
    </>
  );
};

export default Movies;
