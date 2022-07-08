import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {

    if (email === '' || password === '') {
      setErrors(['Email and password are required']);
    }

  }, [email, password]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <form onSubmit={onLogin}>
        <div className='login__errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="login__input">
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login__input">
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
      </form>
      <button type='submit' className='login__button' onClick={onLogin} disabled={!!errors.length}>Log In</button>
      <button className='demo__button login__button' onClick={() => dispatch(login('demo@aa.io', 'password'))}>Demo</button>
      <div className='border__bottom'></div>
    </div>
  );
};

export default LoginForm;
