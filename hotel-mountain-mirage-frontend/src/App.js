import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import HomePage from './component/home/Home';
import FooterComponent from './component/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className='content'>
          <Routes>
            <Route exact path='/home' element={<HomePage />} />
          </Routes>

        </div>


      </div>

      <FooterComponent />
    </BrowserRouter>

  );
}

export default App;
