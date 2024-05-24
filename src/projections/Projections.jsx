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
import Input from "../registration/Input";
import Popup from "../reusable/Popup";
import ProjectionTimes from "./ProjectionTimes";

const Projections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { halls } = useSelector((state) => state.hallReducer);
  const { movie } = useSelector((state) => state.moviesReducer);

  const initialFValues = {
    movie: movie,
    hall: 0,
    projectionTime: [],
    price: 0,
  };

  useEffect(() => {
    dispatch(hallActions.getHalls());
  }, [dispatch]);

  useEffect(() => {
    if (halls.length > 0) {
      setTableHalls(
        halls.map((hall) => {
          return {
            hallID: hall.hallID,
            hallName: hall.hallName,
            rowsCount: hall.rowsCount,
            seatsPerRow: hall.seatsPerRow,
            checked: false,
          };
        })
      );
    }
  }, [halls]);

  const fields = ["hallName", "rowsCount", "seatsPerRow"];
  const headCells = [
    { id: "hallName", label: "Hall name" },
    { id: "rowsCount", label: "Rows count", disableSorting: true },
    { id: "seatsPerRow", label: "Seats per row", disableSorting: true },
  ];
  const [popup, setPopup] = useState(false);
  const [tableHalls, setTableHalls] = useState([]);
  const [data, setData] = useState(initialFValues);
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

  const handleDateChange = (name) => (value) => {
    setData({
      ...data,
      movie: { ...data.movie, name: dayjs(value).format("D/MM/YYYY") },
    });
  };

  const handleHallSelection = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    console.log(checked);

    if (checked) {
      setData({ ...data, hall: value });
      // setTableHalls(
      //   tableHalls.map((hall) => {
      //     if (hall.hallID === parseInt(value)) {
      //       return { ...hall, checked: true };
      //     } else {
      //       return { ...hall, checked: false };
      //     }
      //   })
      // );
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
    setData(initialFValues);
  };

  const handleCheckAvailability = () => {
    // dispatch()
  };

  let rangeTime = [
    { startTime: "13:00", endTime: "14:59" },
    { startTime: "20:01", endTime: "22:00" },
  ];

  const parseTime = (timeString) => dayjs(timeString, "HH:mm");

  // Function to generate a list of disabled times
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

  // Function to check if a given time should be disabled
  const shouldDisableTime = (timeValue, clockType) => {
    if (clockType === "hours") return false;
    const formattedTime = timeValue.format("HH:mm");
    return disabledTimes.includes(formattedTime);
  };

  const handleTimeChange = (name) => (value) => {
    const formattedTime = value.format("HH:mm");
    console.log(formattedTime);
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
          title={"Select a hall and dates for movie " + movie?.name}
          icon={<TheatersIcon fontSize="large" />}
        />
      </Paper>
    </div>
  );
};

export default Projections;
