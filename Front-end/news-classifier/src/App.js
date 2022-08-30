import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import './App.css';
import News from './pages/news';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Liked from './pages/liked';
import Disliked from './pages/disliked';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/liked" element={<Liked/>} />
          <Route path="/disliked" element={<Disliked/>} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
