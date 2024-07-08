import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Paper } from "@mui/material";
import * as ticketActions from "../actions/tickets";
import AddHeader from "../reusable/AddHeader";
import Table from "../reusable/Table";
import Popup from "./../reusable/Popup";
import TicketDetails from "./TicketDetails";

const TicketHistory = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const { tickets } = useSelector((state) => state.ticketReducer);

  useEffect(() => {
    dispatch(ticketActions.getTickets(user.memberID));
  }, [dispatch]);

  const [ticketId, setTicketId] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const headCells = [
    { id: "id", label: "Ticket ID" },
    { id: "payinTime", label: "Payin time" },
    { id: "total", label: "Total" },
    { id: "totalSeats", label: "Total seats" },
    { id: "status", label: "Status", disableSorting: true },
  ];
  const fields = ["id", "payinTime", "total", "totalSeats", "status"];
  const objectKey = "id";

  const handleDetails = (obj) => {
    setOpenPopup(true);
    setTicketId(obj.id);
  };

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      <Paper sx={{ padding: 3 }}>
        <AddHeader title="History" icon={<ReceiptIcon fontSize="large" />} />
        <div style={{ marginTop: "20px" }}>
          <Table
            headCells={headCells}
            data={tickets}
            objectKey={objectKey}
            fields={fields}
            filterFn={filterFn}
            setFilterFn={setFilterFn}
            selection={false}
            details={true}
            setEditObj={handleDetails}
          />
        </div>
      </Paper>
      <Popup
        title="Ticket details"
        openPopup={openPopup}
        setOpen={setOpenPopup}
      >
        <TicketDetails
          ticketId={ticketId}
          memberID={user.memberID}
          status={tickets.find((ticket) => ticket.id === ticketId)?.status}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </div>
  );
};

export default TicketHistory;
