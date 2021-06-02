import React from 'react';
import {MovieCard} from '../movie-card/movie-card';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, title: 'Movie 1', description: 'desc 1...', imagePath: '...'},
                { _id: 1, title: 'Movie 2', description: 'desc 2...', imagePath: '...'},
                { _id: 1, title: 'Movie 3', description: 'desc 3...', imagePath: '...'}
            ]
        }
    }

    render() {
        const {movies} = this.state;
        if (movies.length === 0) {
            return <div className="main-view">No movies!</div>
        }
        return <div className="main-view">
            {movies.map(movie => <MovieCard key={movie._id} movieObject={movie}/> )}
        </div>
    }
}
