import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const { member } = useSelector((state) => state.membersReducer);

  useEffect(() => {
    console.log("Member changed:", member);
  }, [member]);

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
            <NavLink className="nav-link" to="/register">
              Profile
            </NavLink>
          </li>
        </ul>
        <span class="navbar-text">Dobrodošli</span>
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
