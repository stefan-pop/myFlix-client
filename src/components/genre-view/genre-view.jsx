import React from 'react';

import Button from 'react-bootstrap/Button'

export function GenreView(props) {

    const { genre, clickBack } = props;

    return (
        <div className="director-view">
            <h1> {genre.name} </h1>
            <h3> {genre.description} </h3>
            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}