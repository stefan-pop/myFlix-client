import React from 'react';
import Button from 'react-bootstrap/Button';

export function ProfileView({clickBack, user}) {

    return (
        <div className="profile-view">
            <h1>{`Welcome ${user}`}</h1>
            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}