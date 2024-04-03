import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/style.css";
import "../styles/register.css";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Joi from "joi";
import Input from "./Input";
import * as membersActions from "../actions/members";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const schema = Joi.object({
  username: Joi.string().min(3).max(30).required().label("Username"),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label("Password"),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  gender: Joi.string(),
  birthDate: Joi.required()
})

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { member } = useSelector((state) => state.membersReducer);

  const maxDate = dayjs().subtract(14, 'year')

  const initialData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    birthDate: dayjs()
  }

  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (member !== undefined) {
      navigate("/");
    }
  }, [member]);

  const handleInputChange = (name, value) => {
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignIn = () => {
    const {error} = schema.validate({username: data.username, password: data.password})
    if (error === undefined) {
      dispatch(membersActions.login(data))
    }
  }
  
  const handleSignUp = () => {
    const {error} = schema.validate(data)
    console.log(error);
    if (error === undefined) {
      const sendData = {...data}
      sendData.gender = data.gender.toUpperCase();
      sendData.birthDate = new Date(data.birthDate['$d']).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).split('/').reverse().join('-');//.replace(/\//g, '-');
      console.log(sendData);
      dispatch(membersActions.register(sendData))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleDateChange = (date) => {
    setData(prevData => ({
      ...prevData,
      birthDate: date
    }));
  };

  useEffect(() => {
    const signInButton = document.getElementById('signIn');
    const signUpButton = document.getElementById('signUp');
    const container = document.getElementById('container');

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });
  }, []);

  const handleGender = (event) => {
    setData(prevData => ({
      ...prevData,
      gender: event.target.value
    }));

  };

  const resetData = () => {
    setData(initialData);
  }

  return (
    <div className="big_container">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            {/* <h2>Create Account</h2> */}
            <Input password={false} name="firstName" value={data.firstName} onChange={handleInputChange}
            label="First name" reduce={true}/>
            <Input password={false} name="lastName" value={data.lastName} onChange={handleInputChange}
            label="Last name"/>
            <Input password={false} name="email" value={data.email} onChange={handleInputChange}
            label="Email"/>
            <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={data.gender}
              label="Gender"
              onChange={handleGender}
              size="small"
            >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
            <DatePicker 
              disableFuture
              maxDate={maxDate} 
              onChange={handleDateChange}
              format="D/MM/YYYY"
            />
            <Input password={false} name="username" value={data.username} onChange={handleInputChange}
            label="Username"/>
            <Input password={true} value={data.password} name="password" onChange={handleInputChange}/>
            <button onClick={handleSignUp}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <Input password={false} name="username" value={data.username} onChange={handleInputChange}
            label="Username"/>
            <Input password={true} value={data.password} name="password" onChange={handleInputChange}/>
            <button onClick={handleSignIn}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To see our movie list, please sign in
              </p>
              <button className="ghost" id="signIn" onClick={resetData}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello!</h1>
              <p>Join our community today and watch all the movies for all ages!</p>
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
