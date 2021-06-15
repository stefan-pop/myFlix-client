import React, { useState } from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

// Router
import { Link } from "react-router-dom";

// Styles
import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birth_date, setBirthDate ] = useState('');

    // States for validation
    const [ validateUser, setValidateUser ] = useState('');
    const [ validatePassword, setValidatePassword ] = useState('');
    const [ validateEmail, setValidateEmail ] = useState('');

    
    // Username validation
    const validateUsername = (e) => {
        if (e.target.value.length > 0 && e.target.value.length < 5) {
            setValidateUser('Username must be longer than 5 characters' );
        }else {
            setValidateUser('');
        }

        if (!e.currentTarget.value.match(/^[0-9a-z]+$/) && e.target.value.length > 0) {
            setValidateUser('Only alphanumeric characters allowed')
        }
    }

    // Password validation
    const validatePwd = (e) => {
        if (e.target.value.length > 0 && e.target.value.length < 8) {
            setValidatePassword('Password must be longer than 8 characters');
        }else {
            setValidatePassword('');
        }
    }

    // Email validation
    const validateMail = (e) => {
        if (!e.target.value.match(/\S+@\S+\.\S+/) && e.target.value.length > 0) {
            setValidateEmail('Invalid email');
        }else {
            setValidateEmail('');
        }
    }


    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://myflix-app-1029.herokuapp.com/users', {
            username: username,
            pwd: pwd,
            email: email,
            birth_date: birth_date
        }).then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
        }).catch(e => {
            console.log('error registering the user')
            });
    }

    return (
        <>
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">My Flix</Navbar.Brand>
        </Navbar>
        <Form>
            <h3>Create Account</h3> <hr />
            <Form.Group controlId="formUsername">
                <Form.Label>Username <span className="validation-feedback">{validateUser}</span> </Form.Label>
                <Form.Control type="text"  value={username}  onChange={ (e) => { setUsername(e.target.value), validateUsername(e) }} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password  <span className="validation-feedback">{validatePassword}</span> </Form.Label>
                <Form.Control type="password"  value={pwd} onChange={ (e) => { setPwd(e.target.value), validatePwd(e) }} />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email address <span className="validation-feedback">{validateEmail}</span> </Form.Label>
                <Form.Control type="email" value={email} onChange={ (e) => { setEmail(e.target.value), validateMail(e) }} />
            </Form.Group>
            
            <Form.Group controlId="formBirthday">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type="text"  onChange={ (e) => setBirthDate(e.target.value)} />
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

            <Form.Text className="text-muted">
                Already have an account? Register <Link to={`/`}>here</Link>
            </Form.Text>
        </Form>
        </>
    )
}

