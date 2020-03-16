import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart } from '../../redux/ducks/itemReducer';
import { Link } from 'react-router-dom';
import './Cart.css';
import GirlFeatured from '../../components/GirlFeatured/GirlFeatured';
class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: ''
		};
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}
	componentDidMount() {
		this.props.getCart();
	}

	onChangeHandler(e) {
		this.setState({ words: e.target.value });
	}
	render() {
		const { cart } = this.props.itemReducer;
		const { number } = this.state;
		let num = [];
		let parse = [];
		let sum = 0;
		function add(array) {
			for (let i = 0; i < array.length; i++) {
				parse.push(array[i].price);
			}

			for (let i = 0; i < parse.length; i++) {
				num.push(parseInt(parse[i].split('$')[1]));
			}

			sum = num.reduce((acc, val) => {
				return acc + val;
			}, 0);
			console.log(sum);
			return sum;
		}
		add(cart);
		return (
			<div>
				<div className="card_page" style={{ marginTop: '2%', marginBottom: '2%' }}>
					<div className="cartContainer">
						{this.props.itemReducer.cart.length > 0 ? (
							this.props.itemReducer.cart.map((item) => {
								return (
									<div>
										<div key={item.id}>
											<img src={item.picture} style={{ width: '40%' }} />
											<p style={{ width: '40%', marginRight: '0px' }}>{item.name}</p>
											<p>{item.price}</p>
										</div>
										{/* <input onChange={(e) => this.onChangeHandler(e)} /> */}

										<div />
									</div>
								);
							})
						) : (
							'No Items in cart add some'
						)}
					</div>
					<div className="secondCa">
						<div style={{ marginTop: '40%' }}>
							<p>{` Your total is $${sum}`}</p>
						</div>
						<div>
							<Link to={'/checkout'}>
								<button color="success" className="mycartButton">
									Confirm and Pay
								</button>
							</Link>
						</div>
					</div>
					<div />
				</div>
				<h1 className="cartb">Check out this great styles</h1>
				<GirlFeatured />
			</div>
		);
	}
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Cart);
