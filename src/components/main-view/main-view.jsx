import axios from 'axios';
import React from 'react';

import {RegistrationView} from '../registration-view/registration-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user_status: null,
            registered: false
        }
    }

    componentDidMount() {
        axios.get('https://myflix-app-1029.herokuapp.com/movies')
        .then( response => {
            this.setState( {movies: response.data} );
        }).catch( error => {
            console.log(error);
        })
    }

    updateState(x) {
        this.setState({
            selectedMovie: x
        });
    }

    render() {
        const {movies, selectedMovie} = this.state;

        if (movies.length === 0) {
            return <div className="main-view">No movies!</div>
        }
        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} clickBack={(x) => {
                        this.updateState(x);
                    }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movieObject={movie} onMovieClick={(x) => {
                            this.updateState(x);
                        }} />
                    ))}
            </div>
        )
    }
}
