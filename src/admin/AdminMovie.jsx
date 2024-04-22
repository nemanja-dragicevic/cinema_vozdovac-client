import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as movieActions from "../actions/movies";
import "../styles/white_bg.css";
import { PacmanLoader } from "react-spinners";
const AdminMovie = () => {
  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.moviesReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(movieActions.getMovies())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="pacmanSpinner">
        <PacmanLoader
          color={"#ebe534"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <table class="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Project start time</th>
            <th scope="col">Project end time</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
            <th scope="col">Genres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminMovie;
