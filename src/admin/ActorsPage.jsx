import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { Button, InputAdornment, Paper, Toolbar } from "@mui/material";
import { PeopleOutlineTwoTone, Search } from "@mui/icons-material";
import * as actorsActions from "../actions/actors";
import Table from "../reusable/Table";
import SearchInput from "../reusable/SearchInput";
import ActorForm from "../actor/ActorForm";
import ActorHeader from "../actor/ActorHeader";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../reusable/Popup";

const schema = Joi.object({
  actorID: Joi.number().integer().min(0).required(),
  firstName: Joi.string().min(2).max(30).required().label("First name"),
  lastName: Joi.string().min(2).max(30).required().label("Last name"),
  gender: Joi.string().required(),
});

const ActorsPage = () => {
  const dispatch = useDispatch();

  const initialFValues = {
    actorID: 0,
    firstName: "",
    lastName: "",
    gender: "MALE",
  };

  const [errors, setErrors] = useState({
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
  });

  const { actors } = useSelector((state) => state.actorsReducer);
  const [data, setData] = useState(initialFValues);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    dispatch(actorsActions.getActors());
  }, [dispatch]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const headCells = [
    { id: "firstName", label: "First name" },
    { id: "lastName", label: "Last name" },
    { id: "gender", label: "Gender", disableSorting: true },
  ];

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.firstName.toLowerCase().includes(target.value.toLowerCase()) ||
              x.lastName.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const resetErrors = () => {
    setErrors({
      firstName: { error: false, message: "" },
      lastName: { error: false, message: "" },
    });
  };

  const handleChange = (name, value) => {
    resetErrors();
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const setEditObj = (obj) => {
    resetErrors();
    setData(obj);
    setOpenPopup(true);
  };

  const openAddActor = () => {
    handleReset();
    setOpenPopup(true);
  };

  const handleReset = () => {
    setData(initialFValues);
  };

  const handleSave = (data) => {
    const validation = schema.validate(data);
    if (validation.error) {
      const error = validation.error.details[0].message;
      console.log(error);
      if (error.includes("First name")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: { error: true, message: error },
        }));
      } else if (error.includes("Last name")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: { error: true, message: error },
        }));
      }
      return;
    }
    resetErrors();
    if (data.actorID !== 0) dispatch(actorsActions.updateActor(data));
    else dispatch(actorsActions.saveActor(data));

    handleReset();
  };

  const handleDelete = (id) => {
    //console.log("Delete actor with id: ", id);
    dispatch(actorsActions.deleteActor(id));
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", marginTop: "50px" }}
    >
      <Paper>
        <ActorHeader
          title="New actor"
          icon={<PeopleOutlineTwoTone fontSize="large" />}
        />
        {/* <ActorForm
          onSave={handleSave}
          errors={errors}
          data={data}
          onChange={handleChange}
          onReset={handleReset}
          onGenderChange={handleGenderChange}
        /> */}
        <Toolbar sx={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
          <SearchInput
            label="Search actors"
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
            onClick={() => openAddActor()}
          >
            Add new
          </Button>
        </Toolbar>

        <Table
          headCells={headCells}
          data={actors}
          filterFn={filterFn}
          onDelete={handleDelete}
          setEditObj={setEditObj}
        />
      </Paper>
      <Popup openPopup={openPopup} setOpen={setOpenPopup} title="Actor Form">
        <ActorForm
          onSave={handleSave}
          errors={errors}
          data={data}
          onChange={handleChange}
          onReset={handleReset}
          onGenderChange={handleGenderChange}
        />
      </Popup>
    </div>
  );
};

export default ActorsPage;
