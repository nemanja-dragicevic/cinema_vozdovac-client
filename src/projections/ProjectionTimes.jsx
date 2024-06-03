import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Input from "../registration/Input";
import * as projectionsActions from "../actions/projections";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const parseTime = (timeString) => dayjs(timeString, "HH:mm");

const ProjectionTimes = ({ hallID, date, duration, setNewTime }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectionsActions.getTimeForHallID(date, hallID));
  }, [dispatch]);

  const durationInHours = Math.ceil(duration / 60);

  const { times } = useSelector((state) => state.projectionsReducer);
  const [errors, setErrors] = useState({
    error: false,
    message: "",
  });

  const myDuration =
    Math.floor(duration / 60) + " hours" + (duration % 60) + " minutes";

  const generateDisabledTimes = (rangeTime) => {
    let disabledTimes = [];
    rangeTime.forEach((range) => {
      let start = parseTime(range.start);
      let end = parseTime(range.end);

      while (start.isBefore(end) || start.isSame(end)) {
        disabledTimes.push(start.format("HH:mm"));
        start = start.add(1, "minute");
      }
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
    if (disabledTimes.includes(formattedTime)) {
      setErrors({
        error: true,
        message: "Time is taken",
      });
    } else {
      setErrors({
        error: false,
        message: "",
      });
    }
  };

  const onCheckTime = () => {
    if (!errors.error) {
      setNewTime();
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
        minTime={dayjs().set("hour", 12)}
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
