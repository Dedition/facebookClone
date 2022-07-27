import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import SignupPage from './components/SignupPage/SignupPage';
import LandingPage from './components/LandingPage/LandingPage';
import FriendsPage from './components/FriendsPage/FriendsPage';

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
      <Switch>

        <ProtectedRoute exact path="/home" component={LandingPage} />

        <ProtectedRoute exact path="/friends" component={FriendsPage} />
        <Route path="/" component={SignupPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
