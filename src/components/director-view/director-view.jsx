import React from 'react';

import Button from 'react-bootstrap/Button';

export function DirectorView({ director, clickBack }) {

    return (
        <div className="director-view">
            <h1> {director.name} </h1>
            <h3> {director.bio} </h3>
            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}