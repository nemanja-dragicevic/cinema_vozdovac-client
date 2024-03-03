import React from "react";

const MovieRow = ({ movie }) => {
  return (
    <tr key={movie.movieID}>
      <th scope="col">
        <div class="card text-black">
          <div className="proba">
            <h5 class="card-title">{movie.name}</h5>
            <p class="card-text">{movie.description}</p>
            <Decoded base64Image={movie.base64Image} />
            <button class="gradient-button">Click me</button>
          </div>
        </div>
      </th>
    </tr>
  );
};

export default MovieRow;
