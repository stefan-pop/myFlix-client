import React from 'react';

import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';

// Router
import { Link } from "react-router-dom";

export function GenreView(props) {

    const { genre, clickBack, movies } = props;

    const genresMovies = movies.filter(m => m.genre.name === genre.name)


    return (
        <div className="director-view">
            <h2> {genre.name} </h2>
            <p> {genre.description} </p>

            
            <div className="genre-movies">
                <small>Movies belonging to this genre:</small>
                {genresMovies.map((m, i) => <p key={m._id}> <Link to={`/movies/${m._id}`}>{m.title}</Link> </p> )}
            </div> <hr />
            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}


GenreView.propTypes = {
    genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    clickBack: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired
}