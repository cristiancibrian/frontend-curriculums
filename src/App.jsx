import Form from "./components/Form";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Table from "./components/Table";

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
              <Link to="/about" className="enlace">Registrar</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/about" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
