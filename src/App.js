import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Register from "./registration/Register";
import "react-toastify/dist/ReactToastify.css";
import HallPage from "./hall/HallPage";
import ActorsPage from "./actor/ActorsPage";
import MoviePage from "./movie/MoviePage";
import MovieComponent from "./movie/MovieComponent";
import GenrePage from "./genre/GenrePage";
import Projections from "./projections/Projections";
import UserSettings from "./member/UserSetings";
import ProjectionPage from "./projections/ProjectionPage";
import Checkout from "./ticket/Checkout";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
    }
  }, [token]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app-container">
        <ToastContainer />
        <NavBar token={token} />
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/movies/:id" element={<MovieForm />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/actors" element={<ActorsPage />} />
          <Route exact path="/add_movie" element={<MoviePage />} />
          <Route exact path="/hall" element={<HallPage />} />
          <Route exact path="/genre" element={<GenrePage />} />
          <Route exact path="/movie_edit/:id" element={<MovieComponent />} />
          <Route exact path="/projections" element={<Projections />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route
            exact
            path="/projection_edit/:id"
            element={<ProjectionPage />}
          />
          <Route exact path="/settings" element={<UserSettings />} />
        </Routes>
      </div>
    </LocalizationProvider>
  );
}

export default App;
