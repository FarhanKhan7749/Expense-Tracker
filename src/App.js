import React, { Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthSignUPForm from "./Auth/AuthSignUPForm";
import AuthLoginForm from "./Auth/AuthLoginForm";
import Header from "./Components/Layout/Header";
import WelcomeHome from "./Pages/WlcomePage/welcomePage";
import AuthContext from "./store/auth-context";
import ProfileSection from "./Pages/ProfilePage/profilePage";
import ForgotPassword from "./Pages/FrogetPass/FrogetPassword";
import Expenses from "./Components/Layout/Expenses/Expenses";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Header></Header>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            {authCtx.isLoggedin && <Route path="/expenses">
              <Expenses />
            </Route>}
            <Route path="/welcome" exact>
              <WelcomeHome />
            </Route>
            {!authCtx.isLoggedin && (
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
            {authCtx.isLoggedin && (
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
