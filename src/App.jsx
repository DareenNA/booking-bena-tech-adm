import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import './index.css';

const Footer = () => (
  <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-grey)' }}>
    <div className="container">
      <p style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Bena Tech. All rights reserved.</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: '100vh', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
