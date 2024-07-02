import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const NavBar = () => {
  var { member } = useSelector((state) => state.membersReducer);
  // const member = sessionStorage.getItem("user");

  const { checkout } = useSelector((state) => state.ticketReducer);

  const [role, setRole] = useState("DEFAULT");
  useEffect(() => {
    if (member) setRole(member.role);
    else if (sessionStorage.getItem("user")) {
      member = JSON.parse(sessionStorage.getItem("user"));
    }
  }, [member]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location = "/register";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Bioskop Vozdovac
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/movies">
              Naši Filmovi
            </NavLink>
          </li>
          <li className="nav-item">
            {role === "ADMIN" ? (
              <NavLink className="nav-link" to="/actors">
                Actors
              </NavLink>
            ) : null}
          </li>
          <li className="nav-item">
            {role === "ADMIN" ? (
              <NavLink className="nav-link" to="/add_movie">
                Movie page
              </NavLink>
            ) : null}
          </li>
          <li className="nav-item">
            {role === "ADMIN" ? (
              <NavLink className="nav-link" to="/projections">
                Movie projections
              </NavLink>
            ) : null}
          </li>
          <li className="nav-item">
            {role === "ADMIN" ? (
              <NavLink className="nav-link" to="/hall">
                Hall properties
              </NavLink>
            ) : null}
          </li>
          <li className="nav-item">
            {role === "ADMIN" ? (
              <NavLink className="nav-link" to="/genre">
                Genre properties
              </NavLink>
            ) : null}
          </li>
          <li className="nav-item">
            {role === "USER" ? (
              <NavLink className="nav-link" to="/register">
                Order movie
              </NavLink>
            ) : null}
          </li>
          <li className="nav-item">
            {role === "USER" ? (
              <NavLink className="nav-link" to="/settings">
                User settings
              </NavLink>
            ) : null}
          </li>
          {!sessionStorage.getItem("user") ? (
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Profile
              </NavLink>
            </li>
          ) : null}
        </ul>
        <span className="navbar-text">Dobrodošli u svet filmske zabave</span>
        {sessionStorage.getItem("user") ? (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {role === "USER" ? (
                checkout.length > 0 ? (
                  <NavLink className="nav-link" to="/checkout">
                    <ShoppingCartCheckoutIcon fontSize="large" />
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/checkout">
                    <ShoppingCartOutlinedIcon fontSize="large" />
                  </NavLink>
                )
              ) : null}
            </li>
            <li
              className="nav-item"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button className="nav-link" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
