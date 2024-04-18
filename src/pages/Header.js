import React from "react";
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
  };

  return (
    <header >
    <div class="logo-div"></div>
      <h2>Welcome</h2>
      <Link to="/" className="text-danger text-bold" onClick={handleLogout}>LogOut</Link>
    </header>
  );
};

export default DashboardHeader;
