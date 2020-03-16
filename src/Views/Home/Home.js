import React, { Component } from 'react';
import Guy from '../../components/Guy/Guy';
import Girl from '../../components/Girl/Girl';
import './Home.css';
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
	render() {
		const { switchComponent } = this.state;
		console.log(switchComponent);
		if (switchComponent == true) {
		}
		return (
			<div className="App">
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

				<div className="homeImage" />
				<div>{switchComponent ? <Guy /> : <Girl />}</div>
			</div>
		);
	}
}
export default Home;
