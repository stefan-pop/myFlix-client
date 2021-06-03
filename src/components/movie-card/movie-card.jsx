import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movieObject, onMovieClick } = this.props;

        return <div className="movie-card" onClick={() => {onMovieClick(movieObject);}}>{movieObject.title}</div>;
    }
}

