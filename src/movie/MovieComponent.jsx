import { Form, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup, Paper } from "@mui/material";
import Joi from "joi";
import Input from "../registration/Input";
import * as genresActions from "./../actions/genres";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const schema = Joi.object({
  movieID: Joi.number().integer().min(0).required(),
  name: Joi.string().min(2).max(30).required().label("Movie name"),
  duration: Joi.string().min(2).max(30).required().label("Duration"),
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

  const movie = movies.find((movie) => movie.movieID === parseInt(id));
  const movieGenreIDs = movie.genres.map((genre) => genre.genreID);
  const [allGenres, setAllGenres] = useState(
    genres.map((genre) => ({
      ...genre,
      checked: movieGenreIDs.includes(genre.genreID),
    }))
  );

  const [data, setData] = useState(movie);
  const [errors, setErrors] = useState({
    name: { error: false, message: "" },
    duration: { error: false, message: "" },
    description: { error: false, message: "" },
    genre: { error: false, message: "" },
  });

  const handleChange = (name, value) => {
    resetErrors();
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenreChange = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked);
    setAllGenres((prevGenres) =>
      prevGenres.map((genre) =>
        genre.name === name ? { ...genre, checked } : genre
      )
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

  return (
    <Paper sx={{ padding: "20px", marginTop: "50px" }}>
      <div style={{ display: "flex", gap: 20 }}>
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
                />
              }
              label={genre.name}
            />
          ))}
        </FormGroup>
      </div>
    </Paper>
  );
};

export default MovieComponent;
