import { useState } from "react";
import classes from "./Expenses.module.css";
import {Container, Form } from "react-bootstrap";

const Expenses = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [showExpenses, setShowExpenses] = useState(false);

  const onClickHandler = (event) => {
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    // Check if any of the form fields are empty
    if (!amount || !description || !category) {
      alert("Please fill out all fields."); // Display alert message
      return; // Prevent form submission
    }
    const expenses = {
      amount: amount,
      description: description,
      category: category,
    };
    setExpenseList([...expenseList, expenses]);
    setShowExpenses(true);
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
  };
  const addedExpenses = expenseList.map((exp) => (
    <li key={Math.random()}>
      <div className={classes.amount}>{exp.amount}</div>
      <div className={classes.description}>{exp.description}</div>
      <div className={classes.category}>{exp.category}</div>
    </li>
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
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select type="category" placeholder="Select Expense">
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
