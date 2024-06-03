import { Button, Paper } from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import Table from "../reusable/Table";
import { useEffect, useState } from "react";
import TableSearch from "../components/TableSearch";
import * as hallActions from "../actions/hall";
import { useDispatch, useSelector } from "react-redux";
import AddHeader from "../reusable/AddHeader";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Input from "../registration/Input";
import Popup from "../reusable/Popup";
import ProjectionTimes from "./ProjectionTimes";
import { formatDate } from "../utils/date";

const ProjectionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { halls } = useSelector((state) => state.hallReducer);
  const { projection } = useSelector((state) => state.projectionsReducer);

  useEffect(() => {
    dispatch(hallActions.getHalls());
  }, [dispatch]);

  const fields = ["hallName", "rowsCount", "seatsPerRow"];
  const [tableHalls, setTableHalls] = useState(halls);
  const [workingHall, setWorkingHall] = useState(0);
  const headCells = [
    { id: "hallName", label: "Hall name" },
    { id: "rowsCount", label: "Rows count", disableSorting: true },
    { id: "seatsPerRow", label: "Seats per row", disableSorting: true },
  ];
  const [popup, setPopup] = useState(false);
  // const [tableHalls, setTableHalls] = useState([]);
  const [data, setData] = useState(projection);
  const [errors, setErrors] = useState({
    price: { error: false, message: "" },
  });
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    if (halls.length > 0) {
      setTableHalls(
        halls.map((hall) => {
          return {
            hallID: hall.hallID,
            hallName: hall.hallName,
            rowsCount: hall.rowsCount,
            seatsPerRow: hall.seatsPerRow,
            checked: hall.hallID === projection?.hall?.hallID ? true : false,
          };
        })
      );
    }
  }, [halls]);

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

  const resetErrors = () => {
    setErrors({
      price: { error: false, message: "" },
    });
  };

  const handleReset = () => {
    resetErrors();
    setData(projection);
  };

  const handleHallSelection = (e) => {
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked);
    setWorkingHall(value);
    setPopup(true);
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
        start = start.add(15, "minute");
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
    // console.log(formattedTime);
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

  const handleSetNewTime = () => {
    setPopup(false);
    // setTableHalls(
    //   tableHalls.map((hall) => {
    //     if (hall.hallID === parseInt(value)) {
    //       return { ...hall, checked: true };
    //     } else {
    //       return { ...hall, checked: false };
    //     }
    //   })
    // );
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
          title={
            "Select a hall, time and price for movie " + projection?.movie.name
          }
          icon={<TheatersIcon fontSize="large" />}
        />
        <TableSearch
          label="Select a hall"
          searching={true}
          handleSearch={handleSearch}
        />
        <Table
          data={tableHalls}
          filterFn={filterFn}
          objectKey="hallID"
          fields={fields}
          headCells={headCells}
          selection={true}
          setEditObj={handleHallSelection}
        />
        <Input
          label="Price (in RSD)"
          name="price"
          value={data.price}
          onChange={handleChange}
          type="number"
          sx={{ marginTop: "20px", width: "200px" }}
          error={errors.price}
        />
        <Button
          variant="contained"
          sx={{ marginTop: "20px", width: "200px" }}
          onClick={() => setPopup(true)}
        >
          Set projection time
        </Button>

        <div
          style={{
            display: "flex",
            columnGap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={() => console.log(data, projection)}
          >
            Edit projection
          </Button>
          <Button
            variant="outlined"
            sx={{ marginTop: "20px" }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Paper>
      <Popup title="Check availability" openPopup={popup} setOpen={setPopup}>
        <ProjectionTimes
          hallID={workingHall}
          date={formatDate(new Date(data.projectTime))}
          duration={projection.movie.duration}
          setNewTime={handleSetNewTime}
        />
      </Popup>
    </div>
  );
};

export default ProjectionPage;
