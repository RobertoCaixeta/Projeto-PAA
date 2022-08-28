import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import './App.css';
import News from './pages/news';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<News />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
