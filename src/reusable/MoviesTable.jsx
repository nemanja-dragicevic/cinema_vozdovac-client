import React from "react";
import "../styles/movies.css";
import "../styles/moviesTable.css";
import MovieBackground from "./MovieBackground";
import MovieNextPage from "../components/MovieNextPage";

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
              {/* <img
                class="locandina"
                src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"
                // src="https://fsmedia.imgix.net/cd/c9/5e/ba/4817/4d9a/93f0/c776ec32ecbc/lara-crofts-neck-looks-unnatural-in-the-new-poster-for-tomb-raider.png"
                // width="190"
                // height="180"
                alt="Movie"
              /> */}
              <MovieBackground small={true} base64Image={movie.smallPicture} />
              {/* <Decoded base64Image={movie.base64Image} /> */}
              <h1>{movie.name}</h1>
              <h4>2017, David Ayer ili glumci</h4>
              <span class="minutes">{movie.duration}</span>
              <p class="type">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
            <div class="movie_desc">
              <p class="text">{movie.description}</p>
              <MovieNextPage movieId={movie.movieID} />
            </div>
          </div>
          <MovieBackground small={false} base64Image={movie.bigPicture} />
        </div>
      ))}
    </>
  );
};

export default MoviesTable;
