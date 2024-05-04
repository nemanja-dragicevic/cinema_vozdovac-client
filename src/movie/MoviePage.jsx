import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as moviesActions from "../actions/movies";
import { Paper } from "@mui/material";
import Table from "../reusable/Table";

const MoviePage = () => {
  const dispatch = useDispatch();

  const objectKey = "movieID";
  const initialFValues = {
    movieID: 0,
    name: "",
    duration: "",
    description: "",
    startTime: "",
    endTime: "",
    genres: [],
  };
  const fields = [
    "name",
    "duration",
    "description",
    "startTime",
    "endTime",
    "genres",
  ];
  const { movies } = useSelector((state) => state.moviesReducer);

  const [data, setData] = useState(initialFValues);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    dispatch(moviesActions.getMovies());
  }, [dispatch]);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const setEditObj = (item) => {
    setData(item);
    console.log("Editing movie with id: ", item.movieID);
  };

  const onDelete = (id) => {
    dispatch(moviesActions.deleteMovie(id));
  };

  const headCells = [
    { id: "name", label: "Name" },
    { id: "duration", label: "Duration" },
    { id: "description", label: "Description", disableSorting: true },
    { id: "startTime", label: "Release date" },
    { id: "endTime", label: "End date", disableSorting: true },
    { id: "genres", label: "Genre(s)", disableSorting: true },
  ];

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      <Paper sx={{ padding: 3 }}>
        <Table
          headCells={headCells}
          filterFn={filterFn}
          data={movies}
          fields={fields}
          objectKey={objectKey}
          onDelete={onDelete}
          setEditObj={setEditObj}
        />
      </Paper>
    </div>
  );
};

export default MoviePage;
