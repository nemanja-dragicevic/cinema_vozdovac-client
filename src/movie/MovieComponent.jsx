import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import Joi from "joi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import MovieIcon from "@mui/icons-material/Movie";
import MovieBackground from "../reusable/MovieBackground";
import GradientHeader from "../reusable/GradientHeader";
import ConfirmDialog from "../reusable/ConfirmDialog";
import Input from "../registration/Input";
import * as genresActions from "./../actions/genres";
import * as actorsActions from "./../actions/actors";
import * as moviesActions from "./../actions/movies";
import "../styles/moviesTable.css";
import AddHeader from "./../reusable/AddHeader";
import Table from "../reusable/Table";
import TableSearch from "../components/TableSearch";

const schema = Joi.object({
  movieID: Joi.number().integer().min(0).required(),
  name: Joi.string().min(2).max(30).required().label("Movie name"),
  duration: Joi.number().integer().min(30).required().label("Duration"),
  description: Joi.string().min(2).max(30).required().label("Description"),
  genres: Joi.array().items(Joi.object()).min(1).required().label("Genre"),
  startTime: Joi.required(),
  endTime: Joi.required(),
  smallPicture: Joi.string().required().label("Small picture"),
  bigPicture: Joi.string().required().label("Big picture"),
  roleDTO: Joi.array().items(Joi.object()).min(1).required().label("Roles"),
});

const MovieComponent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(genresActions.getGenres());
    dispatch(actorsActions.getActors());
  }, [dispatch]);

  const objectKey = "actorID";
  const { movies } = useSelector((state) => state.moviesReducer);
  const { genres } = useSelector((state) => state.genresReducer);
  const { actors } = useSelector((state) => state.actorsReducer);

  // const [imageUrl, setImageUrl] = useState(null);
  const [newImage, setNewImage] = useState({
    bigPicture: true,
    smallPicture: true,
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    if (genres.length > 0 && movies.length > 0) {
      const movie = movies.find((movie) => movie.movieID === parseInt(id));
      const movieGenreIDs = movie.genres.map((genre) => genre.genreID);
      const updatedGenres = activeGenres(movieGenreIDs);
      setAllGenres(updatedGenres);
    }
    if (actors.length > 0) {
      setAllActors(
        actors.map((actor) => ({
          ...actor,
          checked: movie.roleDTO
            .map((role) => role.actor.actorID)
            .includes(actor.actorID),
        }))
      );
    }
  }, [genres, movies, id, actors]);

  const fields = ["firstName", "lastName", "gender"];
  const headCells = [
    { id: "firstName", label: "First name" },
    { id: "lastName", label: "Last name" },
    { id: "gender", label: "Gender", disableSorting: true },
  ];
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const movie =
    id === "0"
      ? {
          movieID: 0,
          name: "",
          duration: 0,
          description: "",
          genres: [],
          bigPicture: "",
          smallPicture: "",
          roleDTO: [],
        }
      : movies.find((movie) => movie.movieID === parseInt(id));

  const [allGenres, setAllGenres] = useState([]);
  const [allActors, setAllActors] = useState([]);
  const [fileImages, setFileImages] = useState({
    smallPicture: null,
    bigPicture: null,
  });
  const [data, setData] = useState(movie);
  const [errors, setErrors] = useState({
    name: { error: false, message: "" },
    duration: { error: false, message: "" },
    description: { error: false, message: "" },
    genre: { error: false, message: "" },
  });

  const activeGenres = (movieGenreIDs) => {
    return genres.map((genre) => ({
      ...genre,
      checked: movieGenreIDs.includes(genre.genreID),
    }));
  };

  const handleChange = (name, value) => {
    resetErrors();
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleGenreChange = (e) => {
    const { name, value, checked } = e.target;

    setAllGenres((prevGenres) =>
      prevGenres.map((genre) =>
        genre.name === name ? { ...genre, checked } : genre
      )
    );

    if (checked) {
      setData((prevData) => ({
        ...prevData,
        genres: [...prevData.genres, { genreID: value, name: name }],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        genres: prevData.genres.filter((genre) => genre.name !== name),
      }));
    }
  };

  const handleActorSelection = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setData((prevData) => ({
        ...prevData,
        roleDTO: [...prevData.roleDTO, { actorID: value }],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        roleDTO: prevData.roleDTO.filter((role) => role.actorID !== value),
      }));
    }

    setAllActors((prevActors) =>
      prevActors.map((actor) => {
        if (actor.actorID === parseInt(value)) {
          return { ...actor, checked };
        }
        return actor;
      })
    );
  };

  const resetErrors = () => {
    setErrors({
      name: { error: false, message: "" },
      duration: { error: false, message: "" },
      description: { error: false, message: "" },
      genre: { error: false, message: "" },
    });
  };

  const handleUpload = (e) => {
    const name = e.target.name;

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImageUrl(reader.result);
        setNewImage({ ...newImage, [name]: false });
        // setImage(file);
        setData((prevData) => ({
          ...prevData,
          [name]: reader.result,
          // .replace(/-/g, "+") // Replace "-" with "+"
          // .replace(/_/g, "/"), // Replace "_" with "/",
          // [name]: file,
        }));
        setFileImages((prevImages) => ({
          ...prevImages,
          [name]: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log(data);
    // setConfirmDialog({ ...confirmDialog, isOpen: false });

    const { error } = schema.validate(data, { abortEarly: false });

    if (!error) {
      dispatch(moviesActions.editMovie(data, fileImages));
    } else {
      console.log(error);
    }
  };

  const handleReset = () => {
    setData(movie);
    setNewImage({ bigPicture: true, smallPicture: true });
    resetErrors();
    setAllGenres(activeGenres(movie.genres.map((genre) => genre.genreID)));
    setAllActors(
      actors.map((actor) => ({
        ...actor,
        checked: movie.roleDTO
          .map((role) => role.actor.actorID)
          .includes(actor.actorID),
      }))
    );
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Paper
        sx={{
          padding: "20px",
          display: "flex",
          rowGap: 5,
          flexDirection: "column",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <AddHeader title="Edit a movie" icon={<MovieIcon fontSize="large" />} />
        <div
          style={{
            display: "flex",
            columnGap: "50px",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Input
            name="name"
            value={data.name}
            label="Title"
            error={errors.name}
            onChange={handleChange}
          />
          <Input
            name="duration"
            value={data.duration}
            label="Duration (in minutes)"
            error={errors.duration}
            onChange={handleChange}
          />
          <Input
            name="description"
            value={data.description}
            label="Description"
            error={errors.description}
            onChange={handleChange}
            multiline
          />
        </div>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: 8,
            justifyContent: "center",
          }}
        >
          {allGenres.map((genre) => (
            <FormControlLabel
              key={genre.genreID}
              control={
                <Checkbox
                  checked={genre.checked}
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  name={genre.name}
                  onChange={handleGenreChange}
                  value={genre.genreID}
                />
              }
              label={genre.name}
            />
          ))}
        </FormGroup>
        <TableSearch searching={true} handleSearch={handleSearch} />
        <Table
          headCells={headCells}
          filterFn={filterFn}
          data={allActors}
          fields={fields}
          objectKey={objectKey}
          selection={true}
          setEditObj={handleActorSelection}
        />
        <div
          style={{ display: "flex", columnGap: 30, justifyContent: "center" }}
        >
          <Button
            variant="contained"
            component="label"
            sx={{ width: "30%", textAlign: "center" }}
          >
            <MovieIcon />
            Upload big picture <br />
            <span style={{ paddingLeft: 10, fontSize: 10 }}>
              (reccommended size: 1380x690)
            </span>
            <input
              name="bigPicture"
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            sx={{ width: "30%", textAlign: "center" }}
          >
            <MovieIcon />
            Upload small picture <br />
            <span style={{ paddingLeft: 10, fontSize: 10 }}>
              (reccommended size: 900x600)
            </span>
            <input
              name="smallPicture"
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "30px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            // onClick={() => {
            //   setConfirmDialog({
            //     isOpen: true,
            //     title: "Are you sure you want to save this movie?",
            //     subTitle: "You can't undo this operation",
            //     onConfirm: () => {
            //       handleSave();
            //     },
            //   });
            // }}
            onClick={handleSave}
            sx={{ width: "20%" }}
          >
            Save a movie
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "20%" }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Paper>
      <GradientHeader title="Movie display" />

      <div className="movie_card" id="bright">
        <div className="info_section">
          <div className="movie_header">
            <MovieBackground
              small={true}
              base64Image={data.smallPicture}
              nameClass="locandina"
              toDecode={newImage.smallPicture}
            />

            <h1>{data.name}</h1>
            <h4>{data.genres.map((genre) => genre.name).join(", ")}</h4>
            <span className="minutes">{data.duration} min</span>
          </div>
          <div className="movie_desc">
            <p className="text">{data.description}</p>
          </div>
        </div>
        <MovieBackground
          small={false}
          base64Image={data.bigPicture}
          nameClass="blur_back bright_back"
          toDecode={newImage.bigPicture}
        />
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirm={setConfirmDialog}
      />
    </div>
  );
};

export default MovieComponent;
