import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {
        const { movieObject, onMovieClick } = this.props;
        
        return(
            <Card>
                <Card.Img variant="top" src={movieObject.imagePath} alt='Movie Image' />
                <Card.Body>
                    <Card.Title>{movieObject.title}</Card.Title>
                    <Card.Text>{movieObject.description.slice(0, 60) + '...'}</Card.Text>
                    <Button variant="link" onClick={() => onMovieClick(movieObject)}>Show more...</Button>
                </Card.Body>
            </Card>
        )
    }
}

MovieCard.propTypes = {
    movieObject: PropTypes.shape({

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

    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}

