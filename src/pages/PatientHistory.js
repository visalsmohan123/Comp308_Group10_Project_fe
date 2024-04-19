import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_HISTORY_BY_PATIENT } from "../graphql/queries"; 
import '../css/NurseDashboard.css';

const PatientHistory = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_HISTORY_BY_PATIENT, {
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
      <h1 className="text-dark text-bold">Patient History</h1>
      <div className="history-container">
        {data.getPreviousVitalSigns.map((sign, index) => (
          <div key={index} className="history-item">
            <div className="summary row" onClick={() => handleExpand(index)}>
            <p class="col-md-3"><strong># {index+1}</strong></p>
              <p class="col-md-3"><strong>Nurse ID:</strong> {sign.nurseId}</p>
              <p class="col-md-3"><strong>PatientId ID:</strong> {sign.patientId}</p>
              <p className="col-md-3"><strong>Updated At:</strong> {new Date(parseInt(sign.updatedAt)).toLocaleString()}</p>
            </div>
            {expandedIndex === index && (
              <div className="details row">
                <p  class="col-md-4"><strong>Temperature:</strong> {sign.temperature}</p>
                <p class="col-md-4"><strong>Heart Rate:</strong> {sign.heartRate}</p>
                <p class="col-md-4"><strong>Blood Pressure:</strong> {sign.bloodPressure}</p>
                <p class="col-md-4"><strong>Respiratory Rate:</strong> {sign.respiratoryRate}</p>
                <p class="col-md-4"><strong>Notes:</strong> {sign.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;
