import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Training from './pages/Training';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import { ImageProvider } from './context/ImageContext';
import ScrollScissor from './components/ScrollScissor';
import Footer from './components/Footer';

function App() {
  return (
    
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-x-hidden">
        <ScrollScissor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/training" element={<Training />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}

export default App;