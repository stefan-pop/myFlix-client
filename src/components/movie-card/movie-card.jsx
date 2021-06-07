import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movieObject, onMovieClick } = this.props;

        return <div className="movie-card" onClick={() => {onMovieClick(movieObject);}}>{movieObject.title}</div>;
    }
}

MovieCard.propTypes = {
    movieObject: PropTypes.shape({

        title: PropTypes.string.isRequired,

        description: PropTypes.string.isRequired,

        imagePath: PropTypes.string.isRequired,

        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            death: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        }).isRequired,

        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }).isRequired,

        featured: PropTypes.bool

    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}

