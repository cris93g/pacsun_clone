import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import Footer from './components/Footer/Footer';
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<HashRouter>
					<Nav />
					{routes}
					<Footer />
				</HashRouter>
			</Provider>
		);
	}
}

export default App;
