import React from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null
        }
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
