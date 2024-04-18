import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_IN, SIGN_UP } from '../graphql/mutations';
import '../css/Login.css';

const useQuery = () => new URLSearchParams(useLocation().search);

const AuthForm = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const isRegistering = query.get("register") === "true";
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        age: '',
        gender: 'male', // Default as 'male', can also be set to '' if no default should be preselected
        role: 'nurse',
    });

    const [authenticate, { data, loading, error }] = useMutation(isRegistering ? SIGN_UP : SIGN_IN, {
        onCompleted: data => {
            if(!isRegistering) {
                sessionStorage.setItem('authToken', data.loginUser.token);
                sessionStorage.setItem('userRole', data.loginUser.user.role);
                sessionStorage.setItem('userId', data.loginUser.user.id);  // Storing user ID in session storage
    
                data.loginUser.user.role === 'nurse' ? navigate('/nurse-dashboard') : navigate('/patient-dashboard');
            } else {
                navigate('/login'); // Redirect to login after registration
            }
            alert("Success");
        },
        onError: err => {
            console.error("Authentication error:", err);
            alert("Authentication failed: " + err.message); // Or update state to show error message in the UI
        }
    });
    

    useEffect(() => {
        // Reset form when switching between login and registration
        setFormData({
            email: '',
            username: '',
            password: '',
            age: '',
            gender: 'male',
            role: 'nurse',
        });
    }, [isRegistering]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', formData); // Log the form data being submitted
        authenticate({
            variables: isRegistering ? {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                age: formData.age,
                gender: formData.gender,
                role: formData.role
            } : {
                email: formData.email,
                password: formData.password
            }
        });
    };
    

    return (
        <div className="w-100">
            <div className="home_bg"></div>
            <div className="auth-form">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                    />
                    {isRegistering && (
                        <div className="login-sub-div">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                                required
                            />
                            <input
                                type="number"
                                name="age"
                                id="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                                required
                            />
                            <label htmlFor="gender">Gender:</label>
                            <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <label htmlFor="role">Role:</label>
                            <select name="role" id="role" value={formData.role} onChange={handleInputChange}>
                                <option value="nurse">Nurse</option>
                                <option value="patient">Patient</option>
                            </select>
                        </div>
                    )}
                    <button className="btn btn-primary" type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                    {isRegistering ? <a href="/login">Login</a> : <a href="/login?register=true">Register</a>}
                    <a href="/" className='text-success'>Go to Home</a>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && <p>{isRegistering ? 'Registered' : 'Logged in'} successfully!</p>}
            </div>
        </div>
    );
};

export default AuthForm;
