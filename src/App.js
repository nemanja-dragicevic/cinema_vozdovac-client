import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Register from "./registration/Register";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
    }
  }, []);

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
        </Routes>
      </div>
    </LocalizationProvider>
  );
}

export default App;
