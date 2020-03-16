import React, { Component } from 'react';
import axios from 'axios';
import './SingleItem.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GuyFeatures from '../../components/GuyFeatured/GuyFeatures';
import GirlFeatured from '../../components/GirlFeatured/GirlFeatured';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/ducks/itemReducer';
class SingleItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: {},
			featured: [],
			splitted: []
		};
		// this.findMatchingSex = this.findMatchingSex.bind(this);
	}
	componentDidMount() {
		axios
			.post(`api/item`, {
				id: this.props.match.params.id
			})
			.then((response) => {
				this.setState({ product: response.data[0] });
			});
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.product.id != this.props.match.params.id) {
			axios
				.post(`api/item`, {
					id: this.props.match.params.id
				})
				.then((response) => {
					this.setState({ product: response.data[0] });
				});
		} else {
			console.log('none');
		}
	}
	render() {
		const { product, featured } = this.state;
		return (
			<div>
				<div>
					{product ? (
						<div className="itemContainer">
							<div className="leftItem">
								<img style={{ width: '90%' }} src={product.picture} />
							</div>
							<div className="rightItem">
								<h1>{product.brand}</h1>
								<h2>{product.name}</h2>
								<h3>{product.price}</h3>
								<p>{product.description}</p>
								<Link to="/cart">
									{' '}
									<button onClick={() => addToCart(product)} className="cartButton">
										ADD TO BAG
									</button>
								</Link>
							</div>
							<div />
						</div>
					) : (
						''
					)}
				</div>
				<div className="bottomSingle">
					<h2>YOU MAY ALSO LIKE</h2>
				</div>
				<div>
					{product.sex == 'f' ? (
						<div className="featuredItems">
							<GirlFeatured />
						</div>
					) : (
						<GuyFeatures />
					)}
				</div>
				<div>{}</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { addToCart })(SingleItem);
