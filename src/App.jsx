import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Table from "./components/Table";
import Form from "./components/Form";
import './App.css'
import Consulta from "./components/Consulta";

function App() {
  return (
    <Router>
      <div>
        <nav className="navegacion">
          <ul className="lista">
            <li>
              <Link to="/" className="enlace">Inicio</Link>
            </li>
            <li>
              <Link to="/crear" className="enlace">Registrar</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/crear" element={<Form />} />
          <Route path="/ver/:id" element={<Consulta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
