import React, { Component } from "react";
import AccountStup from "./AccountStup";
import Confirm from "./Confirm";
import Success from "./Success";
class Form extends Component {
  // State
  state = {
    authenticated: false,
    step: 1,
    name: "",
    email: "",
    phone: "",
    password: "",
    msg: null,
  };
  // nextStep
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };
  // PrevStep
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };
  // HandelChange
  inputChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    const { step } = this.state;
    const { name, email, phone, password } = this.state;
    const values = { name, email, phone, password };
    // Switch Case
    switch (step) {
      case 1:
        return (
          <AccountStup
            nextStep={this.nextStep}
            inputChange={this.inputChange}
            values={values}
          />
        );

      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );

      case 3:
        return <Success change={this.props.change} />;


      default:
        return (
          <AccountStup
            nextStep={this.nextStep}
            inputChange={this.inputChange}
            values={values}
          />
        );
    }
  }
}

export default Form;
