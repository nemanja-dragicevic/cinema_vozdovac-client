import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import MoviesTable from "../reusable/MoviesTable";
import * as moviesActions from "../actions/movies";
import "../styles/movies.css";

const Movies = () => {
  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.moviesReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(moviesActions.getMovies())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="pacmanSpinner">
        <PacmanLoader
          color={"#ebe534"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return movies === undefined || movies.length === 0 ? (
    <>
      <div className="no_movie_container">
        <h1>No Movies Available</h1>
        <p>Sorry, there are no movies to display right now.</p>
      </div>
    </>
  ) : (
    <>
      <MoviesTable movies={movies} />
    </>
  );
};

export default Movies;
