import React, { Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthSignUPForm from "./Auth/AuthSignUPForm";
import AuthLoginForm from "./Auth/AuthLoginForm";
import Header from "./Components/Layout/Header";
import WelcomeHome from "./Pages/WlcomePage/welcomePage";
//import AuthContext from "./store/auth-context";
import ProfileSection from "./Pages/ProfilePage/profilePage";
import ForgotPassword from "./Pages/FrogetPass/FrogetPassword";
import Expenses from "./Components/Layout/Expenses/Expenses";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from "./store/authSlice";

function App() {
  //const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const userEmail = useSelector(state => state.auth.email);
  const userToken = useSelector(state => state.auth.token);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      dispatch(authActions.login({ email: email, token: token }))
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("useeffect called");
    if (isLoggedIn) {
      localStorage.setItem('email', userEmail);
      localStorage.setItem('token', userToken);
      console.log("useffect fectching")
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      console.log("useeffect remove")
    }
  }, [isLoggedIn, userEmail, userToken]);


  return (
    <React.Fragment>
      <Header></Header>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            {isLoggedIn && <Route path="/expenses">
              <Expenses />
            </Route>}
            <Route path="/welcome" exact>
              <WelcomeHome />
            </Route>
            {!isLoggedIn && (
              <Route path="/login">
                <AuthLoginForm />
              </Route>
            )}
            <Route path="/signup" exact>
              <AuthSignUPForm />
            </Route>
            <Route path="/profile" exact>
              <ProfileSection />
            </Route>
            {isLoggedIn && (
              <Route path="*">
                <AuthLoginForm />
              </Route>
            )}
          </Switch>
        </Suspense>
      </Container>
    </React.Fragment>
  );
}

export default App;
