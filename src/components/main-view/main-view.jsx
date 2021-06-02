import React from 'react';

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
            return <div className="MainView">No movies!</div>
        }
        return <div className="MainView">
            {movies.map(movie => <div key={movie._id}> {movie.title} </div> )}
        </div>
    }
}
