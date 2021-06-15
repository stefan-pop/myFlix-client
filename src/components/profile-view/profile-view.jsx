import React from 'react';
import Button from 'react-bootstrap/Button';

export function ProfileView({clickBack}) {

    return (
        <div className="profile-view">
            <h1>Profile, Welcome</h1>
            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}