import React, { Component } from 'react';
import './Girl.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Girl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			featured: []
		};
	}
	componentDidMount() {
		axios.get(`/api/women`).then((response) => {
			this.setState({ featured: response.data });
		});
	}
	render() {
		console.log(this.state);
		const { featured } = this.state;
		const shuffled = featured ? featured.sort(() => 0.5 - Math.random()) : 'none';
		return (
			<div>
				<div className="womenBanner" />
				<div className="girlHome">
					<div className="leftGirlHome" />
					<div className="rightGirlHome" />
				</div>
				<div />
				<div className="mediumBanner" />
				<div class="dressBanner">
					<div className="leftDress" />
					<div className="rightDress" />
				</div>
				<div className="lastBanner">
					<div className="lastLeft" />
					<div className="lastRight" />
				</div>
				<div>
					<h1 className="bottomTitle">Just for you</h1>
					<div className="featuredItems">
						{shuffled ? (
							shuffled.slice(-6).map((item) => {
								return (
									<div>
										<div>
											<Link to={`/item/${item.id}`}>
												{' '}
												<img
													style={{ width: '90%' }}
													src={item.picture}
													className="feauturedPic"
												/>
											</Link>
										</div>
										<p>{item.name}</p>
										<p>{item.price}</p>
									</div>
								);
							})
						) : (
							''
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Girl;
