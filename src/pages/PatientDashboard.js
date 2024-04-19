import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import DailyInfoForm from '../components/DailyInfoForm';
import '../css/NurseDashboard.css';

const PatientDashboard = () => {
    const userId = sessionStorage.getItem('userId'); // Retrieve the user ID from sessionStorage

    // Check if the userId exists and if the user is a patient
    const userRole = sessionStorage.getItem('userRole');
    if (userRole !== 'patient') {
        return <p>Access Denied. This page is for patients only.</p>;
    }

    return (
        <div className="nurse-div text-dark">
            <div className="nurse-bg"></div>
            <h1>Patient Dashboard</h1>
            {/* Add buttons/links for accessing symptom and daily info history */}
            <div>
                <Link to={`/symptoms-history/${userId}`} className="btn btn-primary">Symptom History</Link>
                <Link to={`/daily-info-history/${userId}`} className="btn btn-primary">Daily Info History</Link>
            </div>
            <DailyInfoForm patientId={userId} />
        </div>
    );
};

export default PatientDashboard;
