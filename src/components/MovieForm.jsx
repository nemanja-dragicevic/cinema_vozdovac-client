import { useParams } from "react-router";
import "../styles/movie.css";

const MovieForm = () => {
  const { id } = useParams();
  return (
    <div class="movie-card">
      <div class="container">
        <a href="#">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_cover.jpg"
            alt="cover"
            class="cover"
          />
        </a>

        <div class="hero">
          <div class="details">
            <div class="title1">
              The Hobbit <span>PG-13</span>
            </div>

            <div class="title2">The Battle of the Five Armies</div>

            <span class="likes">109 likes</span>
          </div>
        </div>

        <div class="description">
          <div class="column1">
            <span class="tag">action</span>
            <span class="tag">fantasy</span>
            <span class="tag">adventure</span>
          </div>

          <div class="column2">
            <p>
              Bilbo Baggins is swept into a quest to reclaim the lost Dwarf
              Kingdom of Erebor from the fearsome dragon Smaug. Approached out
              of the blue by the wizard Gandalf the Grey, Bilbo finds himself
              joining a company of thirteen dwarves led by the legendary
              warrior, Thorin Oakenshield. Their journey will take them into the
              Wild; through... <a href="#">read more</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
