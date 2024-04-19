import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_DAILY_INFO_HISTORY } from "../graphql/queries";  // Ensure this query is defined in your queries file
import '../css/NurseDashboard.css';

const DailyInfoHistory = () => {
    const { id } = useParams();  
    const { loading, error, data } = useQuery(GET_DAILY_INFO_HISTORY, {
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
        <h1 className="text-dark text-bold">Daily Info History</h1>
        <div className="history-container">
          {data && data.getDailyInfoHistory.map((info, index) => (
            <div key={index} className="history-item">
              <div className="summary row" onClick={() => handleExpand(index)}>
                <p className="col-md-3"><strong># {index + 1}</strong></p>
                <p className="col-md-3"><strong>Updated On:</strong> {new Date(parseInt(info.updatedOn)).toLocaleDateString()}</p>
              </div>
              {expandedIndex === index && (
                <div className="details row">
                  <p className="col-md-4"><strong>Pulse Rate:</strong> {info.pulseRate}</p>
                  <p className="col-md-4"><strong>Blood Pressure:</strong> {info.bloodPressure}</p>
                  <p className="col-md-4"><strong>Weight:</strong> {info.weight} kg</p>
                  <p className="col-md-4"><strong>Temperature:</strong> {info.temperature}°C</p>
                  <p className="col-md-4"><strong>Respiratory Rate:</strong> {info.respiratoryRate}</p>
                  <p className="col-md-4"><strong>Medication Taken:</strong> {info.medicationTaken ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default DailyInfoHistory;
