import React, { Component } from "react";
import "./Guy.css";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
class Guy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: []
    };
  }
  componentDidMount() {
    axios.get(`/api/mens`).then(response => {
      this.setState({ featured: response.data });
    });
  }
  render() {
    console.log(this.state);
    const { featured } = this.state;
    const shuffled = featured
      ? featured.sort(() => 0.5 - Math.random())
      : "none";
    return (
      <div className="guyWrapper">
        <div className="guyTop" />
        <div className="girlHome">
          <div className="leftGuyHome" />
          <div className="rightGuyHome" />
        </div>
        <div className="mediumBannerG" />
        <div class="dressBanner">
          <div className="leftGuy" />
          <div className="rightGuy" />
        </div>
        <div className="lastBanner">
          <div className="lastGuyL" />
          <div className="lastGuyR" />
        </div>

        <div>
          <h1 className="bottomTitle">Just for you</h1>
          <div className="featuredItems">
            {shuffled
              ? shuffled.slice(-6).map(item => {
                  return (
                    <div>
                      <div>
                        <Link to={`/item/${item.id}`}>
                          <img
                            style={{ width: "90%" }}
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
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Guy;
