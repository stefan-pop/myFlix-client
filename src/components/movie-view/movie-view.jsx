import React from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Button from 'react-bootstrap/Button';

// Router
import { Link } from "react-router-dom";

// Styles
import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const {movie, clickBack} = this.props;
        return (
            <div className="movie-view">
                <div className="movie-image">
                    <img src={movie.imagePath} alt="Picture of the movie" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.title}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.genre.name}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.description}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.director.name}</span>
                </div>
                <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>

                <Link to={`/directors/${movie.director.name}`}>
                    <Button variant="link">Director</Button>
                </Link>
            </div>
        )
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
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

    }).isRequired
}
