import React from "react";
import MovieBackground from "./MovieBackground";
import MovieNextPage from "../components/MovieNextPage";
import "../styles/movies.css";
import "../styles/moviesTable.css";
import { getFirstTwoSentences } from "./../utils/other";

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
                toDecode={true}
              />
              <h1>{movie.name}</h1>
              <h4>{movie.genres.map((genre) => genre.name).join(", ")}</h4>
              <span class="minutes">{movie.duration} min</span>
              {/* <p class="type">
                {movie.roles
                  .map((actor) => actor.firstName + " " + actor.lastName)
                  .join(", ")}
              </p> */}
            </div>
            <div class="movie_desc">
              <p class="text">{getFirstTwoSentences(movie.description)}</p>
              <MovieNextPage movieId={movie.movieID} />
            </div>
          </div>
          <MovieBackground
            small={false}
            base64Image={movie.bigPicture}
            nameClass="blur_back bright_back"
            toDecode={true}
          />
        </div>
      ))}
    </>
  );
};

export default MoviesTable;
