import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Swim extends Component {
	constructor(props) {
		super(props);
		this.state = {
			men: [],
			women: [],
			switchComponent: true
		};
		this.girl = this.girl.bind(this);
		this.guy = this.guy.bind(this);
	}

	guy(e) {
		this.setState({ switchComponent: true });
	}

	girl(e) {
		this.setState({ switchComponent: false });
	}
	componentDidMount() {
		axios.get(`/api/mens/swimwear`).then((response) => {
			this.setState({ men: response.data });
		});

		axios.get(`/api/womens/swimwear`).then((response) => {
			this.setState({ women: response.data });
		});
	}
	render() {
		const { men, women, switchComponent } = this.state;
		console.log(this.state);
		return (
			<div>
				<div className="outside">
					<div className="buttonWrapper">
						<button
							className="switchButton"
							onClick={() => {
								this.girl();
							}}
						>
							Girl
						</button>
						<button
							className="switchButton"
							onClick={() => {
								this.guy();
							}}
						>
							Guy
						</button>
					</div>
				</div>

				<div div className="MenWrapper">
					{switchComponent ? (
						men.map((item) => {
							return (
								<div style={{ marginTop: '2%' }} className="menCardWrapper">
									<Link to={`/item/${item.id}`}>
										{' '}
										<img style={{ width: '90%' }} src={item.picture} />
										<p style={{ width: '80%' }}>{item.name}</p>
										<p>{item.price}</p>
									</Link>
								</div>
							);
						})
					) : (
						women.map((item) => {
							return (
								<div style={{ marginTop: '2%' }} className="menCardWrapper">
									<Link to={`/item/${item.id}`}>
										{' '}
										<img style={{ width: '90%' }} src={item.picture} />
										<p style={{ width: '80%' }}>{item.name}</p>
										<p>{item.price}</p>
									</Link>
								</div>
							);
						})
					)}
				</div>
			</div>
		);
	}
}
export default Swim;
