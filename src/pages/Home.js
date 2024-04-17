import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home_bg"></div>
            <h1>Welcome to the Health Monitoring System</h1>
            <p>This application helps nurses and patients manage health records efficiently.</p>
            <div className="login-register">
                <Link to="/login" className="button-link">Login</Link>
                <Link to="/login?register=true" className="button-link">Register</Link>
            </div>
        </div>
    );
};

export default Home;
