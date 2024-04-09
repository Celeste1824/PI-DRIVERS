import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Detail from './views/Detail/Detail';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Create from './views/Create/Create';
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation(); // Obtener la ubicación actual

  return (
    <>
      {location.pathname !== '/' && <NavBar/>}
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home/detailpage/:id" element={<Detail/>}/>
        <Route path="/createdriver" element={<Create/>} />

      </Routes>
    </>
  );
}

export default App;
