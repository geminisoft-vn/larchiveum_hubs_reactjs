import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizPage from './react-components/pages/QuizPage';
import PermissionDenied from './react-components/pages/PermissionDenied';
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="quiz" element={<QuizPage />} />
          <Route path="document" element={<div>{'Comming soon'}</div>} />
          <Route path="map" element={<div>{'Comming soon'}</div>} />
          <Route path="permission-denied" element={<PermissionDenied/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
