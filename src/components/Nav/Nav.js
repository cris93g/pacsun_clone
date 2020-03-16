import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../../redux/ducks/itemReducer';
import Search from '../Search/Search';
class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false
		};
		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}
	componentDidMount() {
		this.props.getCart();
	}

	showMenu(event) {
		event.preventDefault();

		this.setState({ showMenu: true }, () => {
			document.addEventListener('click', this.closeMenu);
		});
	}

	closeMenu() {
		this.setState({ showMenu: false }, () => {
			document.removeEventListener('click', this.closeMenu);
		});
	}
	render() {
		console.log(this.props.itemReducer.cart.length);
		return (
			<div className="nav">
				<div className="topOfNav">
					<Search />
					<Link to="/cart">
						{' '}
						<i className="material-icons">shopping_cart</i> {this.props.itemReducer.cart.length}
					</Link>
				</div>

				<div className="outerContainer">
					<div className="mainTitle">
						<Link to="/">
							{' '}
							<h1 style={{ letterSpacing: '1em' }}>PAC-CLONE</h1>
						</Link>
					</div>
					<div className="navContainer">
						<Link to="/men">
							{' '}
							<div>Men</div>
						</Link>
						<Link to="/women">
							{' '}
							<div>Women</div>
						</Link>
						<div onClick={this.showMenu}>Brands</div>

						{this.state.showMenu ? (
							<div className="menu">
								<div>
									<Link to={`/brand/Kendall & Kylie`}>
										{' '}
										<ul> Kendall & Kylie </ul>
									</Link>
									<Link to={`/brand/LA Hearts`}>
										<ul> LA Hearts </ul>
									</Link>
									<Link to={`/brand/Lottie Moss`}>
										{' '}
										<ul> Lottie Moss </ul>
									</Link>
									<Link to={`/brand/Me To We`}>
										{' '}
										<ul> Me To We </ul>
									</Link>
									<Link to={`/brand/PacSun`}>
										{' '}
										<ul> PacSun </ul>
									</Link>
									<Link to={`/brand/Rhythm`}>
										{' '}
										<ul> Rhythm </ul>
									</Link>
								</div>
								<div>
									<Link to={`/brand/adidas`}>
										{' '}
										<ul> adidas </ul>
									</Link>
									<Link to={`/brand/Champion`}>
										{' '}
										<ul> Champion </ul>
									</Link>
									<Link to={`/brand/Guess`}>
										<ul> Guess </ul>
									</Link>
									<Link to={`/brand/Obey`}>
										{' '}
										<ul> Obey </ul>
									</Link>
									<Link to={`/brand/Tommy Jeans`}>
										{' '}
										<ul> Tommy Jeans </ul>
									</Link>
									<Link to={`/brand/Oakley`}>
										{' '}
										<ul> Oakley </ul>
									</Link>
								</div>
							</div>
						) : null}

						<Link to="/swimwear">
							{' '}
							<div>Swim</div>
						</Link>
					</div>{' '}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Nav);
