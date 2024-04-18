import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useQuery,useMutation } from "@apollo/client";
import { GET_USERS_BY_ROLE } from "../graphql/queries"; 
import { CREATE_VITAL_SIGNS } from "../graphql/mutations"; 
import * as bootstrap from 'bootstrap'; // Import Bootstrap
import '../css/NurseDashboard.css';

const NurseDashboard = () => {

    const { data, loading, error } = useQuery(GET_USERS_BY_ROLE, {
        variables: { role: "patient" }, // Set the role variable to 'patient'
    });

    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        const modal = new bootstrap.Modal(document.getElementById("patientVitalModal"));
        modal.show();
    };

    // Create the mutation function using useMutation
    const [addVitalsMutation, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_VITAL_SIGNS);

        // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the form data
        const bodyTemperature = event.target.bodyTemperature.value;
        const heartRate = event.target.heartRate.value;
        const bloodPressure = event.target.bloodPressure.value;
        const respiratoryRate = event.target.respiratoryRate.value;

        try {
            // Call the mutation function with the form data
            const { data } = await addVitalsMutation({
                variables: {
                        nurseId: '661eb83223a187be2e2f9b19',
                        patientId: selectedUser.id,
                        temperature: parseFloat(bodyTemperature),
                heartRate: parseFloat(heartRate),
                bloodPressure,
                respiratoryRate: parseFloat(respiratoryRate),
                },
            });

            // Handle the response if needed
            console.log("Mutation response:", data);
            alert("Submitted Successfully")
            event.target.reset();

        } catch (error) {
            // Handle errors
            console.error("Mutation error:", error);
        }
    };

    return (
        <div className="nurse-div">
            <h1 className="text-dark text-bold">Patient List</h1>
            <div className="nurse-bg"></div>

            <table className="table w-75">
                <thead className="table-dark">
                    <tr>
                        <th>No.</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan="4">Error: {error.message}</td>
                        </tr>
                    ) : (
                        data.getUsersByRole.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleOpenModal(user)}
                                    >
                                        Enter Vitals
                                    </button>{" "}
                                    <Link to={`/patient-history/${user.id}`} className="btn btn-warning ml-2">History</Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal */}
            <div className="modal fade" id="patientVitalModal" tabIndex="-1" aria-labelledby="patientVitalModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title text-bold text-center text-dark" id="patientVitalModalLabel">
                                Enter Vitals for {selectedUser ? selectedUser.username : ""}
                            </h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="vital-form mt-3 text-dark" onSubmit={handleSubmit}>
                                <div className="d-flex w-100 justify-content-between">
                                <input className="w-75" type="text" name="bodyTemperature" id="bodyTemperature" placeholder="Body Temperature" required />
                                <p>Farenheit</p>
                                </div>
                                <div className="d-flex w-100 justify-content-between">
                                <input className="w-75" type="text" name="heartRate" id="heartRate" placeholder="Heart Rate" required />
                                <p>beats/sec</p> 
                                </div>
                                <div className="d-flex w-100 justify-content-between">
                                <input className="w-75" type="text" name="bloodPressure" id="bloodPressure" placeholder="Blood Pressure" required />
                                <p>mmHg</p>
                                </div>
                                <div className="d-flex w-100 justify-content-between">
                                <input className="w-75" type="text" name="respiratoryRate" id="respiratoryRate" placeholder="Respiratory Rate" required />
                                <p>bpm</p>
                                </div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseDashboard;
