import { Paper } from "@mui/material";
import AddHeader from "../reusable/AddHeader";
import Seat from "./Seat";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ticketActions from "../actions/tickets";
import "../styles/ticket.css";
import ChairIcon from "@mui/icons-material/Chair";
import { warning } from "../utils/notification";
import { dateDisplay } from "../utils/date";

const Ticket = ({ projection, closePopup }) => {
  const { rowsCount, seatsPerRow } = projection.hall;
  const dispatch = useDispatch();

  const { checkout, booked } = useSelector((state) => state.ticketReducer);

  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketItem, setTicketItem] = useState([]);
  const [seatState, setSeatState] = useState(
    Array(rowsCount)
      .fill()
      .map(() => Array(seatsPerRow).fill({ bought: false, selected: false }))
  );

  useEffect(() => {
    if (projection === null) return;
    dispatch(ticketActions.getBookedSeats(projection.id));
  }, [dispatch, projection]);

  const minSeatId = projection.hall.seats[0].id;

  useEffect(() => {
    setSeatState(
      Array(rowsCount)
        .fill()
        .map(() => Array(seatsPerRow).fill({ bought: false, selected: false }))
    );
    const selectedSeats = checkout.filter(
      (item) => item.projectionId === projection.id
    );
    // console.log(selectedSeats);

    console.log(booked);
    booked.forEach((item) => {
      const row = item.seatDTO.rowNumber - 1;
      const seatIndex = item.seatDTO.seatNumber - 1;
      setSeatState((prevSeatState) => {
        const newSeatState = [...prevSeatState];
        newSeatState[row] = [...prevSeatState[row]];
        newSeatState[row][seatIndex] = {
          ...prevSeatState[row][seatIndex],
          selected: false,
          bought: true,
        };
        return newSeatState;
      });
    });

    setTicketItem(selectedSeats);
    selectedSeats.forEach((item) => {
      const row = item.row - 1;
      const seatIndex = item.seat - 1;
      setSeatState((prevSeatState) => {
        const newSeatState = [...prevSeatState];
        newSeatState[row] = [...prevSeatState[row]];
        newSeatState[row][seatIndex] = {
          ...prevSeatState[row][seatIndex],
          selected: true,
          bought: false,
        };
        return newSeatState;
      });
    });
    setTotalPrice(selectedSeats.reduce((acc) => acc + projection.price, 0));
  }, [projection, booked, checkout]);

  const toggleSeat = (row, seat, seatId, isBooked) => {
    if (isBooked) return;
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
      const price = projection.price;

      if (!seatState[row][seat].selected) {
        const exists = prevTicketItem.some(
          (item) =>
            item.projectionId === projection.id && item.seatId === seatId
        );
        if (!exists) {
          prevTicketItem.push({
            projectionId: projection.id,
            seatId: seatId,
            row: row + 1,
            seat: seat + 1,
            movieInfo: projection.movie.name,
            hallName: projection.hall.hallName,
            projectionTime:
              dateDisplay(projection.projectTime) +
              " - " +
              dateDisplay(projection.projectEnd),
          });
        }
        setTotalPrice((prevPrice) => prevPrice + price);
      } else {
        prevTicketItem = prevTicketItem.filter(
          (item) => item.seatId !== seatId
        );
        setTotalPrice((prevPrice) => prevPrice - price);
      }
      return prevTicketItem;
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
            seatId={row * seatsPerRow + seat + minSeatId}
            isBooked={seatState[row][seat].bought}
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
    if (totalPrice === 0) {
      warning("You must select at least one seat");
      return;
    }
    console.log(ticketItem);
    dispatch(ticketActions.saveCheckoutTickets(ticketItem, projection.id));
    closePopup();
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
            <h5 className="totalPrice">
              Total price: {""}
              {totalPrice} {""}
              RSD
            </h5>
            <button className="reserve" onClick={handleAddToCart}>
              Reserve your seat(s)
            </button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Ticket;
