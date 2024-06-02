import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Input from "../registration/Input";

const ProjectionTimes = ({
  // hallID,
  duration,
  // onCheckAvailability,
  errors,
  handleTimeChange,
  rangeTime,
  shouldDisableTime,
}) => {
  const durationInHours = Math.ceil(duration / 60);

  const myDuration =
    Math.floor(duration / 60) + " hours" + (duration % 60) + " minutes";
  console.log(myDuration);

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: 20 }}>
      <div>
        Taken times:
        {rangeTime.map((range, index) => (
          <div key={index}>
            {range.startTime} - {range.endTime}
          </div>
        ))}
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
      {/*<Button variant="contained" color="primary" onClick={onCheckAvailability}>
        Check availability
      </Button> */}
    </div>
  );
};

export default ProjectionTimes;
