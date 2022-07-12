import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import logoutBtn from '../../images/cdn.onlinewebfonts.png'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <img src={logoutBtn} alt="logout" className="logout-button" onClick={onLogout} />;
};

export default LogoutButton;
