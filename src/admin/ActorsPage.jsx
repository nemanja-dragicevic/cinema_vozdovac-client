import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { InputAdornment, Paper, Toolbar } from "@mui/material";
import { PeopleOutlineTwoTone, Search } from "@mui/icons-material";
import * as actorsActions from "../actions/actors";
import Table from "../reusable/Table";
import SearchInput from "../reusable/SearchInput";
import ActorForm from "../actor/ActorForm";
import ActorHeader from "../actor/ActorHeader";

const schema = Joi.object({
  actorID: Joi.number().integer().min(0).required(),
  firstName: Joi.string().min(2).max(30).required().label("First name"),
  lastName: Joi.string().min(2).max(30).required().label("Last name"),
  gender: Joi.string().required(),
});

const ActorsPage = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
  });

  const { actors } = useSelector((state) => state.actorsReducer);

  useEffect(() => {
    dispatch(actorsActions.getActors());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(actorsActions.deleteActor(id));
  };

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
          return items.filter((x) =>
            x.firstName.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
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
    setErrors({
      firstName: { error: false, message: "" },
      lastName: { error: false, message: "" },
    });

    dispatch(actorsActions.saveActor(data));
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
        <ActorForm onSave={handleSave} errors={errors} />
        <Toolbar>
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
        </Toolbar>
        <Table
          headCells={headCells}
          data={actors}
          filterFn={filterFn}
          onDelete={handleDelete}
        />
      </Paper>
    </div>
  );
};

export default ActorsPage;
