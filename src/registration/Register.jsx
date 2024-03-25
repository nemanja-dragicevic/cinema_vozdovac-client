import React, { useEffect } from "react";
import "../styles/style.css";
import "../styles/register.css";
import { TextField } from "@mui/material";

const Register = () => {
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
  return (
    <div className="big_container">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h2>Create Account</h2>
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <TextField id="filled-basic" label="Username" variant="filled" />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To see our movie list, please sign in
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello!</h1>
              <p>Join our community today and watch all the movies for all ages!</p>
              <button className="ghost" id="signUp">
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
