import React, { useState } from 'react';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

        // Function that takes a prop 'onLogin' and assigns to the 'user_status' state from main-view a truthy value on successful submission.
        const handleSubmit = () => {
            console.log(username, password);
            props.onLogin(username);
        }

    return(
        <form action="">
            <label htmlFor="username">Username:</label>  
            <input type="text" id="username" value={ username } onChange={ (e) => setUsername(e.target.value)} />
            
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={ password } onChange={ (e) => setPassword(e.target.value)} />
           
            <button type='button' onClick={ handleSubmit }>Login</button>
        </form>
    )
}