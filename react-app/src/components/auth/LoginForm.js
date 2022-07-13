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


  // useEffect(() => {

  //   if (email === '' || password === '') {
  //     setErrors(['Email and password are required']);
  //   }

  // }, [email, password]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(['Sorry! Email or password is incorrect']);
    }

    if (email === '' || password === '') {
      setErrors(['Email and password are required']);
    }
  };

  useEffect(() => {
    if (email === '' || password === '') {
      setErrors(['Email and password are required']);
    }
    setErrors([]);
  }, [email, password]);



  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div>
      <form onSubmit={onLogin}>
        <div className='login__errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="login__input__container">
          <input
            name='email'
            className='login__input'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            autoComplete='off'
          />
        </div>
        <div className="login__input__container">
          <input
            name='password'
            type='password'
            className="login__input"
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            autoComplete='off'
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
