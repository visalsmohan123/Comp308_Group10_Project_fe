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
    username: '',
    password: '',
    role: 'nurse',
  });

  const [authenticate, { data, loading, error }] = useMutation(isRegistering ? SIGN_UP : SIGN_IN, {
    onCompleted: data => {
      // Store token and possibly user role
      sessionStorage.setItem('authToken', data[isRegistering ? 'signUp' : 'signIn'].token);
      sessionStorage.setItem('userRole', data[isRegistering ? 'signUp' : 'signIn'].user.role);

      // Redirect based on role
      if (!isRegistering) {
        data.signIn.user.role === 'nurse' ? navigate('/nurse-dashboard') : navigate('/patient-dashboard');
      } else {
        navigate('/login'); // Redirect to login after registration
      }
    },
    onError: err => {
      console.error("Authentication error:", err);
      alert("Authentication failed: " + err.message); // Or update state to show error message in the UI
    }
  });

  useEffect(() => {
    // Reset form when switching between login and register
    setFormData({
      username: '',
      password: '',
      role: 'nurse',
    });
  }, [isRegistering]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticate({
      variables: isRegistering ? {
        username: formData.username,
        password: formData.password,
        role: formData.role
      } : {
        username: formData.username,
        password: formData.password
      }
    });
  };

  return (
    <div class="w-100">
          <div className="home_bg"></div>

<div className="auth-form">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form class="mt-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder = "Username"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder = "Password"

            required
          />
        {isRegistering && (
         
          <div class="login-sub-div">
            <input
            type="email"
            name="email"
            id="email"
            value={formData.username}
            onChange={handleInputChange}
            placeholder = "Email"
            required
          />
          <input
            type="text"
            name="age"
            id="age"
            value={formData.username}
            onChange={handleInputChange}
            placeholder = "Age"
            required
          />
          <label htmlFor="role">Gender:</label>
            <select name="gender" id="gender" value={formData.role} onChange={handleInputChange}>
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
        <button class="btn btn-primary" type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>{isRegistering ? 'Registered' : 'Logged in'} successfully!</p>}
    </div>
    </div>
    
  );
};

export default AuthForm;
