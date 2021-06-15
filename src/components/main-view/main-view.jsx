import axios from 'axios';
import React from 'react';

// react-bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Router
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

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
            user_status: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
            user_status: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://myflix-app-1029.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    loginUser(authData) {
        console.log(authData);
        this.setState({
          user_status: authData.user.username,
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
      }

    render() {
        const {movies, user_status} = this.state;

        if(!user_status) {
            return <LoginView onLogin={ (user) => this.loginUser(user) } />
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
                            <MovieCard key={movie._id} movieObject={movie} />
                        </Col>
                    ))}
                </Row>

            </div>
        )
    }
}
