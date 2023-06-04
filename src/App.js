import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthSignUPForm from "./Auth/AuthSignUPForm";
import AuthLoginForm from "./Auth/AuthLoginForm";
import Header from "./Components/Layout/Header";
import WelcomeHome from "./Pages/ExpensePage";

function App() {
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
          </Switch>
        </Suspense>
      </Container>
    </React.Fragment>
  );
}

export default App;
