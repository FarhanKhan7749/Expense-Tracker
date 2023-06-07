import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
//import classes from './Header.module.css';
const fontSize = {
  fontFamily: "Times New Roman",
  fontSize: "20px",
};

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/login");
  };
  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Container className="p-2" fluid style={fontSize}>
          <Navbar.Brand className="ml-5" href="/home">D-Expense</Navbar.Brand>
          <Nav className="mr-5 justify-content-end">
            {/* <Nav.Link className="me-2" to="/home" as={NavLink}>
              Home
            </Nav.Link> */}
            {!authCtx.isLoggedin && (
              <Nav.Link
                className="me-2 justify-content-center"
                to="/login"
                as={NavLink}
              >
                Log In
              </Nav.Link>
            )}
            {!authCtx.isLoggedin && (
              <Nav.Link
                className="me-2 justify-content-center"
                to="/signup"
                as={NavLink}
              >
                Sign Up
              </Nav.Link>
            )}
          </Nav>
          
          {authCtx.isLoggedin && (
            <Button
              onClick={logoutHandler}
              variant="outline-primary"
              className="mr-5 rounded"
            >
              Logout
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
