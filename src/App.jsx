import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDo from './pages/ToDo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDo />} />
      </Routes>
    </Router>
  );
};
export default App;
