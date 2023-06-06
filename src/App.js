import React, { Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthSignUPForm from "./Auth/AuthSignUPForm";
import AuthLoginForm from "./Auth/AuthLoginForm";
import Header from "./Components/Layout/Header";
import WelcomeHome from "./Pages/welcomePage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Header></Header>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/welcome" exact>
              <WelcomeHome />
            </Route>
            <Route path="/login" exact>
              <AuthLoginForm />
            </Route>
            <Route path="/signup" exact>
              <AuthSignUPForm />
            </Route>
            {authCtx.login && <Route path="*">
              <AuthLoginForm />
            </Route>}
          </Switch>
        </Suspense>
      </Container>
    </React.Fragment>
  );
}

export default App;
