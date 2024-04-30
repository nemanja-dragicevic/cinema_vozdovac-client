import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  var { member } = useSelector((state) => state.membersReducer);
  // const member = sessionStorage.getItem("user");

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
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav ">
          <li class="nav-item active">
            <NavLink className="nav-link" to="/movies">
              Naši Filmovi
            </NavLink>
          </li>
          <li class="nav-item">
            {role === "ADMIN" ? (
              <NavLink className="nav-link" to="/actors">
                Actors
              </NavLink>
            ) : null}
          </li>
          <li class="nav-item">
            {role === "ADMIN" ? (
              <NavLink className="nav-link" to="/add_movie">
                Add Movie
              </NavLink>
            ) : null}
          </li>
          <li class="nav-item">
            {role === "USER" ? (
              <NavLink className="nav-link" to="/register">
                Order movie
              </NavLink>
            ) : null}
          </li>
          {!sessionStorage.getItem("user") ? (
            <li class="nav-item">
              <NavLink className="nav-link" to="/register">
                Profile
              </NavLink>
            </li>
          ) : null}
        </ul>
        <span class="navbar-text">Dobrodošli u svet filmske zabave</span>
        {sessionStorage.getItem("user") ? (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Button className="nav-link" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //   <Link className="navbar-brand" to="/">
    //     Bioskop Vozdovac
    //   </Link>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarNav"
    //     aria-controls="navbarNav"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarText">
    //     <ul className="navbar-nav ">
    //       <li className="nav-item active">
    //         <NavLink className="nav-link" to="/movies">
    //           Naši Filmovi
    //         </NavLink>
    //       </li>

    //       {!localStorage.getItem("token") ? (
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/register">
    //             Profile
    //           </NavLink>
    //         </li>
    //       ) : (
    //         <li></li>
    //       )}
    //     </ul>
    //     <span className="navbar-text" style={{ marginLeft: 20 }}>
    //       Gledajte najbolje filmove na svetu na jednom mestu
    //     </span>
    //   </div>
    // </nav>
  );
};

export default NavBar;
