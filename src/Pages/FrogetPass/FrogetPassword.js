import {useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Form,  } from "react-bootstrap";
import classes from "./FrogetPassword.module.css";
import { Container } from "react-bootstrap";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;

    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_-vfM--LmM1vWcFIkvCYJs7kKfJ6xfl8",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "Failed to send reset mail";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
    setIsLoading(false);
  };

  return (
    <>
      {/* <section className={classes["forgot-password-section"]}>
        <header>Expense Tracker</header>
        <form onSubmit={forgotPasswordHandler}>
          <label htmlFor="text">
            Enter your email with which you have registered.
          </label>
          <input type="email" ref={emailInputRef} required />
          <div className={classes["password-action"]}>
            {!isLoading && <button>Send Link</button>}
            {isLoading && <p>Loading...</p>}
          </div>
          <p>
            Already a user?{" "}
            <NavLink to="/auth" style={{ color: "beige" }}>
              Login
            </NavLink>
          </p>
        </form>
      </section> */}
      <Container className={classes["forgot-password-section"]}>
        <header>Expense Tracker</header>
        <Form onSubmit={forgotPasswordHandler}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="ml-2 text-center">
              Enter your email with which you have registered.
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email mail"
              ref={emailInputRef}
              required
            />
            <Container className={classes["password-action"]}>
              {!isLoading && (
                <Button variant="warning" type="submit">
                  Send Link
                </Button>
              )}
              {isLoading && <p>Loading...</p>}
            </Container>
            <p>Already a user? <NavLink to="/login" className="text-white text-decoration-none">Login</NavLink></p>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default ForgotPassword;
