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
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              <MovieBackground
                small={true}
                base64Image={movie.smallPicture}
                nameClass="locandina"
                toDecode={true}
              />
              <h1>{movie.name}</h1>
              <h4>{movie.genres.map((genre) => genre.name).join(", ")}</h4>
              <span className="minutes">{movie.duration} min</span>
              {/* <p className="type">
                {movie.roles
                  .map((actor) => actor.firstName + " " + actor.lastName)
                  .join(", ")}
              </p> */}
            </div>
            <div className="movie_desc">
              <p className="text">{getFirstTwoSentences(movie.description)}</p>
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
