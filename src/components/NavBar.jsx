import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ token }) => {
  console.log(token);

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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/movies">
              Naši Filmovi
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Profile
            </NavLink>
          </li>
        </ul>
        <span className="navbar-text" style={{ marginLeft: 20 }}>
          Gledajte najbolje filmove na svetu na jednom mestu
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
