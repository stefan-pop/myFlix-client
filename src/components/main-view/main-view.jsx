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
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {NavigationBar} from '../navigation-bar/navigation-bar';
import {ProfileView} from '../profile-view/profile-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            user_status: null,
            token: null,
            user_profile: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
            user_status: localStorage.getItem('user'),
            user_profile: JSON.parse(localStorage.getItem('profile')),
            token: localStorage.getItem('token')
            });
            this.getMovies(accessToken);
        }
    }

    // Fetch movies from DB
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


    // Login
    loginUser(authData) {
        console.log(authData);
        this.setState({
          user_status: authData.user.username,
          token: authData.token,
          user_profile: authData.user
        });
      
        localStorage.setItem('profile', JSON.stringify(authData.user));
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
      }

    // Logout function that clears the local storage and sets the user_status to null
    logoutUser() {
        localStorage.clear();
        this.setState({
            user_status: null
        });
    }

    // Update Users info
    updateUser(data) {
        console.log(data);
        this.setState( {
            user_status: data.username,
            user_profile: data
        } );

        localStorage.setItem('user', data.username);
        localStorage.setItem('profile', JSON.stringify(data));
    }

    // Remove account
    deleteUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('profile');
        this.setState({
            user_status: null,
            token: null
        });
    }

    // Set the state of user_profile, which represents an object with data about a user, after adding or deleting a movie.
    onMovieAddOrDelete(data) {
        console.log(data)
        this.setState({
            user_profile: data
        });

        localStorage.setItem('profile', JSON.stringify(data))
    }


    render() {
        const {movies, user_status, token, user_profile} = this.state;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">

                    {/* HOME */}
                    <Route exact path="/" render={() => {

                        if(!user_status) {
                            return  <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }

                        if (movies.length === 0) return <div className="main-view" />;

                        return movies.map(m => (
                            <Col md={6} key={m._id}>
                                <NavigationBar logOut={() => this.logoutUser()} user={user_status}  />
                                <MovieCard movieObject={m} />
                            </Col>
                        ))        
                    }} />


                    {/* REGISTRATION VIEW */}
                    <Route path="/register" render={() => {
                        if (user_status) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />


                    {/* MOVIE VIEW */}
                    <Route path="/movies/:movieId" render={({match, history}) => {

                        if(!user_status) {
                            return  <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={12}>
                            <NavigationBar logOut={() => this.logoutUser()} user={user_status}  />
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} clickBack={() => history.goBack()}  token={token} user={user_profile} onMovieAdd={(data) => this.onMovieAddOrDelete(data)} />
                        </Col>
                    }} />


                    {/* DIRECTOR VIEW */}
                    <Route path="/directors/:name" render={({ match, history }) => {

                        if(!user_status) {
                            return <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }                       

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <NavigationBar logOut={() => this.logoutUser()} user={user_status}  />
                            <DirectorView director={movies.find(m => m.director.name === match.params.name).director} clickBack={() => {history.goBack()}} />
                        </Col>
                    }} />

                    {/* GENRE VIEW */}
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if(!user_status) {
                            return <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <NavigationBar logOut={() => this.logoutUser()} user={user_status}  />
                            <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} clickBack={() => {history.goBack()}} />
                        </Col>
                    }} />


                    {/* PROFILE VIEW */}
                    <Route path="/users/:username" render={({match, history}) => {

                        if(!user_status) {
                            return <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col>
                            <NavigationBar logOut={() => this.logoutUser()} user={user_status}  />
                            <ProfileView clickBack={() => {history.goBack()}} userProfile={user_profile} userToken={token} onDelete={() => this.deleteUser()}  onUpdate={(data) => this.updateUser(data)} movies={movies} onMovieDelete={(data) => this.onMovieAddOrDelete(data)} />
                        </Col>
                    }} />

                </Row>
            
            </Router>

        )
    }
}
