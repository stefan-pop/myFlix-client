import React , {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// Style
import './profile-view.scss';

export function ProfileView({clickBack, userProfile, userToken, onDelete, onUpdate}) {

    const [ newUsername, updateUsername ] = useState('');
    const [ newPassword, updatePassword ] = useState('');
    const [ newEmail, updateEmail ] = useState('');
    const [ newBirth, updateBirth ] = useState('');

    const { username, email, birth_date, favorite_movies  } = userProfile;

    // Update users info
    const updateUser = (e) => {
        e.preventDefault();
       
        axios.put(`https://myflix-app-1029.herokuapp.com/users/${username}`,
        { 
            username: newUsername,
            pwd: newPassword,
            email: newEmail,
            birth_date: newBirth
        },
        {
            headers: { Authorization: `Bearer ${userToken}`}

        }).then(response => {
            const data = response.data;
            console.log(data)
            onUpdate(data)
        }).catch(err => {
            console.log(err + 'Update fail')
        })
    }

    return (
        <div className="profile-view">
            <h3>{`Welcome ${userProfile.username}`}</h3> <hr />

            <div className="user-profile">
                <div className="user-info">
                    <div className="user-label">Username:</div>
                    <div className="user">{userProfile.username}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Email:</div>
                    <div className="user">{userProfile.email}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Birth:</div>
                    <div className="user">{userProfile.birth_date.slice(0, 10)}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Favorite Movies:</div>
                    <ul className="user">
                        {userProfile.favorite_movies.map((id, index) => <li key={index}> <span>{id}</span></li> )}
                    </ul>
                </div>
            </div>

            <Form className="update-info">
                <h3>Manage account</h3> <hr />
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>New-username:</Form.Label>
                    <Form.Control type="text" value={newUsername} onChange={(e) => updateUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>New-password:</Form.Label>
                    <Form.Control type="password" value={newPassword} onChange={(e) => updatePassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>New-email:</Form.Label>
                    <Form.Control type="email"  value={newEmail} onChange={(e) => updateEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicBirth">
                    <Form.Label>New-Birth(yyyy-mm-dd):</Form.Label>
                    <Form.Control type="text"  value={newBirth} onChange={(e) => updateBirth(e.target.value)} />
                </Form.Group>

                <div className="button-wrapper">
                    <Button variant="primary" size="sm" type="submit" onClick={updateUser} >Update details</Button>
                </div>

            </Form>


            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}