import React from 'react';

import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function DirectorView({ director, clickBack }) {

    return (
        <div className="director-view">
            <h1> {director.name} </h1>
            <h3> {director.bio} </h3>
            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}


DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        death: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    }).isRequired,
    clickBack: PropTypes.func.isRequired
}