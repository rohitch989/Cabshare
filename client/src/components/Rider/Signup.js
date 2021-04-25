import React, { Component } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../Actions/Rider/Errroraction";
import { register, logout } from "../../Actions/Rider/Riderauth";
import PropTypes from "prop-types";

class Signup extends Component {
  //  Creating State
  state = {
    name: "",
    phone: "",
    email: "",
    password: "",
    msg: "",
    confirmpassword: "",
  };
  // static prototype
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  // Setting State to value
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  Submit = (e) => {
    e.preventDefault();

    const { naam, email, password, confirmpassword, phone } = this.state;

    // Create User Object
    const newRider = {
      name: naam,
      email,
      password,
      confirmpassword,
      phone,
    };
    // Attempt to register.
    this.props.register(newRider);
  };

  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <div>
          <div className="form-container  ">
            <h1 className="form-container-h1">
              Please <span className="msg">Login</span> to continue
          </h1>
          </div>
          {setTimeout(() => {
            this.props.logout();
          }, 5000)}
        </div>
      );
    } else {
      return (
        <div className="form-container ">
          <form>
            <h1 className="form-container-h1">Register </h1>
            <hr className="bg-white" />
            {/* Error msg.. */}
            {this.state.msg ? (
              <div>
                <div className="msg">{this.state.msg}</div>
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="naam" className="signup-label">
                Name
              </label>
              <input
                type="text"
                className="form-control "
                id="naam"
                onChange={this.handleChange}
                onClick={this.props.clearErrors}
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="signup-label">
                Phone No.
              </label>
              <input
                type="text"
                id="phone"
                className="form-control "
                onChange={this.handleChange}
                onClick={this.props.clearErrors}
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="signup-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control "
                id="email"
                onChange={this.handleChange}
                onClick={this.props.clearErrors}
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="signup-label">
                Password
              </label>
              <input
                type="password"
                className="form-control "
                id="password"
                onChange={this.handleChange}
                onClick={this.props.clearErrors}
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword" className="signup-label confirm">
                Confirm Password{" "}
              </label>
              <input
                type="password"
                id="confirmpassword"
                className="form-control "
                onChange={this.handleChange}
                onClick={this.props.clearErrors}
                autoComplete="on"
              />
            </div>
            <hr className="bg-white" />

            <div>
              <button type="submit" className="sign-btn" onClick={this.Submit}>
                Register
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

// Creating Props
const mapStateToProps = (state) => ({
  isAuthenticated: state.riderAuth.isAuthenticated,
  error: state.riderError,
});

export default connect(mapStateToProps, { register, clearErrors, logout })(
  Signup
);
