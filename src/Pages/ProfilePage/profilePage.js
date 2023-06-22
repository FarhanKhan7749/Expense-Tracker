import { useHistory } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import classes from "./profilePage.module.css";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from 'react-redux';


const ProfilePage = () => {
  // const token = useSelector(state => state.auth.token);
  const token = localStorage.getItem('token');
  //console.log(token)
  const nameInputRef = useRef();
  const photoUrlInputRef = useRef();
  //const authCtx = useContext(AuthContext);
  const history = useHistory();
  
  const formSumbitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB_-vfM--LmM1vWcFIkvCYJs7kKfJ6xfl8";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        displayName: enteredName,
        photoUrl: enteredPhotoUrl,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "Failed to update Details";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const cancelButtonHandler = () => {
    history.replace("/welcome");
  };
 
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB_-vfM--LmM1vWcFIkvCYJs7kKfJ6xfl8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
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
          let errorMessage = "Failed to fetch Details";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        const email = localStorage.getItem("email");
        console.log(email);
        const users = data.users;
        console.log(users[0].email);
        users.forEach((user) => {
          if (user.email.replace('@','').replace('.','') === email) {
            nameInputRef.current.value = user.displayName;
            photoUrlInputRef.current.value = user.photoUrl;
          }
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [token]);

  
  return (
    <section className={classes.profile}>
      <Container className="d-flex border-bottom rounded p-1">
        <Container className={classes.headingtag}>
          Winners never quite, Quitters never win.
        </Container>
        <Container className={classes.proge}>
          Your Profile is 64% completed. A complete Profile has higher chances
          of landing a job. Complete now
        </Container>
      </Container>
      <Container className={classes.form}>
        <Container className="d-flex">
          <Container className="h2">Contact Details</Container>
          <Button variant="danger" onClick={cancelButtonHandler}>
            Cancel
          </Button>
        </Container>
        {/* <form onSubmit={formSumbitHandler}>
          <div className={classes["profile-info"]}>
            <label htmlFor="text">Full Name</label>
            <input type="text" id="name" ref={nameInputRef} required />
            <label htmlFor="text">Profile Photo URL</label>
            <input type="text" id="url" ref={photoUrlInputRef} required />
          </div>
          <div className={classes.actions}>
            <button>Update</button>
          </div>
        </form> */}
        <Form onSubmit={formSumbitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              ref={nameInputRef}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="url">
            <Form.Label>Profile Photo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Photo Url"
              ref={photoUrlInputRef}
              required
            />
          </Form.Group>
          <Button
            className="col-md-12 text-center"
            variant="primary"
            type="submit"
          >
            Update
          </Button>
        </Form>
      </Container>
    </section>
  );
};
export default ProfilePage;
