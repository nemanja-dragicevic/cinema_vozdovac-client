import { Paper } from "@mui/material";
import AddHeader from "../reusable/AddHeader";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as projectionsActions from "../actions/projections";

const Ticket = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [searchDate, setSearchDate] = useState(new dayjs().toDate());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const formattedDate = formatDate(searchDate);
    console.log(formattedDate);
    dispatch(
      projectionsActions.getProjectionsForDateAndMovie(formattedDate, id)
    );
  }, [dispatch, searchDate]);

  const handleDateChange = (value) => {
    if (
      value.isBefore(new dayjs()) ||
      value.isAfter(new dayjs().add(2, "day"))
    ) {
      return;
    }

    setSearchDate(value.toDate());
    console.log(searchDate);
  };

  return (
    <div style={{ padding: "20px", marginTop: "10px" }}>
      <Paper
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AddHeader
          title={"Choose your seat(s)"}
          icon={<BookOnlineIcon fontSize="large" />}
        />

        <div style={{ marginTop: "50px" }}>
          <DatePicker
            minDate={new dayjs()}
            maxDate={new dayjs().add(2, "day")}
            value={dayjs(searchDate)}
            onChange={(newValue) => handleDateChange(newValue)}
            sx={{ marginBottom: "20px" }}
            label="Select projections date"
          />
        </div>
      </Paper>
    </div>
  );
};

export default Ticket;
