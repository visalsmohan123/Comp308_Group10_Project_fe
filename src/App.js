import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import NurseDashboard from './pages/NurseDashboard';
import PatientDashboard from './pages/PatientDashboard';
import SymptomsDashboard from './pages/SymptomsDashboard';  // Import the SymptomsDashboard component
import PatientHistory from './pages/PatientHistory';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import DashboardHeader from './pages/Header';
import SymptomsHistory from './pages/SymptomsHistory'; // Make sure this import is correct
import DailyInfoHistory from './pages/DailyInfoHistory'; // Make sure this import is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/nurse-dashboard" element={
          <PrivateRoute allowedRoles={['nurse']}>
            <DashboardHeader/>
            <NurseDashboard />
          </PrivateRoute>
        } />
        <Route path="/patient-dashboard" element={
          <PrivateRoute allowedRoles={['patient']}>
            <DashboardHeader/>
            <PatientDashboard />
          </PrivateRoute>
        } />
        <Route path="/symptoms" element={
          <PrivateRoute allowedRoles={['patient']}>
            <DashboardHeader/>
            <SymptomsDashboard />
          </PrivateRoute>
        } />
        <Route path="/patient-history/:id" element={<PrivateRoute><DashboardHeader/><PatientHistory /></PrivateRoute>} />
        {/* New Routes for Symptoms and Daily Info Histories */}
        <Route path="/symptoms-history/:id" element={
          <PrivateRoute allowedRoles={['nurse', 'patient']}>
            <DashboardHeader/>
            <SymptomsHistory />
          </PrivateRoute>
        } />
        <Route path="/daily-info-history/:id" element={
          <PrivateRoute allowedRoles={['nurse', 'patient']}>
            <DashboardHeader/>
            <DailyInfoHistory />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
