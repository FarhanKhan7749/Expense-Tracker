import { Container, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import AuthContext from "../../store/auth-context";
//import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
const WelcomeHome = () => {
  //const authCtx = useContext(AuthContext);
  const token = useSelector(state => state.auth.token);

  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };

  const verifyEmailHandler = () => {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_-vfM--LmM1vWcFIkvCYJs7kKfJ6xfl8";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "Failed to Verify Email";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addClickHandler = () =>{
    history.replace('/expenses');
}
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Container className="bg-secondary p-5 rounded text-center justify-content-between">
        <h1 className="text-light h1 mb-4">Welcome to Expense Tracker!!!</h1>
        <p className="text-light h5 p-2">
          Your profile is Incomplete.
          <Badge bg="primary" className="ms-2 p-2">
            <Link className="text-light text-decoration-none" to="/profile">
              Complete now
            </Link>
          </Badge>
        </p>
        <Button
          className="m-2 col-md-3 text-center"
          variant="primary"
          type="submit"
          onClick={verifyEmailHandler}
        >
          Verify Your Email
        </Button>
        <Button
          onClick={addClickHandler}
          variant="primary  "
          className="m-2 col-md-3 text-center rounded"
        >
          Add Expenses
        </Button>
      </Container>
    </div>
  );
};

export default WelcomeHome;
