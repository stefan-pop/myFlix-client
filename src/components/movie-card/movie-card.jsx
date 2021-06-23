import React from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Router
import { Link } from "react-router-dom";

// Styles
import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        
        return(
            <Card>
                <Card.Img variant="top" src={movie.imagePath} alt='Movie Image' />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description.slice(0, 60) + '...'}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">See more</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({

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

