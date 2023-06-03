import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import AuthContext from "../store/auth-context";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const formRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    // Add validation
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0 ||
      enteredConfirmPassword.trim().length === 0
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      alert("Password and confirm password must match.");
      return;
    }

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_-vfM--LmM1vWcFIkvCYJs7kKfJ6xfl8";
      

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
        //history.replace("/store");
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
    <Container
      className="col-md-6 col-lg-6 mt-5 p-5 justify-content-center align-items-center border rounded"
      style={{ fontFamily: "Times New Roman" }}
    >
      <h1 className="text-center">Sign Up</h1>
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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordInputRef}
            className={
              confirmPasswordInputRef.current &&
              confirmPasswordInputRef.current.value.trim().length === 0
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
              Sign Up
            </Button>
          )}
          {isLoading && <p>Sending request...</p>}
        </Container>
      </Form>
    </Container>
  );
};

export default AuthForm;
