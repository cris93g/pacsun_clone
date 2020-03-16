import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Views/Home/Home';
import SingleItem from './Views/SingleItem/SingleItem';
import Men from './Views/Men/Men';
import Women from './Views/Women/Women';
import SearchResults from './components/SearchResults/SearchResults';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Swim from './Views/Swim/Swim';
import BrandSearch from './components/BrandSearch/BrandSearch';
export default (
	<Switch>
		<Route component={Home} exact path="/" />
		<Route component={Men} exact path="/men" />
		<Route component={Women} exact path="/women" />
		<Route component={Checkout} exact path="/checkout" />
		<Route component={Cart} exact path="/cart" />
		<Route component={Swim} exact path="/swimwear" />
		<Route component={BrandSearch} exact path="/brand/:id" />
		<Route component={SearchResults} exact path="/search/:id" />
		<Route path="/item/:id" component={(props) => <SingleItem timestamp={new Date().toString()} {...props} />} />
	</Switch>
);
