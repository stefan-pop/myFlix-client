import React from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, title: 'Movie 1', description: 'desc 1...', genre: 'Comedy', director: 'director 1', imagePath: '...'},
                { _id: 2, title: 'Movie 2', description: 'desc 2...', genre: 'Action', director: 'director 2', imagePath: '...'},
                { _id: 3, title: 'Movie 3', description: 'desc 3...', genre: 'Drama',  director: 'director 3', imagePath: '...'}
            ],
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
