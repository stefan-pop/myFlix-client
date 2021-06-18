import React , {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import PropTypes from 'prop-types';

// Router
import { Link } from "react-router-dom";

// Style
import './profile-view.scss';

export function ProfileView({ userProfile, userToken, onDelete, onUpdate, movies, onMovieDelete }) {

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
    

    // Delete Account
    const deleteUser = () => {
        axios.delete(`https://myflix-app-1029.herokuapp.com/users/${username}`,
        {
            headers: { Authorization: `Bearer ${userToken}` }

        }).then(response => {
            console.log(response.data)
            onDelete();
        }).catch(err => {
            console.log(err)
        })
    }

    // Delete a film from favorites
    const deleteMovie = (movieID) => {
        axios.delete(`https://myflix-app-1029.herokuapp.com/users/${username}/favorites/${movieID}`,
        {
            headers: { Authorization: `Bearer ${userToken}` }

        }).then(response => {
            const data = response.data;
            console.log(data)
            onMovieDelete(data)
        }).catch(err => {
            console.log(err)
        })
    }



    // Filters the movies based on the favorite_movies (array of only movie IDs)
    const filteredMovies = movies.filter(m => {
        return favorite_movies.indexOf(m._id) >= 0 ;
    });
    

    return (
        <div className="profile-view">
            <h4>{`Welcome ${username}`}</h4> <hr />

            <div className="user-profile">
                <div className="user-info">
                    <div className="user-label">Username:</div>
                    <div className="user">{username}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Email:</div>
                    <div className="user">{email}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Birth:</div>
                    <div className="user">{birth_date.slice(0, 10)}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Favorite Movies:</div>
                    <ul className="user">
                    {filteredMovies.map((m, index)=> <li key={index} className="fav-list">  <Link to={`/movies/${m._id}`}>{m.title}</Link> <button className="close" onClick={() => deleteMovie(m._id)} >&times;</button> </li>)}
                    </ul>
                </div>
            </div>

            <Form className="update-info">
                <h4>Manage account</h4> <hr />
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
                    <Button variant="danger" size="sm" type="button" onClick={deleteUser} >Delete account</Button>
                </div>
            </Form>   
        </div>
    )
}


ProfileView.propTypes = {
    movies: PropTypes.array.isRequired,

    userProfile: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        favorite_movies: PropTypes.array.isRequired,
        birth_date: PropTypes.string.isRequired,
        pwd: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,

    userToken: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onMovieDelete: PropTypes.func.isRequired,
}
