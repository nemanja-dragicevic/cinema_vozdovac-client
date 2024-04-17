import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieBackground from "./../reusable/MovieBackground";
import * as rolesActions from "../actions/roles";
import "../styles/movie.css";

const MovieForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { roles } = useSelector((state) => state.rolesReducer);

  useEffect(() => {
    dispatch(rolesActions.getRoles(id));
  }, [dispatch]);

  const { movies } = useSelector((state) => state.moviesReducer);
  const movie = movies.filter((movie) => movie.movieID === parseInt(id))[0];

  return (
    <div class="movie_card movie" id="bright">
      <div class="info_section">
        <div class="movie_header">
          <h1>{movie.name}</h1>
          <h4>{movie.genres.map((genre) => genre.name).join(", ")}</h4>
          <span class="minutes">{movie.duration}</span>
          <p class="type">
            {roles ? (
              roles
                .map((role) => role.actor.firstName + " " + role.actor.lastName)
                .join(", ")
            ) : (
              <h1></h1>
            )}
          </p>
        </div>
        <div class="movie_desc">
          <p class="text">{movie.description}</p>
          <button>Reserve your seat</button>
        </div>
      </div>
      <MovieBackground
        small={false}
        base64Image={movie.bigPicture}
        nameClass="blur_back bright_back"
      />
    </div>
  );
};

export default MovieForm;
