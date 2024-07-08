import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ticketActions from "../actions/tickets";
import Table from "../reusable/Table";

const TicketDetails = ({ ticketId, memberID, status, setOpenPopup }) => {
  const dispatch = useDispatch();

  const { ticketItems } = useSelector((state) => state.ticketReducer);

  useEffect(() => {
    dispatch(ticketActions.getTicketItems(ticketId));
  }, [dispatch]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const headCells = [
    { id: "projectDTO.movie.name", label: "Movie", disableSorting: true },
    {
      id: "projectDTO.projectTime",
      label: "Projection start",
      disableSorting: true,
    },
    {
      id: "projectDTO.projectEnd",
      label: "Projection end",
      disableSorting: true,
    },
    { id: "projectDTO.price", label: "Price", disableSorting: true },
    { id: "seatDTO.rowNumber", label: "Row", disableSorting: true },
    { id: "seatDTO.seatNumber", label: "Seat", disableSorting: true },
  ];
  const fields = [
    "projectDTO.movie.name",
    "projectDTO.projectTime",
    "projectDTO.projectEnd",
    "projectDTO.price",
    "seatDTO.rowNumber",
    "seatDTO.seatNumber",
  ];

  const handleRefundRequest = () => {
    setOpenPopup(false);
    dispatch(ticketActions.refundRequest(memberID, ticketId));
  };

  const handleRefund = () => {
    setOpenPopup(false);
    dispatch(ticketActions.refundTicket(ticketId));
  };

  return (
    <div style={{ padding: "20px", marginTop: "10px" }}>
      <Paper sx={{ padding: 3 }}>
        <Table
          headCells={headCells}
          data={ticketItems}
          objectKey={"ticketItems.id"}
          fields={fields}
          filterFn={filterFn}
          setFilterFn={setFilterFn}
          buttons={false}
        />
        {memberID !== null && status === "PAID" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleRefundRequest}
          >
            Refund
          </Button>
        ) : memberID === null ? (
          <Button variant="contained" color="primary" onClick={handleRefund}>
            Refund
          </Button>
        ) : null}
      </Paper>
    </div>
  );
};

export default TicketDetails;
