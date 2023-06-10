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

  const onClickHandler = async (event) => {
    event.preventDefault();
    const enteredAmount = amountInputref.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const expenses = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    try {
      const response = await axios.post(
        "https://expence-tracker-server-react-default-rtdb.firebaseio.com/expenses.json",
        expenses
      );
      const idToken = response.data.name;
      const addExpense = { id: idToken, ...expenses };
      setExpenseList([...expenseList, addExpense]);
      setShowExpenses(true);
      amountInputref.current.value = "";
      descriptionInputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      const fetchExpense = async () => {
        const response = await axios.get(
          "https://expence-tracker-server-react-default-rtdb.firebaseio.com/expenses.json"
        );
        const data = response.data;
        const newExpenseArray = [];
        for (let key in data) {
          newExpenseArray.push({ id: key, ...data[key] });
        }
        setShowExpenses(true);
        if (newExpenseArray.length === 0) {
          setShowExpenses(false);
        }
        setExpenseList([...newExpenseArray]);
      };
      fetchExpense();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const deleteExpenseHandler = async (expense) => {
    const id = expense.id;
    try {
      await axios.delete(
        `https://expence-tracker-server-react-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
    } catch (err) {
      console.log(err);
    }
    setExpenseList(expenseList.filter((data) => data.id !== expense.id));
    if (expenseList.length === 1) {
      setShowExpenses(false);
    }
    console.log("Expense is succefully deleted");
  };

  const editExpenseHandler = async (expense) => {
    amountInputref.current.value = expense.amount;
    descriptionInputRef.current.value = expense.description;
    categoryInputRef.current.value = expense.category;
    const id = expense.id;
    try {
      await axios.delete(
        `https://expence-tracker-server-react-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
    } catch (err) {
      console.log(err);
    }
    setExpenseList(expenseList.filter((data) => data.id !== expense.id));
  };

  const addedExpenses = expenseList.map((exp) => (
    <tr key={Math.random()}>
      <td>{exp.amount}</td>
      <td>{exp.description}</td>
      <td>{exp.category}</td>
      <td>
        <Button
          variant="danger"
          onClick={() => deleteExpenseHandler(exp)}
          className=""
        >
          Delete
        </Button>
      </td>
      <td>
        <Button
          variant="primary"
          onClick={() => editExpenseHandler(exp)}
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
      {showExpenses && (
        <Table className={classes["list-class"]} striped bordered hover>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>{addedExpenses}</tbody>
        </Table>
      )}
    </>
  );
};

export default Expenses;
