import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieBackground from "./../reusable/MovieBackground";
import * as rolesActions from "../actions/roles";
import "../styles/movie.css";
import { getFirstTwoSentences } from "./../utils/other";
import Popup from "./../reusable/Popup";
import Ticket from "../ticket/Ticket";

const MovieForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { roles } = useSelector((state) => state.rolesReducer);

  useEffect(() => {
    dispatch(rolesActions.getRoles(id));
  }, [dispatch]);

  const { movies } = useSelector((state) => state.moviesReducer);
  const movie = movies.filter((movie) => movie.movieID === parseInt(id))[0];
  const [openPopup, setOpenPopup] = useState(false);

  const openReserve = () => {
    setOpenPopup(true);
  };

  return (
    <div className="movie_card movie" id="bright">
      <div className="info_section">
        <div className="movie_header">
          <h1>{movie.name}</h1>
          <h4>{movie.genres.map((genre) => genre.name).join(", ")}</h4>
          <span className="minutes">{movie.duration} min</span>
          <p className="type">
            {roles
              ? roles
                  .map(
                    (role) => role.actor.firstName + " " + role.actor.lastName
                  )
                  .join(", ")
              : null}
          </p>
        </div>
        <div className="movie_desc">
          <p className="text">{getFirstTwoSentences(movie.description)}</p>
          <button className="reserve" onClick={openReserve}>
            Reserve your seat
          </button>
        </div>
      </div>
      <MovieBackground
        small={false}
        base64Image={movie.bigPicture}
        nameClass="blur_back bright_back"
        toDecode={true}
      />
      <Popup
        openPopup={openPopup}
        setOpen={setOpenPopup}
        title="Reserve your seat"
      >
        <Ticket />
      </Popup>
    </div>
  );
};

export default MovieForm;
