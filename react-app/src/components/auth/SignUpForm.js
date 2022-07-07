import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import { months, years } from './utils';
import moment from 'moment';

const SignUpForm = ({ setIsOpen }) => {
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

  const [month, setMonth] = useState(moment(date).format("MMMM Do YYYY, h:mm:ss a").split(",")[0].split(" ")[0]);
  console.log(month);


  const [day, setDay] = useState("1");
  console.log(day);

  const [year, setYear] = useState(moment(date).format("MMMM Do YYYY, h:mm:ss a").split(",")[0].split(" ")[2]);
  console.log(year);


  const onSignUp = async (e) => {
    e.preventDefault();
    const err = [];

    let birthday = new Date(`${month} ${day}, ${year}`);
    console.log(month, day, year);
    birthday = birthday.toISOString();
    console.log(birthday);

    if (username.length < 20 && firstName.length < 20 && lastName.length < 20 && email.length < 50 && password.length < 50 && repeatPassword.length < 50) {
      if (password === repeatPassword) {
        const user = await dispatch(signUp(username, firstName, lastName, email, password, birthday));
        if (user) {
          history.push('/login');
          setIsOpen(false);
        }
      } else {
        err.push('Passwords do not match');
        setErrors(err);
      }
    } else if (!username || !firstName || !lastName || !email || !password || !repeatPassword) {
      err.push('Please fill out all fields');
      setErrors(err);
    } else if (username.length > 20) {
      err.push('Username must be less than 20 characters');
      setErrors(err);
    } else if (firstName.length > 20) {
      err.push('First name must be less than 20 characters');
      setErrors(err);
    } else if (lastName.length > 20) {
      err.push('Last name must be less than 20 characters');
      setErrors(err);
    } else if (email.length > 50) {
      err.push('Email must be less than 50 characters');
      setErrors(err);
    } else if (password.length > 50) {
      err.push('Password must be less than 50 characters');
      setErrors(err);
    } else if (repeatPassword.length > 50) {
      err.push('Repeat password must be less than 50 characters');
      setErrors(err);
    } else {
      err.push('Please fill out all fields');
      setErrors(err);
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
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

  const updateBirthday = (e) => {
    setBirthday(e.target.value);
  };

  const updateMonth = (e) => {
    setMonth(e.target.value);
  };

  const updateDay = (e) => {
    setDay(e.target.value);
  };

  const updateYear = (e) => {
    setYear(e.target.value);
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

              <label>Username</label>
              <input
                type='text'
                name='username'
                placeholder='Username'
                onChange={updateUsername}
                value={username}
              ></input>

            </div>

            <div>
              <label>First Name</label>
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                onChange={updateFirstName}
                value={firstName}
              ></input>
            </div>

            <div>
              <label>Surname</label>
              <input
                type='text'
                name='lastName'
                placeholder='Surname'
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>
            <div>

              <label>Email</label>
              <input
                type='text'
                name='email'
                placeholder='Email address'
                onChange={updateEmail}
                value={email}
              ></input>

            </div>
            <div>

              <label>Password</label>
              <input
                type='password'
                name='password'
                placeholder='New Password'
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

            <span className="birthday">Birthday</span>
            <div className="create__account__input__name__container">
              <select
                className="create__birthday__input"
                value={month}
                onChange={updateMonth}
                required
              >
                {months.map((month) => {
                  return (
                    <option value={month} key={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
              <select
                className="create__birthday__input"
                value={day}
                onChange={updateDay}
                required
              >
                {Array.apply(null, Array(31)).map(function (ele, i) {
                  return (
                    <option value={(i += 1)} key={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <select
                className="create__birthday__input"
                value={year}
                onChange={updateYear}
                required
              >
                {years.map((year) => {
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='create__account__button__container'>
              <button type='submit' className='create__account__submit-button'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
