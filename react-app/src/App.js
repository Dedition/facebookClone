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
      <ProtectedRoute><NavBar /></ProtectedRoute>
      <Switch>
        <Route exact path="/login" component={LoginForm} />

        <Route exact path="/test" component={TestRender} />

        <Route exact path="/signup" component={SignUpForm} />
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
