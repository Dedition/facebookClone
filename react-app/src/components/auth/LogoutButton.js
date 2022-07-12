import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <img src="/images/cdn.onlinewebfonts.png" alt="logout" className="logout-button" onClick={onLogout} />;
};

export default LogoutButton;
