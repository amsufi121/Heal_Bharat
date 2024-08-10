import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./Components/Navbar.js";
import Home from "./Components/Home.js";
import Register from "./Components/Register.js";
import { Route, Routes } from "react-router-dom";
import Edit from "./Components/Edit.js";
import Details from "./Components/Details.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/edit/:id" Component={Edit} />
        <Route exact path="/view/:id" Component={Details} />
      </Routes>
    </>
  );
}

export default App;
