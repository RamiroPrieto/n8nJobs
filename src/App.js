import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Offers } from "./components/Offers";
import { Candidates } from "./components/Candidates";
import "./App.css";
import { Respondidos } from "./components/Respondidos";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/offers" className="nav-link">Ofertas</Link>
        <Link to="/candidates" className="nav-link">Candidatos</Link>
        <Link to="/respondidos" className="nav-link">Respondidos</Link>
      </nav>

      <Routes>
        <Route path="/offers" element={<Offers />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/respondidos" element={<Respondidos />} />
      </Routes>
    </Router>
  );
}

export default App;
