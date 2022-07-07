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

            <div>
              <label>Date of birth</label>
              <select className='birthday__input'
                onChange={updateDay}>
                <option value='01'>01</option>
                <option value='02'>02</option>
                <option value='03'>03</option>
                <option value='04'>04</option>
                <option value='05'>05</option>
                <option value='06'>06</option>
                <option value='07'>07</option>
                <option value='08'>08</option>
                <option value='09'>09</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
                <option value='13'>13</option>
                <option value='14'>14</option>
                <option value='15'>15</option>
                <option value='16'>16</option>
                <option value='17'>17</option>
                <option value='18'>18</option>
                <option value='19'>19</option>
                <option value='20'>20</option>
                <option value='21'>21</option>
                <option value='22'>22</option>
                <option value='23'>23</option>
                <option value='24'>24</option>
                <option value='25'>25</option>
                <option value='26'>26</option>
                <option value='27'>27</option>
                <option value='28'>28</option>
                <option value='29'>29</option>
                <option value='30'>30</option>
                <option value='31'>31</option>
              </select>
              <select className='birthday__input'
                onChange={updateMonth}>
                <option value='01'>01</option>
                <option value='02'>02</option>
                <option value='03'>03</option>
                <option value='04'>04</option>
                <option value='05'>05</option>
                <option value='06'>06</option>
                <option value='07'>07</option>
                <option value='08'>08</option>
                <option value='09'>09</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
                <select className='birthday__input'
                  onChange={updateYear}>
                  <option value='2022'>2022</option>
                  <option value='2021'>2021</option>
                  <option value='2020'>2020</option>
                  <option value='2019'>2019</option>
                  <option value='2018'>2018</option>
                  <option value='2017'>2017</option>
                  <option value='2016'>2016</option>
                  <option value='2015'>2015</option>
                  <option value='2014'>2014</option>
                  <option value='2013'>2013</option>
                  <option value='2012'>2012</option>
                  <option value='2011'>2011</option>
                  <option value='2010'>2010</option>
                  <option value='2009'>2009</option>
                  <option value='2008'>2008</option>
                  <option value='2007'>2007</option>
                  <option value='2006'>2006</option>
                  <option value='2005'>2005</option>
                  <option value='2004'>2004</option>
                  <option value='2003'>2003</option>
                  <option value='2002'>2002</option>
                  <option value='2001'>2001</option>
                  <option value='2000'>2000</option>
                  <option value='1999'>1999</option>
                  <option value='1998'>1998</option>
                  <option value='1997'>1997</option>
                  <option value='1996'>1996</option>
                  <option value='1995'>1995</option>
                  <option value='1994'>1994</option>
                  <option value='1993'>1993</option>
                  <option value='1992'>1992</option>
                  <option value='1991'>1991</option>
                  <option value='1990'>1990</option>
                  <option value='1989'>1989</option>
                  <option value='1988'>1988</option>
                  <option value='1987'>1987</option>
                  <option value='1986'>1986</option>
                  <option value='1985'>1985</option>
                  <option value='1984'>1984</option>
                  <option value='1983'>1983</option>
                  <option value='1982'>1982</option>
                  <option value='1981'>1981</option>
                  <option value='1980'>1980</option>
                  <option value='1979'>1979</option>
                  <option value='1978'>1978</option>
                  <option value='1977'>1977</option>
                  <option value='1976'>1976</option>
                  <option value='1975'>1975</option>
                  <option value='1974'>1974</option>
                  <option value='1973'>1973</option>
                </select>
              </select>
            </div>
            <button type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
