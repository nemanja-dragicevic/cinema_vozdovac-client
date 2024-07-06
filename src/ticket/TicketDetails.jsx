import { Button, Paper } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ticketActions from "../actions/tickets";

const TicketDetails = ({ ticketId }) => {
  const dispatch = useDispatch();

  const { ticketItems } = useSelector((state) => state.ticketReducer);

  useEffect(() => {
    dispatch(ticketActions.getTicketItems(ticketId));
  }, [dispatch]);

  console.log(ticketItems);

  return (
    <div style={{ padding: "20px", marginTop: "10px" }}>
      <Paper sx={{ padding: 3 }}>
        Ticket Details
        <Button variant="contained" color="primary">
          Refund
        </Button>
      </Paper>
    </div>
  );
};

export default TicketDetails;
