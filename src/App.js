import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import "react-toastify/dist/ReactToastify.css";
import Register from "./registration/Register";

function App() {
  return (
    <div className="app-container">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/movies/:id" element={<MovieForm />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
