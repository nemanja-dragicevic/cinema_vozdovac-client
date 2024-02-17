import "./App.css";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import Register from "./components/Register";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/login" element={<WelcomePage />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
