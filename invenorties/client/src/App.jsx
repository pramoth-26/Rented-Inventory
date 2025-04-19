import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import IssuePage from './pages/IssuePage';
import ReceivePage from './pages/ReceivePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import IssueItem from './pages/IssueItem';
import DetailsTable from './pages/DetailsTable';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue" element={<IssuePage />} />
        <Route path="/receive" element={<ReceivePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/records" element={<IssueItem />} />
        <Route path="/details" element={<DetailsTable />} />
      </Routes>
    </Router>
    
  );
};

export default App;