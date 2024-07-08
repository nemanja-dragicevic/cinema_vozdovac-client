import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReceiptIcon from "@mui/icons-material/Receipt";
import * as ticketActions from "../actions/tickets";
import { Paper } from "@mui/material";
import AddHeader from "../reusable/AddHeader";
import Table from "../reusable/Table";
import Popup from "../reusable/Popup";
import TicketDetails from "../ticket/TicketDetails";

const RefundPage = () => {
  const dispatch = useDispatch();

  const { tickets } = useSelector((state) => state.ticketReducer);

  useEffect(() => {
    dispatch(ticketActions.getRefundRequests());
  }, [dispatch]);

  const [openPopup, setOpenPopup] = useState(false);
  const [ticketId, setTicketId] = useState(0);
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
    console.log(obj);
    setOpenPopup(true);
    setTicketId(obj.id);
  };

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      <Paper sx={{ padding: 3 }}>
        <AddHeader
          title="Refund requests"
          icon={<ReceiptIcon fontSize="large" />}
        />
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
          memberID={null}
          status={"UNDER_REVIEW"}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </div>
  );
};

export default RefundPage;
