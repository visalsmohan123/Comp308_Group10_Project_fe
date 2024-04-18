import React, { useState } from 'react';
import axios from 'axios';
import '../css/patient.css';

const DiabeticCheckForm = () => {
    const [formData, setFormData] = useState({
        pregnancies: 0,
        glucose: 0,
        bloodPressure: 0,
        skinThickness: 0,
        insulin: 0,
        bmi: 0,
        diabetesPedigreeFunction: 0,
        age: 0
    });
    const [prediction, setPrediction] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePredict = async () => {
        try {
            const response = await axios.post('http://localhost:4000/predictions/predict', formData);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error predicting:', error);
        }
    };

    return (
        <div className="formContainer">
            <h1>Diabetic Check Form</h1>
            <div>
                <label>
                    No of Pregnancies:
                    <input type="number" name="pregnancies" value={formData.pregnancies} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    Glucose level:
                    <input type="number" name="glucose" value={formData.glucose} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    Blood Pressure:
                    <input type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    Skin Thickness:
                    <input type="number" name="skinThickness" value={formData.skinThickness} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    Insulin:
                    <input type="number" name="insulin" value={formData.insulin} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    BMI:
                    <input type="number" name="bmi" value={formData.bmi} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    Diabetes Pedigree Function:
                    <input type="number" name="diabetesPedigreeFunction" value={formData.diabetesPedigreeFunction} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <button className="button" onClick={handlePredict}>Predict</button>
            </div>
            {prediction && <p>Prediction: {prediction}</p>}
        </div>
    );
};

export default DiabeticCheckForm;
