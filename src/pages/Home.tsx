import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <main className="container py-5 text-center">
      <h1>Technologie Multimedialne</h1>
      <p>Moje zadania laboratoryjne</p>

      <div className="d-grid gap-4 task-grid">
        <Link to="/z1" className="btn btn-primary">Zadanie 1</Link>
        <Link to="/z2" className="btn btn-primary">Zadanie 2</Link>
        <Link to="/z3" className="btn btn-primary">Zadanie 3</Link>
        <Link to="/z4" className="btn btn-primary">Zadanie 4</Link>
        <Link to="/z5" className="btn btn-primary">Zadanie 5</Link>
        <Link to="/z6" className="btn btn-primary">Zadanie 6</Link>
        <Link to="/z7" className="btn btn-primary">Zadanie 7</Link>
        <Link to="/z8" className="btn btn-primary">Zadanie 8</Link>
        <Link to="/z9" className="btn btn-primary">Zadanie 9</Link>
        <Link to="/z10" className="btn btn-primary">Zadanie 10</Link>
        <Link to="/z11" className="btn btn-primary">Zadanie 11</Link>
        <Link to="/z12" className="btn btn-primary">Zadanie 12</Link>
      </div>
    </main>
  );
}
