import "./App.css";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import Register from "./components/Register";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
