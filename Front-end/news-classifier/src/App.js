import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import './App.css';
import News from './pages/news';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Liked from './pages/liked';
import Tags from './pages/tags';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/liked" element={<Liked/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
