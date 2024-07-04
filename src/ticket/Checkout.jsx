import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "../reusable/Table";
import { useState } from "react";
import AddHeader from "../reusable/AddHeader";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import * as ticketActions from "../actions/tickets";

const Checkout = () => {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.ticketReducer);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const objectKey = "seatId";
  const fields = ["movieInfo", "hallName", "projectionTime", "row", "seat"];
  const headCells = [
    { id: "movieInfo", label: "Movie name" },
    { id: "hallName", label: "Hall name" },
    { id: "projectionTime", label: "Projection time", disableSorting: true },
    { id: "row", label: "Row", disableSorting: true },
    { id: "seat", label: "Seat", disableSorting: true },
  ];

  const handleDelete = (id, ...params) => {
    dispatch(ticketActions.removeSelection(id, params[0][0]));
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
          title={"Checkout tickets"}
          icon={<ShoppingCartCheckoutIcon fontSize="large" />}
        />
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Table
            headCells={headCells}
            data={checkout}
            filterFn={filterFn}
            onDelete={handleDelete}
            // setEditObj={setEditObj}
            objectKey={objectKey}
            fields={fields}
            selection={false}
            deleteMoreData={["projectionId"]}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Checkout;
