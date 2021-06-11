import React from 'react';
import ReactDOM from 'react-dom';

// Components
import {MainView} from './components/main-view/main-view';

// react-bootstrap components
import Container from 'react-bootstrap/Container';

// Styles
import './index.scss';

// Main component
class MyFlixApplication extends React.Component {
	render() {
		return (
			<Container>
				<MainView />
			</Container>
		);
	}
}

// Root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);