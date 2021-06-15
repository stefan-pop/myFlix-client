import React, { useState } from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Router
import { Link } from "react-router-dom";

// Styles
import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birth_date, setBirthDate ] = useState('');

    
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
        <Form>
            <h3>Create Account</h3> <hr />
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"   onChange={ (e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  onChange={ (e) => setPwd(e.target.value) } />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"  onChange={ (e) => setEmail(e.target.value) }/>
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
    )
}

