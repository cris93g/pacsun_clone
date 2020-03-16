import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			address: '',
			token: '',
			error: false,
			message: ''
		};
		this.style = {
			form: {
				width: '800px',
				margin: '0 auto',
				backgroundColor: '#f7f8f9', //"#32325d",
				padding: '10px'
			},
			childForm: {
				display: 'flex'
			},
			inputContainer: {
				flexGrow: 1,
				display: 'flex'
			},
			error: {
				color: 'red',
				background: '#ffff0099',
				borderRadius: '5px',
				padding: '20px',
				margin: '5px 0px',
				fontSize: '20px',
				border: '1px red soild'
			},
			button: {
				'::hover': {
					boxShadow: ' 0 7px 14px rgba(50, 50, 93, .10), 0 3px 6px rgba(0, 0, 0, .08)',
					backgroundColor: '#43458b'
				},
				border: 'none',
				outline: 'none',
				color: '#fff',
				borderRadius: '5px',
				transition: 'all 150ms ease',
				background: '#32325d',
				padding: '0 14px',
				fontSize: '20px',
				height: '45px',
				width: '165px'
			},
			input: {
				height: '45px',
				borderRadius: '5px',
				border: 'none',
				padding: '12px 10px 6px',
				margin: '5px',
				fontSize: '20px',
				width: '100%',
				flexGrow: 1
			},
			stripe: {
				base: {
					color: '#32325d',
					lineHeight: '18px',

					fontSmoothing: 'antialiased',
					fontSize: '22px',
					'::placeholder': {
						color: '#aab7c4'
					}
				},
				invalid: {
					color: '#fa755a',
					iconColor: '#fa755a'
				}
			}
		};
	}

	getPaid(e) {
		e.preventDefault();
		this.setState({ error: false });
		const name = this.state.firstName + ' ' + this.state.lastName;
		this.props.stripe
			.createToken({ name })
			.then((data) => {
				this.setState({ token: data.token.id });
				const { token, firstName, lastName, address } = this.state;
				const { total } = this.props;
				const payload = { token, firstName, lastName, address, total };
				return axios.post('/api/checkout', payload);
			})
			.then((res) => {})
			//axios.delete(`/api/food/cart/:${1}`) can go in .then
			.catch((e) => {
				this.setState({
					error: true,
					message: e.message
				});
			});
	}

	handleChange(obj) {
		this.setState(obj);
	}

	render() {
		return (
			<div style={{ marginTop: '10vh' }}>
				<form name="payment" style={this.style.form} onSubmit={(e) => this.getPaid(e)}>
					{this.state.error ? (
						<div style={this.style.error}>
							<p>
								Failed to complete Transation:
								{this.state.message}
							</p>
						</div>
					) : null}
					<label> Payment Information </label>
					<div style={{ width: '40vw' }}>
						<div style={this.style.inputContainer}>
							<input
								name="firstName"
								placeholder="First Name"
								style={this.style.input}
								onChange={(e) => this.handleChange({ firstName: e.target.value })}
							/>
						</div>
						<div style={this.style.inputContainer}>
							<input
								name="lastName"
								placeholder="Last Name"
								style={this.style.input}
								onChange={(e) => this.handleChange({ lastName: e.target.value })}
							/>
						</div>
					</div>
					<div style={{ width: '40vw' }}>
						<div style={this.style.inputContainer}>
							<input
								name="address"
								placeholder="Address"
								style={this.style.input}
								onChange={(e) => this.handleChange({ address: e.target.value })}
							/>
						</div>
					</div>
					<label style={{ width: '40vw', marginTop: '10vh' }}>
						Card Details
						<CardElement style={this.style.stripe} style={{ marginTop: '10vh' }} />
					</label>
					<div>
						<Link to={'/Confirmation'}>
							<button type="submit" style={this.style.button}>
								Submit
							</button>
						</Link>
					</div>
				</form>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		total: state.total
	};
};
export default connect(mapStateToProps)(injectStripe(Payment));
