import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import TestRender from './components/testRender/test';
// import SignUpModal from './components/auth/SignupModal';
import SignupPage from './components/SignupPage/SignupPage';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <ProtectedRoute><NavBar /></ProtectedRoute> */}
      <Switch>
        {/* <Route exact path="/login" component={LoginForm} /> */}
        <ProtectedRoute exact path="/welcome" component={LandingPage} />

        <Route exact path="/test" component={TestRender} />

        <Route path="/signup" component={SignupPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

  // <BrowserRouter>
  //   <NavBar />
  //   <Switch>
  //     <Route path='/login' exact={true}>
  //       <LoginForm />
  //     </Route>
  //     <Route path='/sign-up' exact={true}>
  //       <SignUpForm />
  //     </Route>
  //     <ProtectedRoute path='/users' exact={true} >
  //       <UsersList/>
  //     </ProtectedRoute>
  //     <ProtectedRoute path='/users/:userId' exact={true} >
  //       <User />
  //     </ProtectedRoute>
  //     <ProtectedRoute path='/' exact={true} >
  //       <h1>My Home Page</h1>
  //     </ProtectedRoute>
  //   </Switch>
  // </BrowserRouter>
