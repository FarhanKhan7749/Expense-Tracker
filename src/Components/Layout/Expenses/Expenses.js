import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {Container, Form } from "react-bootstrap";
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

  const addedExpenses = (
    expenseList.map((exp) => (
        <li key={Math.random()}>
            <div className={classes.amount}>
                {exp.amount}
            </div>
            <div className={classes.description}>
                {exp.description}
            </div>
            <div className={classes.category}>
                {exp.category}
            </div>
        </li>
    ))
)

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
            <Form.Select type="category" placeholder="Select Expense" ref={categoryInputRef}>
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
      {showExpenses && (
        <div className={classes["added-expenses"]}>
          <div className={classes["expense-heading"]}>
            <div>Amount</div>
            <div>Description</div> <div>Category</div>
          </div>
          <ul>{addedExpenses}</ul>
        </div>
      )}
    </>
  );
};

export default Expenses;
