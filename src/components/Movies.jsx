import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as moviesActions from "../actions/movies";
import MoviesTable from "../reusable/MoviesTable";
import { PacmanLoader } from "react-spinners";
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

  return movies === undefined ? (
    <h1>Nema filmova</h1>
  ) : (
    <>
      <MoviesTable movies={movies} />
    </>
  );
};

export default Movies;
