import React from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRouteList = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return null;
  }

  return element;
};

export default PrivateRouteList;
