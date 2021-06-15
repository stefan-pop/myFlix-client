import React from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Styles
import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movieObject } = this.props;
        
        return(
            <Card>
                <Card.Img variant="top" src={movieObject.imagePath} alt='Movie Image' />
                <Card.Body>
                    <Card.Title>{movieObject.title}</Card.Title>
                    <Card.Text>{movieObject.description.slice(0, 60) + '...'}</Card.Text>
                    <Button variant="link">Show more...</Button>
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

    }).isRequired
}

