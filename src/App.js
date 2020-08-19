import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { Stats } from './Components/Stats';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NavBar2 from './Components/NavBar2';

function App() {

  const [isDesktop , setDesktop]=useState(window.innerWidth)
  const UpdataMedia=()=>{
    setDesktop(window.innerWidth)
  }
  useEffect(()=>{
    window.addEventListener("resize",UpdataMedia);
    return ()=>window.removeEventListener("resize",UpdataMedia)
  })
  return (
      <BrowserRouter>
        {(isDesktop>500)?<NavBar></NavBar>:<NavBar2></NavBar2>}
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/stats" element={<Stats></Stats>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
