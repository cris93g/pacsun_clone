import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class GirlFeatured extends Component {
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
		const { featured } = this.state;
		console.log(featured);
		// const shuffled = featured ? featured.sort(() => 0.5 - Math.random()) : 'none';
		return (
			<div className="featuredItems">
				{featured ? (
					featured.slice(-4).map((item) => {
						return (
							<div>
								<div>
									<Link to={`/item/${item.id}`}>
										<img style={{ width: '90%' }} src={item.picture} className="feauturedPic" />
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
		);
	}
}
export default GirlFeatured;
