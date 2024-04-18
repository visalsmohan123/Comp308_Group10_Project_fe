import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import NurseDashboard from './pages/NurseDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/nurse-dashboard" element={
          <PrivateRoute allowedRoles={['nurse']}>
            <NurseDashboard />
          </PrivateRoute>
        } />
        <Route path="/patient-dashboard" element={
          <PrivateRoute allowedRoles={['patient']}>
            <PatientDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
