import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import moment from 'moment';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();


  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);

  let date = new Date();

  const [month, setMonth] = useState(moment(date).format("MMMM Do YYYY, h:mm:ss a").split(", ")[0]).split(" ")[0];
  console.log(month);

  const [day, setDay] = useState(moment(date).format("MMMM Do YYYY, h:mm:ss a").split(", ")[0]).split(" ")[1];
  console.log(day);

  const [year, setYear] = useState(moment(date).format("MMMM Do YYYY, h:mm:ss a").split(", ")[0]).split(" ")[2];
  console.log(year);


  const onSignUp = async (e) => {
    e.preventDefault();
    const err = [];

    let birthday = new Date(`${month} ${day}, ${year}`);
    birthday = moment(birthday).format("YYYY-MM-DD");


    if (username === '') {
      err.push('Username is required');
    } else if (username.length > 20) {
      err.push('Username must be less than 20 characters');
    } else if (firstName === '') {
      err.push('First name is required');
    } else if (firstName.length > 20) {
      err.push('First name must be less than 20 characters');
    } else if (lastName === '') {
      err.push('Last name is required');
    } else if (lastName.length > 20) {
      err.push('Last name must be less than 20 characters');
    } else if (email === '') {
      err.push('Email is required');
    } else if (email.length > 50) {
      err.push('Email must be less than 50 characters');
    } else if (birthday === '') {
      err.push('Birthday is required');
    } else if (password === '') {
      err.push('Password is required');
    } else if (repeatPassword === '') {
      err.push('Repeat password is required');
    } else if (password !== repeatPassword) {
      err.push('Passwords do not match');
    } else if (password.length < 8) {
      err.push('Password must be at least 8 characters');
    } else if (password.length > 128) {
      err.push('Password must be less than 128 characters');
    } else if (password.search(/[a-z]/i) < 0) {
      err.push('Password must contain at least one lowercase letter');
    } else if (password.search(/[A-Z]/i) < 0) {
      err.push('Password must contain at least one uppercase letter');
    } else if (password.search(/[0-9]/) < 0) {
      err.push('Password must contain at least one number');
    } else if (password.search(/[!@#$%^&*]/) < 0) {
      err.push('Password must contain at least one special character');
    } else if (password.search(/[a-zA-Z0-9!@#$%^&*]/) === 0) {
      err.push('Password must contain at least one letter and number');
    } else {
      dispatch(signUp(username, firstName, lastName, email, birthday, password));
      history.push('/');
    }
    //   if (password === repeatPassword) {
    //     const data = await dispatch(signUp(username, email, password));
    //     if (data) {
    //       setErrors(data)
    //     }
    //   }
    // };

    const updateUsername = (e) => {
      setUsername(e.target.value);
    };

    const updateEmail = (e) => {
      setEmail(e.target.value);
    };

    const updatePassword = (e) => {
      setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
      setRepeatPassword(e.target.value);
    };

    if (user) {
      return <Redirect to='/' />;
    }

    return (
      <div className='signup__form__container'>
        <div className='signup__form__header-one'>
          Sign Up
          <div className='signup__form__header-two'>
            It's quick and easy.
            <form onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <label>User Name</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div>
                <label>Repeat Password</label>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <button type='submit'>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default SignUpForm;
