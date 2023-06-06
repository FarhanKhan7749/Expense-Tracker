import { useHistory } from 'react-router-dom';
import React, { useRef, useContext } from 'react';

import classes from './profilePage.module.css';
import AuthContext from '../../store/auth-context';
import { Button, Container } from 'react-bootstrap';

const ProfilePage = () => {
    const nameInputRef = useRef();
    const photoUrlInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const formSumbitHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredPhotoUrl = photoUrlInputRef.current.value;
         let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB_-vfM--LmM1vWcFIkvCYJs7kKfJ6xfl8'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                displayName: enteredName,
                photoUrl: enteredPhotoUrl,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                let errorMessage = "Failed to update Details";
                throw new Error(errorMessage);
            }
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            alert(error.message);
        })
    }

    const cancelButtonHandler = () =>{
         history.replace('/welcome');
    }

    return (
        <section className={classes.profile}>
            <Container className='d-flex border-bottom rounded p-1'>
                <Container className={classes.headingtag}>Winners never quite, Quitters never win.</Container>
                <Container className={classes.proge}>Your Profile is 64% completed. A complete Profile has
                    higher chances of landing a job. Complete now</Container>
            </Container>
            <Container className={classes.form}>
                <Container className='d-flex'>
                    <Container className='h2'>Contact Details</Container>
                    <Button variant="danger" onClick={cancelButtonHandler}>Cancel</Button>
                </Container>
                <form onSubmit={formSumbitHandler}>
                    <div className={classes['profile-info']}>
                        <label htmlFor='text'>Full Name</label>
                        <input type='text' id='name' ref={nameInputRef} required />
                        <label htmlFor='text'>Profile Photo URL</label>
                        <input type='text' id='url' ref={photoUrlInputRef} required />
                    </div>
                    <div className={classes.actions}>
                        <button>Update</button>
                    </div>
                </form>
            </Container>
        </section>
    )
}

export default ProfilePage;