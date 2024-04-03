import React from "react";
import MovieBackground from "./MovieBackground";
import MovieNextPage from "../components/MovieNextPage";
import "../styles/movies.css";
import "../styles/moviesTable.css";

const MoviesTable = ({ movies }) => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          fontSize: 30,
          marginTop: 30,
          fontWeight: "bold",
        }}
      >
        <span className="gradient-text">Repertoar Bioskopa</span>
      </div>
      {movies.map((movie) => (
        <div class="movie_card" id="bright">
          <div class="info_section">
            <div class="movie_header">
              <MovieBackground
                small={true}
                base64Image={movie.smallPicture}
                nameClass="locandina"
              />
              <h1>{movie.name}</h1>
              <h4>{movie.genres.map((genre) => genre.name).join(", ")}</h4>
              <span class="minutes">{movie.duration}</span>
              {/* <p class="type">
                {movie.roles
                  .map((actor) => actor.firstName + " " + actor.lastName)
                  .join(", ")}
              </p> */}
            </div>
            <div class="movie_desc">
              <p class="text">{movie.description}</p>
              <MovieNextPage movieId={movie.movieID} />
            </div>
          </div>
          <MovieBackground
            small={false}
            base64Image={movie.bigPicture}
            nameClass="blur_back bright_back"
          />
        </div>
      ))}
    </>
  );
};

export default MoviesTable;
