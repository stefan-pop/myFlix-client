import React, { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
// Router
import { Link } from "react-router-dom";

// react-bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://myflix-app-1029.herokuapp.com/login', {
            username: username,
            pwd: password
        }).then(response => {
            const data = response.data;
            props.onLogin(data);
        }).catch(err => {
            console.log('No such user');
        })
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
                No account yet? Create one <Link to={`/register`}>here</Link>
            </Form.Text>
        </Form>
    )
}

LoginView.propTypes = {
    onLogin: PropTypes.func.isRequired
}
