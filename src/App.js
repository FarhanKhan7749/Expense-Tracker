import React, { Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthSignUPForm from "./Auth/AuthSignUPForm";
import AuthLoginForm from "./Auth/AuthLoginForm";
import Header from "./Components/Layout/Header";
import HomePage from "./Pages/HomePage/HomePage";
import WelcomeHome from "./Pages/WlcomePage/welcomePage";
//import AuthContext from "./store/auth-context";
import ProfileSection from "./Pages/ProfilePage/profilePage";
import ForgotPassword from "./Pages/FrogetPass/FrogetPassword";
import Expenses from "./Components/Layout/Expenses/Expenses";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/authSlice";

function App() {
  //const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  //const userEmail = useSelector(state => state.auth.email);
  //const userToken = useSelector(state => state.auth.token);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(authActions.isAuth());
    }
  }, [dispatch]);

  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <Header></Header>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            {isLoggedIn && (
              <Route path="/expenses" exact>
                <Expenses />
              </Route>
            )}
            {isLoggedIn && (
              <Route path="/welcome" exact>
                <WelcomeHome />
              </Route>
            )}
            {!isLoggedIn && (
              <Route path="/login" exact>
                <AuthLoginForm />
              </Route>
            )}
            <Route path="/signup" exact>
              <AuthSignUPForm />
            </Route>
            <Route path="/profile" exact>
              <ProfileSection />
            </Route>
            <Route path="*">
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </React.Fragment>
  );
}

export default App;
