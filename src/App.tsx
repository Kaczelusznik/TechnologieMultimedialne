import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Task1 from './pages/Tasks/Task1/Task1';
import Task2 from './pages/Tasks/Task2/Task2';
import Task3 from './pages/Tasks/Task3/Task3';
import Task4 from './pages/Tasks/Task4/Task4';
import Task5 from './pages/Tasks/Task5/Task5';
import Task6 from './pages/Tasks/Task6/Task6';
import Task7 from './pages/Tasks/Task7/Task7';
import Task8 from './pages/Tasks/Task8/Task8';
import Task9 from './pages/Tasks/Task9/Task9';
import Task10 from './pages/Tasks/Task10/Task10';
import Task11 from './pages/Tasks/Task11/Task11';
import Task12 from './pages/Tasks/Task12/Task12';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/z1" element={<Task1 />} />
      <Route path="/z2" element={<Task2 />} />
      <Route path="/z3" element={<Task3 />} />
      <Route path="/z4" element={<Task4 />} />
      <Route path="/z5" element={<Task5 />} />
      <Route path="/z6" element={<Task6 />} />
      <Route path="/z7" element={<Task7 />} />
      <Route path="/z8" element={<Task8 />} />
      <Route path="/z9" element={<Task9 />} />
      <Route path="/z10" element={<Task10 />} />
      <Route path="/z11" element={<Task11 />} />
      <Route path="/z12" element={<Task12 />} />
      <Route path="*" element={<p className="container py-5">Nie znaleziono strony.</p>} />
    </Routes>
  );
}
