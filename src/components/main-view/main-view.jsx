import axios from 'axios';
import React from 'react';

// react-bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components
import {LoginView} from '../login-view/login-view';
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

    registerUser(user) {
        this.setState( {registered: user} )
    }

    loginUser(user) {
        this.setState( {user_status: user} )
    }

    // The next 2 functions manipulate the state of register in order to implement the 'already registered' and 'no account yet' links from RegistrationView & LoginView components.
    skipRegistration() {
        this.setState( {registered: true} )
    }

    goToRegistration() {
        this.setState( {registered: false} )
    }

    render() {
        const {movies, selectedMovie, registered, user_status} = this.state;

        if(!registered) {
            return <RegistrationView onRegistration={ (user) => this.registerUser(user)} skipRegistration={ () => this.skipRegistration()} />
        }

        if(!user_status) {
            return <LoginView onLogin={ (user) => this.loginUser(user) } goToRegistration={ () => this.goToRegistration()} />
        }

        if (movies.length === 0) {
            return <div className="main-view">No movies!</div>
        }
        return (
            <div className="main-view">

                <Row className="justify-content-md-center">
                {selectedMovie
                    ? (
                        <Col md={12}>
                            <MovieView movie={selectedMovie} clickBack={(x) => { this.updateState(x); }} />
                        </Col>   
                    )
                    : movies.map(movie => (
                        <Col md={6} key={movie._id} >
                            <MovieCard key={movie._id} movieObject={movie} onMovieClick={(x) => { this.updateState(x); }} />
                        </Col>
                    ))}
                </Row>

                {/* <button type="button" onClick={() => this.loginUser(null)}>Log Out</button> */}
            </div>
        )
    }
}
