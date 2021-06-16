import React , {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

// Style
import './profile-view.scss';


    return (
        <div className="profile-view">
            <h1>{`Welcome ${user}`}</h1>
            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}