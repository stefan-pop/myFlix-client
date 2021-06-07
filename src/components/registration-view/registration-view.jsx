import React, { useState } from 'react';

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

    return (
        <form action="">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={ username } onChange={ (e) => setUsername(e.target.value) } />

            <label htmlFor="pwd">Password:</label>
            <input type="password" id="pwd" value={ pwd } onChange={ (e) => setPwd(e.target.value) } />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={ email } onChange={ (e) => setEmail(e.target.value) } />

            <label htmlFor="birth">Birth Year:</label>
            <input type="text" id="birth" value={ birth_date } onChange={ (e) => setBirthDate(e.target.value) } />

            <button type="button" onClick={handleSubmit}>Create account</button>
        </form>
    )
}