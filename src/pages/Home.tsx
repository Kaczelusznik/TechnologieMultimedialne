import { Link } from "react-router-dom";
import Vine from "../components/Vine";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="home">
      <header className="home-header">
        <span className="home-eyebrow">// LABORATORIA · 2026</span>
        <h1>Technologie Multimedialne</h1>
        <p>Moje zadania laboratoryjne</p>
      </header>

      <div className="task-grid">
        <Link to="/z1" className="task-card">Zadanie 1</Link>
        <Link to="/z2" className="task-card">Zadanie 2</Link>
        <Link to="/z3" className="task-card">Zadanie 3</Link>
        <Link to="/z4" className="task-card">Zadanie 4</Link>
        <Link to="/z5" className="task-card">Zadanie 5</Link>
        <Link to="/z6" className="task-card">Zadanie 6</Link>
        <Link to="/z7" className="task-card">Zadanie 7</Link>
        <Link to="/z8" className="task-card">Zadanie 8</Link>
        <Link to="/z9" className="task-card">Zadanie 9</Link>
        <Link to="/z10" className="task-card">Zadanie 10</Link>
        <Link to="/z11" className="task-card">Zadanie 11</Link>
        <Link to="/z12" className="task-card">Zadanie 12</Link>
      </div>

      <Vine />
    </main>
  );
}
