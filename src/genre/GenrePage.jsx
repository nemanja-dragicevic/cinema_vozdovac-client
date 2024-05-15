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
    genreID: Joi.number().integer().min(0).required(),
    name: Joi.string().min(5).max(30).required().label("Genre name"),
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
        name: "",
    };
    const headCells = [
        { id: "name", label: "Genre name" },
    ];

    const [openPopup, setOpenPopup] = useState(false);
    const [data, setData] = useState(initialFValues);
    const [errors, setErrors] = useState({
        name: { error: false, message: "" },
    });
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
          return items;
        },
      });

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
        resetErrors();
        setData(obj);
        setOpenPopup(true);
      }

      const resetErrors = () => {
        setErrors({
          name: { error: false, message: "" },
        });
      };

      const handleChange = (name, value) => {
        resetErrors();
        setData({
          ...data,
          [name]: value,
        });
      };

      const handleDelete = (id) => {
            console.log("Delete genre with id: ", id);
            // genreActions.deleteGenre(id);
        }

        const handleSave = () => {
            const { error } = schema.validate(data);

            if (error) {
              const { details } = error;
              const field = details[0].path[0];
              setErrors((prevErrors) => ({
                  ...prevErrors,
                  [field]: { error: true, message: details[0].message },
              }));
              return;
            }
            if (data.genreID === 0)
              genreActions.addGenre(data);
            else {
              genreActions.updateGenre(data);
            }
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
                <GenreForm
                    data={data} 
                    error={errors}
                    onSave={handleSave}
                    onChange={handleChange}
                />
            </Popup>
        </div>
     );
}
 
export default GenrePage;