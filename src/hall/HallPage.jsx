import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import { Button, InputAdornment, Paper, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Joi from "joi";
import * as hallActions from "../actions/hall";
import HallForm from "./HallForm";
import Table from "../reusable/Table";
import AddHeader from "../reusable/AddHeader";
import Popup from "../reusable/Popup";
import SearchInput from "../reusable/SearchInput";

const schema = Joi.object({
  hallID: Joi.number().integer().min(0).required(),
  hallName: Joi.string().min(2).max(30).required().label("Hall name"),
  rowsCount: Joi.number().integer().min(1).required().label("Rows count"),
  seatsPerRow: Joi.number().integer().min(1).required().label("Seats per row"),
});

const HallPage = () => {
  const dispatch = useDispatch();

  const { halls } = useSelector((state) => state.hallReducer);
  const objectKey = "hallID";
  const fields = ["hallName", "rowsCount", "seatsPerRow"];
  const [errors, setErrors] = useState({
    hallName: { error: false, message: "" },
    rowsCount: { error: false, message: "" },
    seatsPerRow: { error: false, message: "" },
  });
  const initialFValues = {
    hallID: 0,
    hallName: "",
    rowsCount: "",
    seatsPerRow: "",
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState(initialFValues);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    dispatch(hallActions.getHalls());
  }, [dispatch]);

  const headCells = [
    { id: "hallName", label: "Hall name" },
    { id: "rowsCount", label: "Rows count", disableSorting: true },
    { id: "seatsPerRow", label: "Seats per row", disableSorting: true },
  ];

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.hallName.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const resetErrors = () => {
    setErrors({
      hallName: { error: false, message: "" },
      rowsCount: { error: false, message: "" },
      seatsPerRow: { error: false, message: "" },
    });
  };

  const handleChange = (name, value) => {
    resetErrors();
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openAddHall = () => {
    resetErrors();
    setData(initialFValues);
    setOpenPopup(true);
  };

  const handleReset = () => {
    resetErrors();
    setData(initialFValues);
  };

  const setEditObj = (item) => {
    resetErrors();
    setData(item);
    setOpenPopup(true);
  };

  const handleSave = (data) => {
    const { seats, ...fieldsToValidate } = data;
    const validation = schema.validate(fieldsToValidate);
    if (validation.error) {
      console.log(validation);
      const { details } = validation.error;
      const error = details[0].message;
      const field = details[0].path[0];
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: { error: true, message: error },
      }));
      return;
    }
    if (data.hallID === 0) {
      dispatch(hallActions.saveHall(data));
    } else {
      dispatch(hallActions.updateHall(data));
    }

    setOpenPopup(false);
  };

  const handleDelete = (id) => {
    dispatch(hallActions.deleteHall(id));
  };

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      <Paper sx={{ padding: 3 }}>
        <AddHeader
          title="Add Hall"
          icon={<ChairOutlinedIcon fontSize="large" />}
        />

        <Toolbar
          sx={{
            marginTop: 5,
            marginBottom: 3,
            display: "flex",
            flexDirection: "row",
            columnGap: 10,
          }}
        >
          <SearchInput
            label="Search halls by name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => openAddHall()}
          >
            Add new
          </Button>
        </Toolbar>

        <Table
          headCells={headCells}
          filterFn={filterFn}
          data={halls}
          objectKey={objectKey}
          fields={fields}
          onDelete={handleDelete}
          setEditObj={setEditObj}
        />
      </Paper>
      <Popup title="Hall Form" openPopup={openPopup} setOpen={setOpenPopup}>
        <HallForm
          data={data}
          errors={errors}
          onSave={handleSave}
          onChange={handleChange}
          onReset={handleReset}
        />
      </Popup>
    </div>
  );
};

export default HallPage;
