import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';

const HomePage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      const savedToken = JSON.parse(localStorage.getItem('token'));
      if (savedToken && savedToken.accessToken) {
        setToken(savedToken);
      } else {
        navigate('/'); // Redirect to login if no token
      }
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // or navigate to login if not authenticated
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <h1 className="text-center text-gray-800 text-6xl my-8 font-serif">
        Employee Dashboard
      </h1>
      {token && <EmployeeList token={token} />}
    </div>
  );
};

export default HomePage;
