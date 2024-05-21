import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import AddHeader from "../reusable/AddHeader";
import TableSearch from "../components/TableSearch";
import * as moviesActions from "../actions/movies";
import Table from "../reusable/Table";
import { useNavigate } from "react-router-dom";

const ProjectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(moviesActions.getMoviesInfo());
  }, [dispatch]);

  const { movies } = useSelector((state) => state.moviesReducer);

  const objectKey = "movieID";

  const fields = ["name", "genres", "duration"];
  const headCells = [
    { id: "name", label: "Movie name" },
    { id: "genres", label: "Genre", disableSorting: true },
    { id: "duration", label: "Duration (min)" },
  ];

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

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

  const handleEdit = (obj) => {
    dispatch(moviesActions.setMovie(obj));
    navigate("/projections/" + obj.movieID);
  };

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      <Paper sx={{ padding: 3 }}>
        <AddHeader
          title="Select a movie"
          icon={<TheatersIcon fontSize="large" />}
        />
        <TableSearch
          searching={true}
          handleSearch={handleSearch}
          label="Search for a movie"
        />
        <Table
          data={movies}
          filterFn={filterFn}
          objectKey={objectKey}
          headCells={headCells}
          fields={fields}
          setEditObj={handleEdit}
        />
      </Paper>
      {/* <Projections visible={visible} data={data} halls={halls} /> */}
    </div>
  );
};

export default ProjectionsPage;
