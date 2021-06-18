import React from 'react';

import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function DirectorView({ director, clickBack }) {
export function DirectorView({ director, clickBack, movies }) {

    const directorsMovies = movies.filter(m => m.director.name === director.name)

    return (
        <div className="director-view">
            <h1> {director.name} </h1>
            <h3> {director.bio} </h3>
            <div className="director-movies">
                    <small>Movies belonging to this director:</small>
                    {directorsMovies.map((m, i) => <p key={m._id}> <Link to={`/movies/${m._id}`}>{m.title}</Link> </p> )}
            </div> <hr />
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