import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SYMPTOMS_HISTORY } from "../graphql/queries"; 
import '../css/NurseDashboard.css';

const SymptomsHistory = () => {
  const { id } = useParams(); // Using URL param
  const { loading, error, data } = useQuery(GET_SYMPTOMS_HISTORY, {
    variables: { patientId: id },
  });

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="nurse-div">
      <div className="nurse-bg"></div>
      <h1 className="text-dark text-bold">Symptom History</h1>
      <div className="history-container">
        {data && data.getSymptomsHistory.map((symptom, index) => (
          <div key={index} className="history-item">
            <div className="summary row" onClick={() => handleExpand(index)}>
              <p className="col-md-3"><strong># {index+1}</strong></p>
              <p className="col-md-3"><strong>Created At:</strong> {new Date(parseInt(symptom.createdAt)).toLocaleDateString()}</p>
              <p className="col-md-3"><strong>Severity:</strong> {symptom.severity}</p>
            </div>
            {expandedIndex === index && (
              <div className="details">
                <p><strong>Symptoms:</strong> {symptom.symptomsList.join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomsHistory;
