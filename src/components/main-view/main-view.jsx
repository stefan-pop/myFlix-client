import axios from 'axios';
import React from 'react';

// Redux
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

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
            username: null,
            token: null,
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
            username: localStorage.getItem('user'),
            user: JSON.parse(localStorage.getItem('profile')),
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
        })
        .catch(error => {
          console.log(error);
        });
    }


    // Login
    loginUser(authData) {
        this.setState({
          username: authData.user.username,
          token: authData.token,
        });
      
        localStorage.setItem('user', JSON.stringify(authData.user));
        localStorage.setItem('token', authData.token);
        localStorage.setItem('username', authData.user.username);
        this.getMovies(authData.token);
      }

    // Logout function that clears the local storage and sets the username to null
    logoutUser() {
        localStorage.clear();
        this.setState({
            username: null
        });
    }

    // Update Users info
    updateUser(data) {
        this.setState( {
            username: data.username,
        } );

    }

    // Remove account
    deleteUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('profile');
        });
        localStorage.setItem('username', data.username);
        localStorage.setItem('user', JSON.stringify(data));
    }

    // Set the state of user, which represents an object with data about a user, after adding or deleting a movie.
    onMovieAddOrDelete(data) {
        localStorage.setItem('profile', JSON.stringify(data))
    }


    render() {
        const {username, token} = this.state;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">

                    {/* HOME */}
                    <Route exact path="/" render={() => {

                        if(!username) {
                            return  <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }

                        if (movies.length === 0) return <div className="main-view" />;

                        return movies.map(m => (
                            <Col md={6} key={m._id}>
                                <NavigationBar logOut={() => this.logoutUser()} user={username}  />
                                <MovieCard movieObject={m} />
                            </Col>
                        ))        
                    }} />


                    {/* REGISTRATION VIEW */}
                    <Route path="/register" render={() => {
                        if (username) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />


                    {/* MOVIE VIEW */}
                    <Route path="/movies/:movieId" render={({match, history}) => {

                        if(!username) {
                            return  <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={12}>
                            <NavigationBar logOut={() => this.logoutUser()} user={username}  />
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} clickBack={() => history.goBack()}  token={token} user={user} onMovieAddorDelete={(data) => this.onMovieAddOrDelete(data)} />
                        </Col>
                    }} />


                    {/* DIRECTOR VIEW */}
                    <Route path="/directors/:name" render={({ match, history }) => {

                        if(!username) {
                            return <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }                       

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={12}>
                            <NavigationBar logOut={() => this.logoutUser()} user={username}  />
                            <DirectorView director={movies.find(m => m.director.name === match.params.name).director} clickBack={() => {history.goBack()}} movies={movies}/>
                        </Col>
                    }} />

                    {/* GENRE VIEW */}
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if(!username) {
                            return <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={12}>
                            <NavigationBar logOut={() => this.logoutUser()} user={username}  />
                            <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} clickBack={() => {history.goBack()}} movies={movies} />
                        </Col>
                    }} />


                    {/* PROFILE VIEW */}
                    <Route path="/users/:username" render={({match, history}) => {

                        if(!username) {
                            return <Col>
                                <LoginView onLogin={ (user) => this.loginUser(user) } />
                            </Col>
                        }

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col>
                            <NavigationBar logOut={() => this.logoutUser()} user={username}  />
                            <ProfileView clickBack={() => {history.goBack()}} userProfile={user} userToken={token} onDelete={() => this.deleteUser()}  onUpdate={(data) => this.updateUser(data)} movies={movies} onMovieDelete={(data) => this.onMovieAddOrDelete(data)} />
                        </Col>
                    }} />

                </Row>
            
            </Router>

        )
    }
}
