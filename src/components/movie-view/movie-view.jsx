import React from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Button from 'react-bootstrap/Button';

// Router
import { Link } from "react-router-dom";
import axios from 'axios';

// Styles
import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const {movie, clickBack, token, username} = this.props;


        // Add a movie to favorites
        const addMovie = () => {
            const userName = username;
            const accessToken = token;
            const movieId = movie._id;
            const url = `https://myflix-app-1029.herokuapp.com/users/${userName}/favorites/${movieId}` ;
            // axios.post(url , {
            //     headers: {Authorization: `Bearer ${token}`}
            // })
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }).then(response => {
                console.log(response.data); 
            }).catch(err => {
                console.log(err);
            })
        }
        

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

                <Link to={`/genres/${movie.genre.name}`}>
                    <Button variant="link">Genre</Button>
                </Link>

                <Button variant="link" onClick={addMovie}>Add to favorites</Button>
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
