import { Paper } from "@mui/material";
import AddHeader from "../reusable/AddHeader";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as projectionsActions from "../actions/projections";
import ChairIcon from "@mui/icons-material/Chair";

const Ticket = ({ projection }) => {
  // const { id } = useParams();
  const dispatch = useDispatch();

  // const { rowsCount, seatsPerRow } = projection.hall;

  const [searchDate, setSearchDate] = useState(new dayjs().toDate());

  console.log(projection);

  useEffect(() => {
    // dispatch(projectionsActions.getProjectionsForMovie(id));
  }, [dispatch, searchDate]);

  // const generateRows = () => {
  //   const rows = [];
  //   for (let i = 1; i <= rowsCount; i++) {
  //     rows.push(
  //       <div key={i} className="row">
  //         <h3>Row {i}</h3>
  //         <div className="seat-row">{/* {generateSeats(i)} */}i</div>
  //       </div>
  //     );
  //   }
  //   return rows;
  // };

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
          title={"Select your seat(s)"}
          icon={<BookOnlineIcon fontSize="large" />}
        />
      </Paper>
    </div>
  );
};

export default Ticket;

// const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const handleDateChange = (value) => {
//   if (
//     value.isBefore(new dayjs()) ||
//     value.isAfter(new dayjs().add(2, "day"))
//   ) {
//     return;
//   }

//   setSearchDate(value.toDate());
//   console.log(searchDate);
// };
