import React from "react";
import "../styles/movies.css";
import "../styles/moviesTable.css";
import MovieBackground from "./MovieBackground";

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
              <img
                class="locandina"
                src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"
                // src="https://fsmedia.imgix.net/cd/c9/5e/ba/4817/4d9a/93f0/c776ec32ecbc/lara-crofts-neck-looks-unnatural-in-the-new-poster-for-tomb-raider.png"
                // width="190"
                // height="180"
                alt="Movie"
              />
              {/* <Decoded base64Image={movie.base64Image} /> */}
              <h1>Bright</h1>
              <h4>2017, David Ayer</h4>
              <span class="minutes">117 min</span>
              <p class="type">Action, Crime, Fantasy</p>
            </div>
            <div class="movie_desc">
              <p class="text">
                Set in a world where fantasy creatures live side by side with
                humans. A human cop is forced to work with an Orc to find a
                weapon everyone is prepared to kill for.
              </p>
            </div>
          </div>
          <MovieBackground base64Image={movie.base64Image} />
        </div>
      ))}
    </>
  );
};

export default MoviesTable;
