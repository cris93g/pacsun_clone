import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { addToCart } from '../../redux/ducks/itemReducer';

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			words: '',
			product: [],
			welp: []
		};
	}

	componentDidMount() {
		axios.get(`/api/allItems`).then((response) => {
			this.setState({
				products: response.data
			});
		});
	}

	render() {
		let { products } = this.state;

		return (
			<div clasName="topdiv">
				<div className="MenWrapper">
					{products ? (
						products.map((product) => {
							if (product.brand.toLowerCase().includes(this.props.match.params.id.toLowerCase())) {
								console.log(product);
								return (
									<div className="menCardWrapper">
										<div style={{ marginTop: '2%' }}>
											<Link to={`/item/${product.id}`}>
												<img style={{ width: '80%' }} src={product.picture} />
											</Link>
											<p>{product.name}</p>
											<p>{product.price}</p>
										</div>
									</div>
								);
							}
						})
					) : (
						<h1>'no search results'</h1>
					)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { addToCart })(SearchResults);
