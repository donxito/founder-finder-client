// LogoutButton.tsx
import React from 'react';
import authService from '../services/auth.service';

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout} className="btn">
      Logout
    </button>
  );
};

export default LogoutButton;
