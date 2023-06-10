import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Container, Form, Table, Button } from "react-bootstrap";
import classes from "./Expenses.module.css";

const Expenses = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [showExpenses, setShowExpenses] = useState(false);
  const amountInputref = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const onClickHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputref.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const expenses = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    axios.post(
      "https://expence-tracker-server-react-default-rtdb.firebaseio.com/expenses.json",
      expenses
    );
    setExpenseList([...expenseList, expenses]);
    setShowExpenses(true);
    amountInputref.current.value = "";
    descriptionInputRef.current.value = "";
  };

  useEffect(() => {
    axios
      .get(
        "https://expence-tracker-server-react-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((res) => {
        const expenses = res.data ? Object.values(res.data) : [];
        setShowExpenses(true);
        setExpenseList([...expenses]);
      });
  }, []);

  const deleteExpenseHandler = () => {
     // Handle delete logic for the expense 
  };

  const editExpenseHandler = (index) => {
    // Handle edit logic for the expense
  };

  const addedExpenses = expenseList.map((exp) => (
    <tr key={Math.random()}>
      <td>{exp.amount}</td>
      <td>{exp.description}</td>
      <td>{exp.category}</td>
      <td>
        <Button
          variant="danger"
          onClick={() => deleteExpenseHandler()}
          className=""
        >
          Delete
        </Button>
        <Button
          variant="primary"
          onClick={() => editExpenseHandler()}
          className=""
        >
          Edit
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Container className={classes["expense-form"]}>
        <header>Add Expenses</header>
        <Form>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Amount"
              ref={amountInputref}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              ref={descriptionInputRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              type="category"
              placeholder="Select Expense"
              ref={categoryInputRef}
            >
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="fuel">Fuel</option>
              <option value="movie">Movie</option>
              <option value="travelling">Travelling</option>
            </Form.Select>
          </Form.Group>
          <button onClick={onClickHandler}>Add</button>
        </Form>
      </Container>
      {showExpenses && <Table className={classes["list-class"]} striped bordered hover>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{addedExpenses}</tbody>
      </Table>}
    </>
  );
};

export default Expenses;
