import { Button, Paper } from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Table from "../reusable/Table";
import TableSearch from "../components/TableSearch";
import * as hallActions from "../actions/hall";
import AddHeader from "../reusable/AddHeader";
import Input from "../registration/Input";
import Popup from "../reusable/Popup";
import ProjectionTimes from "./ProjectionTimes";
import { formatDate } from "../utils/date";
import * as projectionsActions from "../actions/projections";
import ConfirmDialog from "../reusable/ConfirmDialog";

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
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
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
            display:
              hall.hallID === projection?.hall?.hallID
                ? getTimeFromDateTime(projection.projectTime)
                : "",
            checked: hall.hallID === projection?.hall?.hallID ? true : false,
          };
        })
      );
    }
  }, [halls]);

  const getTimeFromDateTime = (dateTime) => {
    if (dateTime.includes("T")) {
      const time = dateTime.split("T")[1];
      return time;
    } else return dateTime;
  };

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
    setTableHalls(
      tableHalls.map((hall) => {
        if (hall.hallID === projection?.hall?.hallID) {
          return {
            ...hall,
            checked: true,
            display: getTimeFromDateTime(projection.projectTime),
          };
        } else {
          return { ...hall, checked: false, display: "" };
        }
      })
    );
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
  // const shouldDisableTime = (timeValue, clockType) => {
  //   if (clockType === "hours") return false;
  //   const formattedTime = timeValue.format("HH:mm");
  //   return disabledTimes.includes(formattedTime);
  // };

  const handleTimeChange = (name) => (value) => {
    const formattedTime = value.format("HH:mm");
    // console.log(formattedTime);
    if (disabledTimes.includes(formattedTime)) {
      setErrors({
        ...errors,
        [name]: { error: true, message: "Time not available" },
      });
    } else {
      setErrors({
        ...errors,
        [name]: { error: false, message: "" },
      });
    }
  };

  const setProjectTime = (newTime) => {
    const currentDateTime = projection.projectTime;

    // Parse the current date and time into a dayjs object
    let dateTime = dayjs(currentDateTime);

    // Extract hours and minutes from the new time string
    const [newHours, newMinutes] = newTime.split(":").map(Number);

    // Update the dateTime with the new time
    dateTime = dateTime.hour(newHours).minute(newMinutes).second(0);

    return dateTime;
  };

  const handleSetNewTime = (value) => {
    setPopup(false);
    setTableHalls(
      tableHalls.map((hall) => {
        if (hall.hallID === parseInt(workingHall)) {
          return {
            ...hall,
            display: getTimeFromDateTime(value),
            checked: true,
          };
        } else {
          return { ...hall, checked: false };
        }
      })
    );
    const dateTime = setProjectTime(value);
    setData({
      ...data,
      hall: halls.find((hall) => hall.hallID === parseInt(workingHall)),
      projectTime: dateTime.format("YYYY-MM-DDTHH:mm:ss"),
      projectEnd: dateTime
        .add(projection.movie.duration, "minute")
        .format("YYYY-MM-DDTHH:mm:ss"),
    });
  };

  const handleSaveEdit = () => {
    // console.log(data);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(projectionsActions.editProjection(data));
    navigate("/projections");
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
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                title: "Save changes",
                subTitle: "Are you sure you want to save changes?",
                onConfirm: handleSaveEdit,
              })
            }
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirm={setConfirmDialog}
      />
    </div>
  );
};

export default ProjectionPage;
