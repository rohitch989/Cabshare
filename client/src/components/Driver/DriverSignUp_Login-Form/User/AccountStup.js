import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../../../Actions/Driver/authAction";
import { clearErrors } from "../../../../Actions/Driver/errorAction";

class AccountStup extends Component {
  // State
  state = {
    msg: null,
  };
  // Static Prototype declaration
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  // Change afte update
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if (isAuthenticated) {
      this.props.nextStep();
    }
  }
  // Submitting to Server
  Submit = (e) => {
    e.preventDefault();
    const { name, email, password, phone } = this.props.values;
    // Create User Object
    const newDriver = {
      name,
      email,
      password,
      phone,
    };
    // Attempt to register.
    this.props.register(newDriver);
  };

  render() {
    const { values, inputChange } = this.props;
    return (
      <div className="form-container-driver">
        <form>
          <h1 className="form-container-h1">Register </h1>
          <hr className="bg-white" />
          {this.state.msg ? (
            <div>
              <div className="msg" style={{ margin: '1rem  0 ' }}>{this.state.msg}</div>
            </div>
          ) : null}
          <div className="form-group" style={{ margin: '2rem auto' }}>
            <label htmlFor="name" className='signup-label'>Name</label>
            <input
              type="text"
              className="form-control "
              name="name"
              id="name"
              onClick={this.props.clearErrors}
              onChange={inputChange("name")}
              value={values.name}
              required
            />
          </div>
          <div className="form-group" style={{ margin: '2rem auto' }}>
            <label htmlFor="email" className='signup-label'>Email</label>
            <input
              type="email"
              className="form-control text-center"
              name="email"
              id="email"
              onClick={this.props.clearErrors}
              onChange={inputChange("email")}
              value={values.email}
              required
            />
          </div>
          <div className="form-group" style={{ margin: '2rem auto' }}>
            <label htmlFor="phone" className='signup-label'>Phone Number</label>
            <input
              type="text"
              className="form-control text-center"
              name="phone"
              id="phone"
              onClick={this.props.clearErrors}
              onChange={inputChange("phone")}
              value={values.phone}
              required
            />
          </div>
          <div className="form-group" style={{ margin: '2rem auto' }}>
            <label htmlFor="password" className='signup-label'>Password</label>
            <input
              type="password"
              className="form-control text-center"
              name="password"
              id="password"
              onClick={this.props.clearErrors}
              onChange={inputChange("password")}
              value={values.password}
              required
            />
          </div>
          <div className="form-group" style={{ margin: '2rem auto' }}>
            <label htmlFor="confirmpassword" className='signup-label confirm'>Confirm Password</label>
            <input
              type="confirmpassword"
              className="form-control text-center"
              onClick={this.props.clearErrors}
              name="confirmpassword"
              id='confirmpassword'
              required
            />
          </div>

          <hr className="bg-white" />
          <div >
            <button type='submit' className="sign-btn" onClick={this.Submit}>
              Continue
          </button>
          </div></form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.driverAuth.isAuthenticated,
  error: state.driverError,
});

export default connect(mapStateToProps, { register, clearErrors })(AccountStup);
