import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Input from "../registration/Input";
import * as projectionsActions from "../actions/projections";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { error } from "../utils/notification";

const parseTime = (timeString) => dayjs(timeString, "HH:mm");

const ProjectionTimes = ({ hallID, date, endDate, duration, setNewTime }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!endDate)
      dispatch(projectionsActions.getTimeForHallAndDate(date, hallID));
    else {
      dispatch(projectionsActions.getTimeForHallID(hallID, date, endDate));
    }
  }, [dispatch]);

  const durationInHours = Math.ceil(duration / 60);

  const { times } = useSelector((state) => state.projectionsReducer);
  const [editedTime, setEditedTime] = useState("");
  const [errors, setErrors] = useState({
    error: false,
    message: "",
  });

  const myDuration = Math.floor(duration / 60) + " " + (duration % 60);

  const generateDisabledTimes = (rangeTime) => {
    let disabledTimes = [];
    rangeTime.forEach((range) => {
      let start = parseTime(range.start);
      let end = parseTime(range.end);

      const startTimeMinusDuration = start
        .subtract(duration, "minute")
        .subtract(15, "minute");
      while (start.isAfter(startTimeMinusDuration)) {
        disabledTimes.push(start.format("HH:mm"));
        start = start.subtract(1, "minute");
      }

      while (start.isBefore(end) || start.isSame(end)) {
        disabledTimes.push(start.format("HH:mm"));
        start = start.add(1, "minute");
      }
      const endTimePlus30Minutes = end.add(15, "minute");
      while (
        start.isBefore(endTimePlus30Minutes) ||
        start.isSame(endTimePlus30Minutes)
      ) {
        disabledTimes.push(start.format("HH:mm"));
        start = start.add(1, "minute");
      }
      disabledTimes.push("00:00");
    });
    return disabledTimes;
  };

  const disabledTimes = generateDisabledTimes(times);

  const shouldDisableTime = (timeValue, clockType) => {
    if (clockType === "hours") return false;
    const formattedTime = timeValue.format("HH:mm");
    return disabledTimes.includes(formattedTime);
  };

  const handleTimeChange = (time) => {
    const formattedTime = time.format("HH:mm");
    const minTime = dayjs()
      .set("hour", 12)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0);
    const maxTime = dayjs()
      .set("hour", 23 - durationInHours)
      .set("minute", 0);

    if (time.isBefore(minTime) || time.isAfter(maxTime)) {
      setErrors({
        error: true,
        message: `Time should be between ${minTime.format(
          "HH:mm"
        )} and ${maxTime.format("HH:mm")}`,
      });
    } else if (disabledTimes.includes(formattedTime)) {
      setErrors({
        error: true,
        message: "Time not available",
      });
    } else {
      setEditedTime(formattedTime);
      setErrors({
        error: false,
        message: "",
      });
    }
  };

  const onCheckTime = () => {
    if (!editedTime) {
      error("Please select a time");
      return;
    }
    if (errors.error) {
      error("Time not available");
      return;
    }
    if (!errors.error) {
      setNewTime(editedTime);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: 20 }}>
      <div>
        Taken times:
        {times.length > 0 ? (
          times.map((range, index) => (
            <div key={index}>
              {range.start} - {range.end}
            </div>
          ))
        ) : (
          <div>No taken times</div>
        )}
      </div>
      <TimePicker
        label="Select projection time"
        timeSteps={{ minutes: 15 }}
        minTime={dayjs().set("hour", 12).set("minute", 0)}
        maxTime={dayjs().set("hour", 23 - durationInHours)}
        shouldDisableTime={shouldDisableTime}
        onChange={handleTimeChange}
        // slotProps={{ textField: { error: errors } }}
        slotProps={{
          textField: {
            error: errors.error,
            helperText: errors.message,
          },
        }}
      />
      <Button variant="contained" color="primary" onClick={onCheckTime}>
        Set time
      </Button>
    </div>
  );
};

export default ProjectionTimes;
