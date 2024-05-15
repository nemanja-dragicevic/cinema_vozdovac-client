import Joi from "joi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as genreActions from "../actions/genres";
import { Paper } from "@mui/material";
import TheatersIcon from '@mui/icons-material/Theaters';
import AddHeader from "../reusable/AddHeader";
import TableSearch from "../components/TableSearch";
import Table from "../reusable/Table";
import Popup from "../reusable/Popup";
import GenreForm from "./GenreForm";

const schema = Joi.object({
    hallID: Joi.number().integer().min(0).required(),
    hallName: Joi.string().min(2).max(30).required().label("Hall name"),
    rowsCount: Joi.number().integer().min(1).required().label("Rows count"),
    seatsPerRow: Joi.number().integer().min(1).required().label("Seats per row"),
  });

const GenrePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(genreActions.getGenres());
    }, [dispatch]);

    const objectKey = "genreID";
    const { genres } = useSelector((state) => state.genresReducer);
    const fields = ["name"];

    const initialFValues = {
        genreID: 0,
        genreName: "",
    };
    const headCells = [
        { id: "name", label: "Genre name" },
    ];

    const [openPopup, setOpenPopup] = useState(false);
    const [data, setData] = useState(initialFValues);
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
          return items;
        },
      });

    console.log(genres);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
          fn: (items) => {
            if (target.value === "") return items;
            else
              return items.filter((x) =>
                x.name.toLowerCase().includes(target.value.toLowerCase())
              );
          },
        });
      };

      const setEditObj = (obj) => {
        setData(obj);
        setOpenPopup(true);
      }

      const handleDelete = (id) => {
            console.log("Delete genre with id: ", id);
            // genreActions.deleteGenre(id);
        }

    return ( 
        <div style={{ padding: "20px", marginTop: "50px" }}>
            <Paper sx={{ padding: 3 }}>
            <AddHeader
                title="Add Genre"
                icon={<TheatersIcon fontSize="large" />}
            />
            <TableSearch searching={false} 
            label="Search genres"
            handleSearch={handleSearch} 
            />
            <Table
                headCells={headCells}
                filterFn={filterFn}
                data={genres}
                fields={fields}
                objectKey={objectKey}
                selection={false}
                setEditObj={setEditObj}
                onDelete={handleDelete}
            />
            </Paper>
            <Popup title="Genre Form" openPopup={openPopup} setOpen={setOpenPopup}>
                <GenreForm />
            </Popup>
        </div>
     );
}
 
export default GenrePage;