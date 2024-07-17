import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as projectActions from "../actions/projections";
import Table from "../reusable/Table";
import "../styles/gradient.css";

const WelcomePage = () => {
  const dispatch = useDispatch();

  const { projections } = useSelector((state) => state.projectionsReducer);

  useEffect(() => {
    dispatch(projectActions.todaysProjections());
  }, [dispatch]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const fields = ["movie.name", "projectTime", "projectEnd", "price"];
  const headCells = [
    { id: "movie", label: "Movie", disableSorting: true },
    { id: "projectionTime", label: "Projection start", disableSorting: true },
    { id: "projectionEnd", label: "Projection end", disableSorting: true },
    { id: "price", label: "Price", disableSorting: true },
  ];

  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h4 className="gradient-text" style={{ marginBottom: "80px" }}>
        Welcome to Cinema Vozdovac
      </h4>
      <h5 className="gradient-small">
        Here you can see a list of today's projections
      </h5>

      <Paper style={{ width: "70%", marginTop: "20px", padding: 5 }}>
        {projections.length !== 0 ? (
          <Table
            headCells={headCells}
            data={projections}
            objectKey={"id"}
            fields={fields}
            filterFn={filterFn}
            setFilterFn={setFilterFn}
            buttons={false}
          />
        ) : (
          <h5 className="gradient-small">No projections for today</h5>
        )}
      </Paper>

      {/* <h5 className="gradient-small" style={{ marginTop: "50px" }}>
        And a list of popular movies
      </h5> */}
    </div>
  );
};

export default WelcomePage;
