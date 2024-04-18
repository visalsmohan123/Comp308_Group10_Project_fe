import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SYMPTOMS } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const SymptomsDashboard = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState('mild');
  const navigate = useNavigate();
  const patientId = sessionStorage.getItem('userId'); // Assume userID is stored in session storage

  const [createSymptoms, { loading, error }] = useMutation(CREATE_SYMPTOMS, {
    onCompleted: () => {
      alert('Symptoms submitted successfully!');
      navigate('/patient-dashboard');
    },
    onError: (err) => {
      alert('Error submitting symptoms: ' + err.message);
    }
  });

  const handleSymptomChange = symptom => {
    setSelectedSymptoms(prev => prev.includes(symptom)
      ? prev.filter(s => s !== symptom)
      : [...prev, symptom]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    createSymptoms({ variables: { patientId, symptomsList: selectedSymptoms, severity } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Report Your Symptoms</h1>
        {["Fever", "Cough", "Fatigue", "Loss of Taste or Smell"].map(symptom => (
          <label key={symptom}>
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => handleSymptomChange(symptom)}
            />
            {symptom}
          </label>
        ))}
        <select value={severity} onChange={e => setSeverity(e.target.value)}>
          <option value="mild">Mild</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
        </select>
        <button type="submit" disabled={loading}>Submit Symptoms</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default SymptomsDashboard;
