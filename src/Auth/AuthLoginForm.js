import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Form, Button, Container } from "react-bootstrap";
import AuthContext from "../store/auth-context";

const AuthLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const formRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Add validation
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      alert("Please fill in all fields.");
      return;
    }

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_-vfM--LmM1vWcFIkvCYJs7kKfJ6xfl8";

    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        authCtx.login(data.idToken, enteredEmail);
        history.replace("/welcome");
        console.log("User Log in Successfully");
      } else {
        let errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error.message);
    }

    formRef.current.reset();
  };

  return (
    <React.Fragment>
      <Container
        className="col-md-6 col-lg-6 mt-5 p-5 justify-content-center align-items-center border rounded"
        style={{ fontFamily: "Times New Roman" }}
      >
        <h1 className="text-center">Log In</h1>
        <Form ref={formRef}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailInputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
              className={
                passwordInputRef.current &&
                passwordInputRef.current.value.trim().length === 0
                  ? "empty-input"
                  : ""
              }
            />
          </Form.Group>

          <Container className="text-center justify-content-center align-items-center">
            {!isLoading && (
              <Button
                onClick={submitHandler}
                className="col-md-3 col-lg-6 p-2 m-1"
              >
                Log In
              </Button>
            )}
            {isLoading && <p>Sending request...</p>}
          </Container>
          <Container className="text-center justify-content-center align-items-center">
            {/* Forgot Password link */}
            <Link to="/forgot-password">Forgot Password?</Link>
          </Container>
        </Form>
      </Container>
      <Container
        className="col-md-6 col-lg-6 mt-1 p-2 border rounded"
        style={{ fontFamily: "Times New Roman" }}
      > 
        <>Dont't have an accounts? <Link to="/signup">Sign Up</Link></>
      </Container>
    </React.Fragment>
  );
};

export default AuthLoginForm;
