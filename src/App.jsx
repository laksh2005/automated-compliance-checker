
import './App.css';
import Dashboard from './components/Dashboard';
import Flagged from './components/Flagged';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/flagged" element={<Flagged />} />
      </Routes>
    </Router>
  );
}

export default App;
