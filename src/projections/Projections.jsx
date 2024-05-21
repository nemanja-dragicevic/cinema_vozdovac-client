import { Button, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import TheatersIcon from "@mui/icons-material/Theaters";
import Table from "../reusable/Table";
import { useEffect, useState } from "react";
import TableSearch from "../components/TableSearch";
import * as hallActions from "../actions/hall";
import { useDispatch, useSelector } from "react-redux";
import AddHeader from "../reusable/AddHeader";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Projections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { halls } = useSelector((state) => state.hallReducer);
  const { movie } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    dispatch(hallActions.getHalls());
  }, [dispatch]);

  const fields = ["hallName", "rowsCount", "seatsPerRow"];
  const headCells = [
    { id: "hallName", label: "Hall name" },
    { id: "rowsCount", label: "Rows count", disableSorting: true },
    { id: "seatsPerRow", label: "Seats per row", disableSorting: true },
  ];
  const [data, setData] = useState({
    movie: movie,
    hall: 0,
    projectionTime: [],
    price: 0,
  });
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
            x.hallName.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const handleDateChange = (name) => (value) => {
    console.log(name);
    console.log(value);
    setData({ ...data, [name]: dayjs(value).format("D/MM/YYYY") });
    console.log(data);
  };

  const handleHallSelection = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    console.log(checked);

    if (checked) {
      setData({ ...data, hallID: value });
    } else {
      setData({ ...data, hallID: "" });
    }
  };

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      <Paper
        sx={{
          padding: 3,
          // display: visible ? "flex" : "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AddHeader
          title={"Select a hall and dates for movie " + movie?.name}
          icon={<TheatersIcon fontSize="large" />}
        />
        <div>
          <DatePicker
            label="Start date"
            name="startTime"
            sx={{ marginTop: "20px", width: "250px" }}
            format="D/MM/YYYY"
            disabled={new dayjs(data.movie.startTime) < new dayjs()}
            value={new dayjs(data?.movie.startTime)}
            onChange={handleDateChange("startTime")}
            minDate={
              data.movie.startTime ? new dayjs(data.movie.startTime) : null
            }
          />
          <DatePicker
            label="End date"
            name="endTime"
            sx={{ marginLeft: "30px", marginTop: "20px", width: "250px" }}
            format="D/MM/YYYY"
            disabled={new dayjs(data.movie.endTime) < new dayjs()}
            value={new dayjs(data?.movie.endTime)}
          />
        </div>
        <TableSearch
          label="Select a hall"
          searching={true}
          handleSearch={handleSearch}
        />
        <Table
          data={halls}
          filterFn={filterFn}
          objectKey="hallID"
          fields={fields}
          headCells={headCells}
          selection={true}
          setEditObj={handleHallSelection}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" sx={{ marginTop: "20px" }}>
            Add projection
          </Button>
          <Button
            variant="outlined"
            sx={{ marginTop: "20px", marginLeft: "20px" }}
            onClick={() => {
              navigate("/projections");
            }}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Projections;
