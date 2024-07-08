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
import CreateProjections from "./projections/CreateProjections";
import Success from "./ticket/Sucess";
import Failure from "./ticket/Failure";
import TicketHistory from "./ticket/TicketHistory";
import ProtectedRoute from "./security/ProtectedRoute";
import { useSelector } from "react-redux";
import RefundPage from "./refund/RefundPage";

function App() {
  const [token, setToken] = useState(null);

  const { member } = useSelector((state) => state.membersReducer);

  useEffect(() => {
    if (member) {
      setToken(member.token);
    } else {
      const stored = localStorage.getItem("token");
      if (stored) {
        setToken(stored);
      }
    }
  }, [member]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app-container">
        <ToastContainer />
        <NavBar token={token} />
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route
            exact
            path="/movies/:id"
            element={
              <ProtectedRoute token={token}>
                <MovieForm />
              </ProtectedRoute>
            }
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/actors" element={<ActorsPage />} />
          <Route exact path="/add_movie" element={<MoviePage />} />
          <Route exact path="/hall" element={<HallPage />} />
          <Route
            exact
            path="/genre"
            element={
              <ProtectedRoute token={token}>
                <GenrePage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/movie_edit/:id"
            element={
              <ProtectedRoute token={token}>
                <MovieComponent />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/projections"
            element={
              <ProtectedRoute token={token}>
                <Projections />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <ProtectedRoute token={token}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route exact path="/success" element={<Success />} />
          <Route
            exact
            path="/failure"
            element={
              <ProtectedRoute token={token}>
                <Failure />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/history"
            element={
              <ProtectedRoute token={token}>
                <TicketHistory />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/create_projections"
            element={
              <ProtectedRoute token={token}>
                <CreateProjections />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/projection_edit/:id"
            element={
              <ProtectedRoute token={token}>
                <ProjectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/settings"
            element={
              <ProtectedRoute token={token}>
                <UserSettings />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/refund"
            element={
              <ProtectedRoute token={token}>
                <RefundPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </LocalizationProvider>
  );
}

export default App;
