import React, { Component } from "react";
import { Elements } from "react-stripe-elements";
import Payment from "./Payment";
import axios from "axios";

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Elements>
        <Payment />
      </Elements>
    );
  }
}
export default Checkout;
