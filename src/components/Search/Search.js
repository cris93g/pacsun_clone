import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';
import { connect } from 'react-redux';

import { addToCart } from '../../redux/ducks/itemReducer';
import { MDBInput, MDBCol, MDBIcon } from 'mdbreact';
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			words: '',
			product: [],
			welp: []
		};
		this.search = this.search.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		axios.get(`/api/allItems`).then((response) => {
			this.setState({
				products: response.data
			});
		});
	}

	search(namekey, array) {
		let empty = [];
		for (let i = 0; i < array.length; i++) {
			console.log(array[i].name);
			if (array[i].name.toLowerCase().includes(namekey.toLowerCase())) {
				empty.push(array[i]);
				console.log(empty);
				this.setState({ welp: empty });
			}
		}
	}
	onChangeHandler(e) {
		this.setState({ words: e.target.value });
	}
	onSubmit() {
		this.search(this.state.words, this.state.products);
	}
	render() {
		const { words } = this.state;
		return (
			<div>
				<input className="in" onChange={(e) => this.onChangeHandler(e)} />
				<Link to={`/search/${words}`}>
					<i class="material-icons" onClick={this.onSubmit}>
						{' '}
					</i>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
						<path d="M0 0h24v24H0z" fill="none" />
					</svg>
				</Link>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { addToCart })(Search);
