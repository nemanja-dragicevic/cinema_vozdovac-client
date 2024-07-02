import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieBackground from "./../reusable/MovieBackground";
import * as projectionsActions from "../actions/projections";
import * as rolesActions from "../actions/roles";
import Popup from "./../reusable/Popup";
import Ticket from "../ticket/Ticket";
import Card from "../reusable/Card";
import "../styles/movie.css";

const MovieForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { roles } = useSelector((state) => state.rolesReducer);
  const { projections } = useSelector((state) => state.projectionsReducer);

  useEffect(() => {
    dispatch(rolesActions.getRoles(id));
    dispatch(projectionsActions.getProjectionsForMovie(id));
  }, [dispatch]);

  const { movies } = useSelector((state) => state.moviesReducer);
  const movie = movies.filter((movie) => movie.movieID === parseInt(id))[0];
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedProjection, setSelectedProjection] = useState(null);

  const openReserve = () => {
    setOpenPopup(true);
  };

  const handleSeatSelection = (projection) => {
    setOpenPopup(true);
    setSelectedProjection(projection);
  };

  return (
    <>
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
            <p className="text">{movie.description}</p>
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
          <Ticket projection={selectedProjection} />
        </Popup>
      </div>
      <div
        className="projections"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "50px",
          marginBottom: "150px",
        }}
      >
        {projections.length !== 0
          ? projections.map((projection) => {
              return (
                <div key={projection.id}>
                  <Card
                    projection={projection}
                    onSeatSelection={handleSeatSelection}
                  />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default MovieForm;
