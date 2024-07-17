import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import Joi from "joi";
import dayjs from "dayjs";
import Input from "./Input";
import * as membersActions from "../actions/members";
import "../styles/style.css";
import "../styles/register.css";
import PersonIcon from "@mui/icons-material/Person";
import { error } from "./../utils/notification";
import AddHeader from "./../reusable/AddHeader";

const div_style = { display: "flex", flexDirection: "row", columnGap: 15 };

const schema_login = Joi.object({
  username: Joi.string().min(3).max(30).required().label("Username"),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#$%^&+=]{3,30}$"))
    .messages({
      "string.pattern.base":
        "Password must be 3-30 characters long and " +
        "contain only letters and numbers.",
    })
    .label("Password"),
});

const schema = Joi.object({
  username: Joi.string().min(3).max(30).required().label("Username"),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .label("Password"),
  firstName: Joi.string().min(2).max(30).required().label("First name"),
  lastName: Joi.string().min(3).max(30).required().label("Last name"),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  gender: Joi.string(),
  birthDate: Joi.required(),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const maxDate = dayjs().subtract(14, "year");

  // when logged -> "\"
  const { member } = useSelector((state) => state.membersReducer);

  const [errors, setErrors] = useState({
    username: { error: false, message: "" },
    password: { error: false, message: "" },
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
    email: { error: false, message: "" },
  });

  const initialData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    birthDate: null,
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (member !== undefined) navigate("/");
  }, [member]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== undefined && token !== null) navigate("/");
  }, []);

  const handleInputChange = (name, value) => {
    resetRegisterErrors();
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetRegisterErrors = () => {
    setErrors({
      username: { error: false, message: "" },
      password: { error: false, message: "" },
      firstName: { error: false, message: "" },
      lastName: { error: false, message: "" },
      email: { error: false, message: "" },
    });
  };

  const handleSignIn = () => {
    const validate = schema_login.validate({
      username: data.username,
      password: data.password,
    });

    if (validate.error) {
      const { details } = validate.error;
      const error = details[0].message;
      const field = details[0].path[0];
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: { error: true, message: error },
      }));
    } else {
      const sendData = { ...data };
      sendData.birthDate = null;
      sendData.gender = null;
      dispatch(membersActions.login(sendData));
    }
  };

  const handleSignUp = () => {
    const validate = schema.validate(data);

    if (validate.error) {
      const { details } = validate.error;
      const error = details[0].message;
      const field = details[0].path[0];
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: { error: true, message: error },
      }));
    } else if (data.birthDate === null) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birthDate: { error: true, message: "Birth date is required" },
      }));
      error("Birth date is required");
    } else {
      const sendData = { ...data };
      sendData.gender = data.gender.toUpperCase();
      sendData.birthDate = new Date(data.birthDate["$d"])
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-"); //.replace(/\//g, '-');
      console.log(sendData);
      dispatch(membersActions.register(sendData));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDateChange = (date) => {
    setData((prevData) => ({
      ...prevData,
      birthDate: date,
    }));
  };

  useEffect(() => {
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");
    const container = document.getElementById("container");

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });
  }, []);

  const handleGender = (event) => {
    setData((prevData) => ({
      ...prevData,
      gender: event.target.value,
    }));
  };

  const resetData = () => {
    setData(initialData);
    resetRegisterErrors();
  };

  return (
    <div className="big_container">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
          >
            <AddHeader
              title="User information"
              icon={<PersonIcon fontSize="large" />}
            />
            {/* <h2>Create Account</h2> */}
            <div style={{ ...div_style, marginTop: 15 }}>
              <Input
                password={false}
                name="firstName"
                value={data.firstName}
                onChange={handleInputChange}
                label="First name"
                error={errors.firstName}
                sx={{ width: 150 }}
              />
              <Input
                password={false}
                name="lastName"
                value={data.lastName}
                onChange={handleInputChange}
                label="Last name"
                error={errors.lastName}
                sx={{ width: 150 }}
              />
            </div>
            <div style={div_style}>
              <Input
                password={false}
                name="email"
                value={data.email}
                onChange={handleInputChange}
                label="Email"
                error={errors.email}
              />
              {/* <InputLabel id="demo-simple-select-standard-label"></InputLabel> */}
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={data.gender}
                label="Gender"
                onChange={handleGender}
                size="small"
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </div>
            <DatePicker
              disableFuture
              maxDate={maxDate}
              onChange={handleDateChange}
              format="D/MM/YYYY"
              label="Birth Date"
              value={data.birthDate}
            />
            <div style={div_style}>
              <Input
                password={false}
                name="username"
                value={data.username}
                onChange={handleInputChange}
                label="Username"
                error={errors.username}
                sx={{ width: 150 }}
              />
              <Input
                password={true}
                value={data.password}
                label="Password"
                name="password"
                onChange={handleInputChange}
                error={errors.password}
                sx={{ width: 150 }}
              />
            </div>
            <button style={{ marginTop: 10 }} onClick={handleSignUp}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <Input
              password={false}
              name="username"
              value={data.username}
              onChange={handleInputChange}
              label="Username"
              error={errors.username}
            />
            <Input
              password={true}
              value={data.password}
              label="Password"
              name="password"
              onChange={handleInputChange}
              error={errors.password}
            />
            <button onClick={handleSignIn}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To see our movie list, please sign in</p>
              <button className="ghost" id="signIn" onClick={resetData}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello!</h1>
              <p>
                Join our community today and watch all the movies for all ages!
              </p>
              <button className="ghost" id="signUp" onClick={resetData}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
