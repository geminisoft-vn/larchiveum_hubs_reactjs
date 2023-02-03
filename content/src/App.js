/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, HashRouter,  Route } from 'react-router-dom';
import QuizPage from './react-components/pages/QuizPage';
import DocumentPage from './react-components/pages/DocumentPage';
import PermissionDenied from './react-components/pages/PermissionDenied';
import NotFound from './react-components/pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="quiz" element={<QuizPage />} />
          <Route path="document" element={<DocumentPage />} />
          <Route path="map" element={<div>{'Comming soon'}</div>} />
          <Route path="permission-denied" element={<PermissionDenied/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
