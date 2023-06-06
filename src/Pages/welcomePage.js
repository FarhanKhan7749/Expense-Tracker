import { Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const WelcomeHome = () => {
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
      </Container>
    </div>
  );
};

export default WelcomeHome;