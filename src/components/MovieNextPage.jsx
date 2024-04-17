import { Link } from "react-router-dom";
import "../styles/nextPage.css";

const MovieNextPage = ({ movieId }) => {
  return (
    <button className="animated-button">
      <Link className="linkStyle" to={`/movies/${movieId}`}>
        View more...
      </Link>
    </button>
  );
};

export default MovieNextPage;
