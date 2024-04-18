import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Corrected import for useNavigate
import { CREATE_DAILY_INFO } from '../graphql/mutations'; // Ensure this mutation is correctly defined in your GraphQL mutations
import '../css/patient.css'; // Import the CSS file where styles are defined

const DailyInfoForm = ({ patientId }) => {
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        pulseRate: '',
        bloodPressure: '',
        weight: '',
        temperature: '',
        respiratoryRate: '',
        medicationTaken: false // Assuming you want to track if medication was taken
    });

    const [addDailyInfo, { loading, error }] = useMutation(CREATE_DAILY_INFO, {
        onCompleted: () => {
            alert('Daily information submitted successfully!');
            // Reset form after submission
            setFormData({
                pulseRate: '',
                bloodPressure: '',
                weight: '',
                temperature: '',
                respiratoryRate: '',
                medicationTaken: false
            });
        },
        onError: (err) => {
            console.error("Submission error:", err);
        }
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        // Update state based on input type
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Convert string values to appropriate types before submission
        const variables = {
            patientId,
            pulseRate: parseFloat(formData.pulseRate),
            bloodPressure: formData.bloodPressure,
            weight: parseFloat(formData.weight),
            temperature: parseFloat(formData.temperature),
            respiratoryRate: parseFloat(formData.respiratoryRate),
            medicationTaken: formData.medicationTaken
        };
        addDailyInfo({ variables });
    };

    // Function to navigate to Symptoms Dashboard
    const handleNavigateToSymptoms = () => {
        navigate('/symptoms'); // Navigate to SymptomsDashboard
    };

    return (
        <div className="formContainer">
            <button 
                onClick={handleNavigateToSymptoms} 
                style={{ position: 'absolute', top: '10px', right: '10px', padding: '8px 16px' }}  // Inline styles for the button
            >
                Report Symptoms
            </button>
            <form onSubmit={handleSubmit}>
                <input className="input" type="number" name="pulseRate" value={formData.pulseRate} onChange={handleChange} placeholder="Pulse Rate" required />
                <input className="input" type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} placeholder="Blood Pressure" required />
                <input className="input" type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" required />
                <input className="input" type="number" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Temperature" required />
                <input className="input" type="number" name="respiratoryRate" value={formData.respiratoryRate} onChange={handleChange} placeholder="Respiratory Rate" required />
                <label className="label">
                    Medication Taken:
                    <input type="checkbox" name="medicationTaken" checked={formData.medicationTaken} onChange={handleChange} />
                </label>
                <button className="button" type="submit" disabled={loading}>Submit</button>
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default DailyInfoForm;
