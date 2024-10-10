import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage'; // Use MainPage instead of individual pages

const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<MainPage />} />
          <Route path="/login" element={<MainPage />} />
          <Route path="/forgot-password" element={<MainPage />} />
        </Routes>
      </div>
  );
};

export default App;
