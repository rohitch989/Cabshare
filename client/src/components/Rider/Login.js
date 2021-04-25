import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { clearErrors } from "../../Actions/Rider/Errroraction";
import { login } from "../../Actions/Rider/Riderauth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: "",
  };
  // static prototype
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  // Error on Component Update
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  // Submitting Redux
  Submit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    // Attempt to login
    await this.props.login(user);
  };

  render() {
    const { isAuthenticated, user } = this.props;
    if (isAuthenticated && user) {
      return (
        <Redirect
          to={`/cabshare/auth/rider/?name=${user.name}&id=${user._id}`}
        />
      );
    } else {
      return (
        <div className="form-container rider-form-login">
          <div>
            <form>
              <div className="form-container-h1">Log in </div>
              <hr className="bg-white" />
              <div>
                {this.state.msg ? (
                  <div>
                    <br />
                    <div className="msg">{this.state.msg}</div>
                    <br />
                  </div>
                ) : null}
                <div className="form-group  rider-login">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control "
                    onChange={this.handleChange}
                    onClick={this.props.clearErrors}
                    autoComplete="on"
                  />
                </div>
                <div className="form-group  rider-login">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control "
                    onChange={this.handleChange}
                    onClick={this.props.clearErrors}
                    autoComplete="on"
                  />
                </div>
                <hr className="bg-white" />

                <div>
                  <button
                    type="submit"
                    className="login-submit "
                    onClick={this.Submit}
                  >
                    Log In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

// Creating Props
const mapStateToProps = (state) => ({
  isAuthenticated: state.riderAuth.isAuthenticated,
  error: state.riderError,
  user: state.riderAuth.rider,
});
export default connect(mapStateToProps, { login, clearErrors })(Login);
