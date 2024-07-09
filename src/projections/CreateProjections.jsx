import { Button, Paper } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";
import MovieIcon from "@mui/icons-material/Movie";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import * as hallActions from "../actions/hall";
import * as movieActions from "../actions/movies";
import * as projectionsActions from "../actions/projections";
import Table from "../reusable/Table";
import Popup from "../reusable/Popup";
import AddHeader from "../reusable/AddHeader";
import ProjectionTimes from "./ProjectionTimes";
import { warning } from "../utils/notification";
import { formatDate } from "./../utils/date";
import Input from "../registration/Input";

const CreateProjections = () => {
  const dispatch = useDispatch();

  const { halls } = useSelector((state) => state.hallReducer);
  const { movies } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    dispatch(hallActions.getHalls());
    dispatch(movieActions.getUnprojectedMovies());
  }, [dispatch]);

  useEffect(() => {
    setTableHall(
      halls.map((hall) => {
        return {
          ...hall,
          checked: false,
        };
      })
    );
    setTableMovie(
      movies.map((movie) => {
        return {
          ...movie,
          checked: false,
        };
      })
    );
  }, [halls, movies]);

  const hallFields = ["hallName", "rowsCount", "seatsPerRow"];
  const headCells = [
    { id: "hallName", label: "Hall name" },
    { id: "rowsCount", label: "Rows count", disableSorting: true },
    { id: "seatsPerRow", label: "Seats per row", disableSorting: true },
  ];

  const [tableHall, setTableHall] = useState([]);
  const [tableMovie, setTableMovie] = useState([]);
  const [errors, setErrors] = useState({
    price: { error: false, message: "" },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [dates, setDates] = useState({
    startTime: new dayjs().add(1, "day"),
    endTime: new dayjs().add(1, "day"),
  });
  const movieFields = ["name", "duration", "genres"];
  const movieHeadCells = [
    { id: "name", label: "Movie name" },
    { id: "duration", label: "Duration" },
    { id: "genres", label: "Genres", disableSorting: true },
  ];
  const [data, setData] = useState({
    movie: {},
    hall: {},
    projectionTime: [],
    price: 0,
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      movie: {
        ...prevData.movie,
        startTime: dates.startTime,
        endTime: dates.endTime,
      },
    }));
  }, [dates.startTime, dates.endTime]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleHallSelection = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setData((prevState) => ({
        ...prevState,
        hall: halls.find((hall) => hall.hallID === parseInt(value)),
      }));
      setTableHall((currentHalls) =>
        currentHalls.map((hall) => ({
          ...hall,
          checked: hall.hallID === parseInt(value),
        }))
      );
    } else {
      setData((prevState) => ({
        ...prevState,
        hall: {},
      }));
      setTableHall((currentHalls) =>
        currentHalls.map((hall) => ({
          ...hall,
          checked: false,
        }))
      );
    }
  };

  const handleMovieSelection = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setData((prevState) => ({
        ...prevState,
        movie: movies.find((movie) => movie.movieID === parseInt(value)),
      }));

      setTableMovie((currentMovies) =>
        currentMovies.map((movie) => ({
          ...movie,
          checked: movie.movieID === parseInt(value),
        }))
      );
    } else {
      setData((prevState) => ({
        ...prevState,
        movie: {},
      }));
      setTableMovie((currentMovies) =>
        currentMovies.map((movie) => ({
          ...movie,
          checked: false,
        }))
      );
    }
  };

  const handleDateChange = (name, value) => {
    setDates((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name == "startTime") {
      setDates((prevState) => ({
        ...prevState,
        endTime: value,
      }));
    }
  };

  const handleTimeSelection = () => {
    if (
      dates.startTime.isAfter(dates.endTime) ||
      dates.startTime.isSame(dates.endTime)
    ) {
      warning("Start date should be before end date");
      return;
    }
    if (
      Object.keys(data.hall).length === 0 ||
      Object.keys(data.movie).length === 0
    ) {
      warning("Please select movie and hall");
      return;
    }
    setOpenPopup(true);
  };

  const handleChange = (name, value) => {
    setErrors((prevState) => ({
      ...prevState,
      price: { error: false, message: "" },
    }));
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectedTime = (newTime) => {
    setOpenPopup(false);

    setData((prevState) => ({
      ...prevState,
      projectionTime: [newTime],
    }));
  };

  const handleSaveProjections = () => {
    if (
      Object.keys(data.hall).length === 0 ||
      Object.keys(data.movie).length === 0
    ) {
      warning("Please select movie and hall");
      return;
    }
    if (
      dates.startTime.isAfter(dates.endTime) ||
      dates.startTime.isSame(dates.endTime)
    ) {
      warning("Start date should be before end date");
      return;
    }
    if (data.projectionTime.length === 0) {
      warning("Please select projection time");
      return;
    }
    if (parseInt(data.price) <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        price: { error: true, message: "Price should be greater than 0" },
      }));
      return;
    }

    dispatch(projectionsActions.createProjection(data));
  };

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      <Paper
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tableMovie.length > 0 ? (
          <>
            <AddHeader
              title={"Select movie"}
              icon={<MovieIcon fontSize="large" />}
            />
            <div style={{ marginTop: "20px" }}>
              <Table
                data={tableMovie}
                filterFn={filterFn}
                objectKey="movieID"
                fields={movieFields}
                headCells={movieHeadCells}
                selection={true}
                setEditObj={handleMovieSelection}
                hideChecked={true}
              />
            </div>
            <AddHeader
              title={"Select hall"}
              icon={<ChairIcon fontSize="large" />}
            />
            <div style={{ marginTop: "20px" }}>
              <Table
                data={tableHall}
                filterFn={filterFn}
                objectKey="hallID"
                fields={hallFields}
                headCells={headCells}
                selection={true}
                setEditObj={handleHallSelection}
                hideChecked={true}
              />
            </div>
            <div style={{ display: "flex", width: "80%", columnGap: 20 }}>
              <DatePicker
                name="startTime"
                minDate={new dayjs().add(1, "day")}
                value={dayjs(dates.startTime)}
                onChange={(newValue) => handleDateChange("startTime", newValue)}
                sx={{ marginBottom: "20px" }}
                label="Select start date"
              />
              <DatePicker
                minDate={dayjs(dates.startTime)}
                value={dayjs(dates.endTime)}
                onChange={(newValue) => handleDateChange("endTime", newValue)}
                sx={{ marginBottom: "20px" }}
                label="Select end date"
              />
            </div>
            <Input
              label="Price (in RSD)"
              name="price"
              value={data.price}
              onChange={handleChange}
              type="number"
              sx={{ marginTop: "20px", width: "200px", marginBottom: "20px" }}
              error={errors.price}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <span>
                {data.projectionTime.length !== 0
                  ? `Selected time: ${data.projectionTime}`
                  : "No time selected"}
              </span>
            </div>

            <Button
              variant="contained"
              color="primary"
              sx={{ width: "200px" }}
              onClick={handleTimeSelection}
            >
              Select projection time
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "200px" }}
              onClick={handleSaveProjections}
            >
              Save projections
            </Button>
          </>
        ) : (
          <h3>There are no movies to save their projections</h3>
        )}
      </Paper>
      <Popup openPopup={openPopup} setOpen={setOpenPopup}>
        <ProjectionTimes
          hallID={data?.hall?.hallID}
          date={formatDate(dates.startTime.toDate())}
          endDate={formatDate(dates.endTime.toDate())}
          setNewTime={handleSelectedTime}
          duration={data?.movie?.duration}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </div>
  );
};

export default CreateProjections;
