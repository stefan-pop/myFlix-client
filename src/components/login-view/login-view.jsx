import React, { useState } from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    // Function that takes a prop 'onLogin' and assigns to the 'user_status' state from main-view a truthy value on successful submission.
    const handleSubmit = () => {
        console.log(username, password);
        props.onLogin(username);
    }

    // function that implements the 'No account yet' link at the bottom of the Form
    const goToReg = () => {
        props.goToRegistration()
    }

    return(
        <Form>
            <h3>Login</h3> <hr />
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={ (e) => setUsername(e.target.value)}  />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  onChange={ (e) => setPassword(e.target.value)}  />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={ handleSubmit } >Submit</Button>

            <Form.Text className="text-muted">
                No account yet? Create one <a href="#" onClick={goToReg} >here</a>
            </Form.Text>
        </Form>
    )
}

LoginView.propTypes = {
    onLogin: PropTypes.func.isRequired,
    goToRegistration: PropTypes.func.isRequired
}
