import { Paper } from "@mui/material";
import AddHeader from "../reusable/AddHeader";
import Seat from "./Seat"; // Import your Seat component
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import * as projectionsActions from "../actions/projections";
import "../styles/ticket.css";
import ChairIcon from "@mui/icons-material/Chair";

const Ticket = ({ projection }) => {
  const { rowsCount, seatsPerRow } = projection.hall;
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(projectionsActions.getProjectionsForMovie(id));
  }, [dispatch]);

  const [seatState, setSeatState] = useState(
    Array(rowsCount)
      .fill()
      .map(() => Array(seatsPerRow).fill({ bought: false, selected: false }))
  );

  const [ticketItem, setTicketItem] = useState({
    projectId: projection.id,
    seatId: [],
    total: 0,
  });

  const toggleSeat = (row, seat) => {
    setSeatState((prevSeatState) => {
      const newSeatState = [...prevSeatState];
      newSeatState[row] = [...prevSeatState[row]];
      newSeatState[row][seat] = {
        ...prevSeatState[row][seat],
        selected: !prevSeatState[row][seat].selected,
      };
      return newSeatState;
    });

    setTicketItem((prevTicketItem) => {
      const newTicketItem = { ...prevTicketItem };
      const seatId = row * seatsPerRow + seat;
      const price = projection.price;

      if (!seatState[row][seat].selected) {
        newTicketItem.seatId.push(seatId);
        newTicketItem.total += price;
      } else {
        newTicketItem.seatId = newTicketItem.seatId.filter(
          (id) => id !== seatId
        );
        newTicketItem.total -= price;
      }
      return newTicketItem;
    });
  };

  const generateSeats = () => {
    let seats = [];
    for (let row = 0; row < rowsCount; row++) {
      let rowSeats = [];
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const isSelected = seatState[row][seat].selected;
        rowSeats.push(
          <Seat
            key={`seat-${row}-${seat}`}
            row={row}
            seat={seat}
            isSelected={isSelected}
            toggleSeat={toggleSeat}
            projection={projection}
          />
        );
      }
      seats.push(
        <div key={`row-${row}`} className="seat-row">
          <span className="rowNum">Row {row + 1}:</span> {rowSeats}
        </div>
      );
    }
    return seats;
  };

  const handleAddToCart = () => {
    console.log(ticketItem);
    // dispatch(projectionsActions.addTicketToCart(ticketItem));
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
          title={"Select available seats"}
          icon={<ChairIcon fontSize="large" />}
        />

        <div>
          <Paper
            sx={{
              marginTop: 2,
              backgroundColor: "lightgrey",
              textAlign: "center",
            }}
          >
            Canvas
          </Paper>
          {generateSeats()}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h5 className="totalPrice">Total price: {ticketItem.total} RSD</h5>
            <button className="reserve" onClick={handleAddToCart}>
              Reserve your seat
            </button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Ticket;
