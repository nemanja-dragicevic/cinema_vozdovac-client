import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Input from "../registration/Input";
import * as projectionsActions from "../actions/projections";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProjectionTimes = ({
  hallID,
  date,
  duration,
  setNewTime,
  errors,
  handleTimeChange,
  // rangeTime,
  shouldDisableTime,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectionsActions.getTimeForHallID(date, hallID));
  }, [dispatch]);

  const durationInHours = Math.ceil(duration / 60);

  const { times } = useSelector((state) => state.projectionsReducer);

  console.log(times);
  const myDuration =
    Math.floor(duration / 60) + " hours" + (duration % 60) + " minutes";

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
        onChange={handleTimeChange("time")}
        // slotProps={{ textField: { error: errors } }}
        slotProps={{
          textField: {
            error: errors.error,
            helperText: errors.message,
          },
        }}
      />
      <Button variant="contained" color="primary" onClick={setNewTime}>
        Set time
      </Button>
    </div>
  );
};

export default ProjectionTimes;
