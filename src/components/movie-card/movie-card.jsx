import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const {movieObject} = this.props;
        return <div className="movie-card">{movieObject.title}</div>;
    }
}

