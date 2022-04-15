import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import GameArea from "./components/gamearea/GameArea";
import { authenticate } from "./store/session";
import BrowseReplays from "./components/replays/BrowseReplays";

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
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/browse" exact={true}>
          <BrowseReplays />
        </ProtectedRoute>
        <ProtectedRoute path="/replays/:gameId" exact={true}>
          <h1>Hi from single replay page</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/replays/user/:userId" exact={true}>
          <h1>Hi from personal replays page</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <GameArea />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
