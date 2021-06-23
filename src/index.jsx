import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {createStore}from 'redux';
import {Provider} from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

// Components
import MainView from './components/main-view/main-view';

// react-bootstrap components
import Container from 'react-bootstrap/Container';

// Styles
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class MyFlixApplication extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Container>
					<MainView />
				</Container>
			</Provider>
		);
	}
}

// Root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);