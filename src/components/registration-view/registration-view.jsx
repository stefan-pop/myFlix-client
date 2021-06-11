import React, { useState } from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Styles
import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birth_date, setBirthDate ] = useState('');

    // Function that takes a prop 'onRegistration' and assigns to the 'registered' state from main-view a truthy value on successful submission.
    const handleSubmit = () => {
        console.log(username, pwd);
        props.onRegistration(username);
    }

    // function that implements the 'Already have an account' link at the bottom of the Form
    const skipReg = () => {
        props.skipRegistration()
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
                Already have an account? Sign in <a href="#" onClick={skipReg} >here</a>
            </Form.Text>
        </Form>
    )
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
    skipRegistration: PropTypes.func.isRequired
}
