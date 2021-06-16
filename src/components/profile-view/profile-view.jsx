import React , {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// Style
import './profile-view.scss';


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

            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}