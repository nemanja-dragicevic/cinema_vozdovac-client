import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as hallActions from "../actions/hall";
import Table from "../reusable/Table";

const HallPage = () => {
  const dispatch = useDispatch();

  const { halls } = useSelector((state) => state.hallReducer);
  const key = "hallID";
  const fields = ["hallName", "rowsCount", "seatsPerRow"];

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

  console.log(halls);

  return (
    <div>
      <Table
        headCells={headCells}
        filterFn={filterFn}
        data={halls}
        key={key}
        fields={fields}
      />
    </div>
  );
};

export default HallPage;
