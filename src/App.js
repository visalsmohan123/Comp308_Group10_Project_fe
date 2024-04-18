import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import NurseDashboard from './pages/NurseDashboard';
import PatientDashboard from './pages/PatientDashboard';
import SymptomsDashboard from './pages/SymptomsDashboard';  // Import the SymptomsDashboard component
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import DiabeticCheckForm from './pages/DiabeticCheckForm';

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
        <Route path="/symptoms" element={  // Add the new route for SymptomsDashboard
          <PrivateRoute allowedRoles={['patient']}>
            <SymptomsDashboard />
          </PrivateRoute>
        } />
        <Route path="/diabetic-check" element={<DiabeticCheckForm />} />
      </Routes>
    </Router>
  );
}

export default App;
