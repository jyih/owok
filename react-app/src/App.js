import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/userslist/UsersList";
// import User from "./components/User";
import GameArea from "./components/gamearea/GameArea";
import { authenticate } from "./store/session";
import BrowseReplays from "./components/replays/BrowseReplays";
import SingleReplay from "./components/replays/SingleReplay";
import ProfilePage from "./components/profile/ProfilePage";
import { Redirect } from "react-router-dom";

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
        {/* <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path="/browse" exact={true}>
          <BrowseReplays />
        </ProtectedRoute>
        <ProtectedRoute path="/replays/:gameId" exact={true}>
          <SingleReplay />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/:userId" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/play" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path="/play/:gameId/:playerOneId/:playerTwoId"
          exact={true}
        >
          <GameArea />
        </ProtectedRoute>
        <ProtectedRoute path="*">
          <Redirect to="/browse" />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
