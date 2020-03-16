import React, { Component } from 'react';
import axios from 'axios';
import './Men.css';
import { Link } from 'react-router-dom';
class Men extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		};
	}
	componentDidMount() {
		axios.get('/api/mens').then((response) => {
			this.setState({ products: response.data });
		});
	}
	render() {
		console.log(this.state);
		const { products } = this.state;
		return (
			<div clasName="topdiv">
				<div className="MenWrapper">
					{products ? (
						products.map((product) => {
							return (
								<div style={{ marginTop: '2%' }} className="menCardWrapper">
									<Link to={`/item/${product.id}`}>
										{' '}
										<img style={{ width: '90%' }} src={product.picture} />
										<p style={{ width: '80%' }}>{product.name}</p>
										<p>{product.price}</p>
									</Link>
								</div>
							);
						})
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}
export default Men;
