import React, { useEffect, useState } from 'react';
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


  const [day, setDay] = useState("1");

  const [year, setYear] = useState(moment(date).format("MMMM Do YYYY, h:mm:ss a").split(",")[0].split(" ")[2]);


  useEffect(() => {
    const err = [];
    if (username === '' || firstName === '' || lastName === '' || email === '' || password === '' || repeatPassword === '') err.push('All fields are required');

    if (password !== repeatPassword) err.push('Passwords do not match');

    if (username.length > 20) err.push('Username must be less than 20 characters');

    if (firstName.length > 20) err.push('First name must be less than 20 characters');

    if (lastName.length > 20) err.push('Last name must be less than 20 characters');

    if (email.length > 50) err.push('Email must be less than 50 characters');

    if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) === null) err.push('Email must include an @ symbol and a .');

    if (password.length > 20) err.push('Password must be less than 20 characters');

    if (repeatPassword.length > 20) err.push('Repeat password must be less than 20 characters');

    setErrors(err);
  }, [username, firstName, lastName, email, password, repeatPassword]);


  const onSignUp = async (e) => {
    e.preventDefault();
    const err = [];

    let birthday = new Date(`${month} ${day}, ${year}`);
    birthday = birthday.toISOString();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('email', email);
    formData.append('birthday', birthday);
    formData.append('password', password);

    const data = await dispatch(signUp(formData));

    if (data?.includes("username : Username is already in use.")) {
      err.push('Username: Username is already in use.')
    }

    if (data?.includes("email : Email address is already in use.")) {
      err.push('Email: Email is already in use')
    }
    setErrors(err);
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
    <div>
      <div className='signup__form__header'>
        <div className='signup__form__header-one'>Sign Up</div>
        <div className='signup__form__header-two'>It's quick and easy.</div>
      </div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.length > 0 && errors.map((error, ind) => (
            <div className="login__errors" key={ind}>* {error}</div>
          ))}
        </div>
        <div className='creation__input__container'>

          <input
            className='creation__input__name'
            type='text'
            name='firstName'
            placeholder='First Name'
            onChange={updateFirstName}
            value={firstName}
            autoComplete='off'
          ></input>

          <div>

            <input
              className='creation__input__name'
              type='text'
              name='lastName'
              placeholder='Surname'
              onChange={updateLastName}
              value={lastName}
              autoComplete='off'
            ></input>
          </div>
        </div>


        <input
          className='creation__input'
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
          autoComplete='off'
        ></input>

        <div>


          <input
            className='creation__input'
            type='text'
            name='email'
            placeholder='Email address'
            onChange={updateEmail}
            value={email}
            autoComplete='off'
          ></input>

        </div>
        <div>


          <input
            className='creation__input'
            type='password'
            name='password'
            placeholder='New Password'
            onChange={updatePassword}
            value={password}
          ></input>

        </div>
        <div>


          <input
            className='creation__input'
            placeholder='Confirm Password'
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
            className="create__birthday"
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
            className="create__birthday"
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
            className="create__birthday"
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
          <button type='submit' className='create__account__submit-button' disabled={!!errors.length}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
