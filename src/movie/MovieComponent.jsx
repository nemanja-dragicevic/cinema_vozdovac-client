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
import Input from "../registration/Input";
import * as genresActions from "./../actions/genres";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MovieBackground from "../reusable/MovieBackground";
import GradientHeader from "../reusable/GradientHeader";
import MovieIcon from "@mui/icons-material/Movie";
import "../styles/moviesTable.css";
import Popup from "../reusable/Popup";
import ConfirmDialog from "../reusable/ConfirmDialog";

const schema = Joi.object({
  movieID: Joi.number().integer().min(0).required(),
  name: Joi.string().min(2).max(30).required().label("Movie name"),
  duration: Joi.string()
    .min(2)
    .pattern(new RegExp("^[0-9]h[0-59]min{2}$"))
    .max(30)
    .required()
    .label("Duration"),
  description: Joi.string().min(2).max(30).required().label("Description"),
  genre: Joi.array().items(Joi.string()).min(1).required().label("Genre"),
});

const MovieComponent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(genresActions.getGenres());
  }, [dispatch]);

  const { movies } = useSelector((state) => state.moviesReducer);
  const { genres } = useSelector((state) => state.genresReducer);

  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
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
  }, [genres, movies, id]);

  const maxDate = dayjs(); //.subtract(14, "year");
  const movie = movies.find((movie) => movie.movieID === parseInt(id));
  const [allGenres, setAllGenres] = useState([]);

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

  const handleGenreChange = (e) => {
    console.log(e);
    const { name, value, checked } = e.target;
    console.log(name, checked);
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
    // console.log(data);
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
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setNewImage(true);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log(data);
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleReset = () => {
    setData(movie);
    setNewImage(false);
    resetErrors();
    setAllGenres(activeGenres(movie.genres.map((genre) => genre.genreID)));
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
        <div style={{ display: "flex", columnGap: "50px" }}>
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
            label="Duration"
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
          <FormGroup>
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
        </div>
        <DatePicker
          label="Release date"
          disableFuture
          value={data.startTime ? dayjs(data.startTime) : null}
          maxDate={maxDate}
          onChange={(date) => setData({ ...data, startTime: date })}
          format="D/MM/YYYY"
          sx={{ width: "50%" }}
        />
        <DatePicker
          label="End date"
          disableFuture
          maxDate={maxDate}
          value={data.endTime ? dayjs(data.endTime) : null}
          onChange={(date) => setData({ ...data, endTime: date })}
          format="D/MM/YYYY"
          sx={{ width: "50%" }}
        />
        <Button variant="contained" component="label" sx={{ width: "50%" }}>
          <MovieIcon />
          Upload picture
          <span style={{ paddingLeft: 4, fontSize: 10 }}>
            (reccommended size: 1380x690)
          </span>
          <input type="file" accept="image/*" hidden onChange={handleUpload} />
        </Button>
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
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: "Are you sure you want to save this movie?",
                subTitle: "You can't undo this operation",
                onConfirm: () => {
                  handleSave();
                },
              });
            }}
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
            />
            <h1>{data.name}</h1>
            <h4>{data.genres.map((genre) => genre.name).join(", ")}</h4>
            <span className="minutes">{data.duration}</span>
          </div>
          <div className="movie_desc">
            <p className="text">{data.description}</p>
          </div>
        </div>
        {!newImage ? (
          <MovieBackground
            small={false}
            base64Image={movie.bigPicture}
            nameClass="blur_back bright_back"
          />
        ) : (
          <div
            className="blur_back bright_back"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        )}
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};

export default MovieComponent;
