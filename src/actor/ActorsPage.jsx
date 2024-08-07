import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { Button, InputAdornment, Paper, Toolbar } from "@mui/material";
import { PeopleOutlineTwoTone, Search } from "@mui/icons-material";
import * as actorsActions from "../actions/actors";
import Table from "../reusable/Table";
import SearchInput from "../reusable/SearchInput";
import ActorForm from "./ActorForm";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../reusable/Popup";
import * as notifications from "../utils/notification";
import AddHeader from "../reusable/AddHeader";

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
  const fields = ["firstName", "lastName", "gender"];
  const objectKey = "actorID";

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
    console.log(data);
    console.log(actors);
    // if (
    //   actors.filter(
    //     (actor) =>
    //       (actor.firstName === data.firstName &&
    //         actor.lastName === data.lastName &&
    //         actor.actorID === data.actorID &&
    //         actor.gender === data.gender) ||
    //       (actor.firstName === data.firstName &&
    //         actor.lastName === data.lastName &&
    //         actor.actorID !== data.actorID)
    //   ).length > 0
    // ) {
    //   notifications.error("Actor already exists");
    //   return;
    // }
    if (
      (data.actorID === 0 &&
        actors.filter(
          (actor) =>
            actor.firstName === data.firstName &&
            actor.lastName === data.lastName
        ).length > 0) ||
      (data.actorID !== 0 &&
        actors.filter(
          (actor) =>
            actor.actorID !== data.actorID &&
            actor.firstName === data.firstName &&
            actor.lastName === data.lastName
        ).length > 0)
    ) {
      {
        notifications.error("Actor already exists");
        return;
      }
    }
    if (data.actorID !== 0) dispatch(actorsActions.updateActor(data));
    else dispatch(actorsActions.saveActor(data));

    handleReset();
  };

  const handleDelete = (id) => {
    dispatch(actorsActions.deleteActor(id));
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", marginTop: "50px" }}
    >
      <Paper>
        <AddHeader
          title="New actor"
          icon={<PeopleOutlineTwoTone fontSize="large" />}
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
          objectKey={objectKey}
          fields={fields}
          selection={false}
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
