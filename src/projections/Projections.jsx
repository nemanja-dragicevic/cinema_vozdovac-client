import { Button, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import TheatersIcon from "@mui/icons-material/Theaters";
import Table from "../reusable/Table";
import { useEffect, useState } from "react";
import * as hallActions from "../actions/hall";
import { useDispatch, useSelector } from "react-redux";
import AddHeader from "../reusable/AddHeader";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import * as projectionsActions from "../actions/projections";
import Popup from "../reusable/Popup";

const Projections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchDate, setSearchDate] = useState(
    new dayjs().add(1, "day").toDate()
  );

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const { projections } = useSelector((state) => state.projectionsReducer);

  useEffect(() => {
    const formattedDate = formatDate(searchDate);
    dispatch(projectionsActions.getProjectionsForMovieID(formattedDate));
  }, [dispatch, searchDate]);

  const fields = [
    "movie.name",
    "hall.hallName",
    "projectTime",
    "projectEnd",
    "price",
  ];
  const headCells = [
    { id: "movie.name", label: "Movie name" },
    { id: "hallName", label: "Hall name" },
    { id: "projectTime", label: "Projection start" },
    { id: "projectEnd", label: "Projection end" },
    { id: "price", label: "Price" },
  ];
  const [popup, setPopup] = useState(false);
  const [tableHalls, setTableHalls] = useState([]);
  const [data, setData] = useState();
  const [errors, setErrors] = useState({
    price: { error: false, message: "" },
    time: { error: false, message: "" },
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

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleDateChange = (value) => {
    setSearchDate(value.toDate());
  };

  const handleHallSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setData({ ...data, hall: value });
      setPopup(true);
    } else {
      setData({ ...data, hall: 0 });
      setTableHalls(
        tableHalls.map((hall) => {
          if (hall.hallID === parseInt(value)) {
            return { ...hall, checked: false };
          } else {
            return hall;
          }
        })
      );
    }
  };

  const resetErrors = () => {
    setErrors({
      price: { error: false, message: "" },
    });
  };

  const handleReset = () => {
    resetErrors();
  };

  const handleCheckAvailability = () => {
    // dispatch()
  };

  let rangeTime = [
    { startTime: "13:00", endTime: "14:59" },
    { startTime: "20:01", endTime: "22:00" },
  ];

  const parseTime = (timeString) => dayjs(timeString, "HH:mm");

  const generateDisabledTimes = (rangeTime) => {
    let disabledTimes = [];
    rangeTime.forEach((range) => {
      let start = parseTime(range.startTime);
      let end = parseTime(range.endTime);

      while (start.isBefore(end) || start.isSame(end)) {
        disabledTimes.push(start.format("HH:mm"));
        start = start.add(1, "minute");
      }
    });
    return disabledTimes;
  };

  const disabledTimes = generateDisabledTimes(rangeTime);

  const shouldDisableTime = (timeValue, clockType) => {
    if (clockType === "hours") return false;
    const formattedTime = timeValue.format("HH:mm");
    return disabledTimes.includes(formattedTime);
  };

  const handleTimeChange = (name) => (value) => {
    const formattedTime = value.format("HH:mm");
    if (disabledTimes.includes(formattedTime)) {
      setErrors({
        ...errors,
        [name]: { error: true, message: "Time is taken" },
      });
    } else {
      setErrors({
        ...errors,
        [name]: { error: false, message: "" },
      });
    }
  };

  const handleEdit = (item) => {
    dispatch(projectionsActions.setProjection(item.id));
    navigate("/projection_edit/" + item.id);
    // setData(item);
    // navigate("/movie_edit/" + item.movieID);
  };

  const handleDelete = (id) => {
    console.log(id);
    // dispatch(projectionsActions.deleteProjection(id));
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
        <AddHeader
          title={"Movie projections "}
          icon={<TheatersIcon fontSize="large" />}
        />

        <div style={{ marginTop: "50px" }}>
          <DatePicker
            minDate={new dayjs().add(1, "day")}
            value={dayjs(searchDate)}
            onChange={(newValue) => handleDateChange(newValue)}
            sx={{ marginBottom: "20px" }}
            label="Select projections date"
          />
          <Table
            data={projections}
            headCells={headCells}
            fields={fields}
            objectKey={"id"}
            selection={false}
            filterFn={filterFn}
            onDelete={handleDelete}
            setEditObj={handleEdit}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Add projection
        </Button>
      </Paper>
      <Popup
        title="Check availability"
        openPopup={popup}
        setOpenPopup={setPopup}
      >
        <h1>Check availability</h1>
      </Popup>
    </div>
  );
};

export default Projections;
