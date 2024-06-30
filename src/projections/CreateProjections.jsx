import { Button, Paper } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";
import MovieIcon from "@mui/icons-material/Movie";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import * as hallActions from "../actions/hall";
import * as movieActions from "../actions/movies";
import Table from "../reusable/Table";
import Popup from "../reusable/Popup";
import AddHeader from "../reusable/AddHeader";
import ProjectionTimes from "./ProjectionTimes";
import { warning } from "../utils/notification";
import { formatDate } from "./../utils/date";

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
  const [time, setTime] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [dates, setDates] = useState({
    startDate: new dayjs().add(1, "day"),
    endDate: new dayjs().add(1, "day"),
  });
  const [workingMovieHall, setWorkingMovieHall] = useState({
    hallID: 0,
    movieID: 0,
  });
  const movieFields = ["name", "duration", "genres"];
  const movieHeadCells = [
    { id: "name", label: "Movie name" },
    { id: "duration", label: "Duration" },
    { id: "genres", label: "Genres", disableSorting: true },
  ];

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleHallSelection = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setWorkingMovieHall((prevState) => ({
        ...prevState,
        hallID: value,
      }));
      setTableHall((currentHalls) =>
        currentHalls.map((hall) => ({
          ...hall,
          checked: hall.hallID === parseInt(value),
        }))
      );
    } else {
      setWorkingMovieHall((prevState) => ({
        ...prevState,
        hallID: 0,
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
      setWorkingMovieHall((prevState) => ({
        ...prevState,
        movieID: value,
      }));
      setTableMovie((currentMovies) =>
        currentMovies.map((movie) => ({
          ...movie,
          checked: movie.movieID === parseInt(value),
        }))
      );
    } else {
      setWorkingMovieHall((prevState) => ({
        ...prevState,
        movieID: 0,
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
    if (name == "startDate") {
      setDates((prevState) => ({
        ...prevState,
        endDate: value,
      }));
    }
  };

  const handleTimeSelection = () => {
    if (
      dates.startDate.isAfter(dates.endDate) ||
      dates.startDate.isSame(dates.endDate)
    ) {
      warning("Start date should be before end date");
      return;
    }
    if (workingMovieHall.hallID === 0 || workingMovieHall.movieID === 0) {
      warning("Please select movie and hall");
      return;
    }
    setOpenPopup(true);
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
                name="startDate"
                minDate={new dayjs().add(1, "day")}
                value={dayjs(dates.startDate)}
                onChange={(newValue) => handleDateChange("startDate", newValue)}
                sx={{ marginBottom: "20px" }}
                label="Select start date"
              />
              <DatePicker
                minDate={dayjs(dates.startDate)}
                value={dayjs(dates.endDate)}
                onChange={(newValue) => handleDateChange("endDate", newValue)}
                sx={{ marginBottom: "20px" }}
                label="Select end date"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <span>
                {time ? "Selected time:" + { time } : "No time selected"}
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
          </>
        ) : (
          <h3>No movies to project</h3>
        )}
      </Paper>
      <Popup openPopup={openPopup} setOpen={setOpenPopup}>
        <ProjectionTimes
          hallID={workingMovieHall.hallID}
          time={time}
          date={formatDate(dates.startDate.toDate())}
          endDate={formatDate(dates.endDate.toDate())}
          setTime={setTime}
          duration={
            movies.find(
              (movie) => movie.movieID === parseInt(workingMovieHall.movieID)
            )?.duration
          }
          workingMovieHall={workingMovieHall}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </div>
  );
};

export default CreateProjections;
