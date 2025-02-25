import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Hero from './components/Hero';
import Footer from './components/Footer';

import ServicesPage from "./components/ServicesPage";

import RewardsPage from "./components/RewardsPage";

import Header from "./components/Header"; // Ensure Header is included
import Auth from "./components/Auth";
function App() {
  return (
    <Router>
      <Header /> {/* Persistent Navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/auth" element={<Auth />}/>
      </Routes>
    
    </Router>
  );
}

export default App;
