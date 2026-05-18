import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar";
import Home from "./Components/Page/Home";
import Prayatna from "./Components/Page/Prayatna";
import Environmental from './Components/Page/Environmental';
import Rural from './Components/Page/Rural';
import Chetna from './Components/Page/Chetna';
import Teaching from './Components/Page/Teaching';
import DNC from './Components/Page/DNC';
function MainAppContent() {
  const location = useLocation();
  let backgroundClass = "default-bg";

  if (location.pathname === "/") {
    backgroundClass = "home-bg";
  } else if (location.pathname === "/environmental") {
    backgroundClass = "environmental-bg";
  }

  return (
    <div className={`App ${backgroundClass}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prayatna" element={<Prayatna />} />
        <Route path="/environmental" element={<Environmental />} />
        <Route path="/rural" element={<Rural />} />
        <Route path="/chetna" element={<Chetna />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/dnc" element={<DNC />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainAppContent />
    </BrowserRouter>
  );
}

export default App;