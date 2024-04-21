import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actorsActions from "../actions/actors";
import Table from "../reusable/Table";
import { InputAdornment, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import SearchInput from "../reusable/SearchInput";

const ActorsPage = () => {
  const dispatch = useDispatch();

  const { actors } = useSelector((state) => state.actorsReducer);

  useEffect(() => {
    dispatch(actorsActions.getActors());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log(id);
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
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.firstName.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", marginTop: "50px" }}
    >
      <Toolbar>
        <SearchInput
          label="Search actors"
          InputProps={{
            startAdornment: (
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
    </div>
  );
};

export default ActorsPage;
