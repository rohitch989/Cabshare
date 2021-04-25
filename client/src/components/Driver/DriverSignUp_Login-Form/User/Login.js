import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../../../../Actions/Driver/errorAction";
import { login } from "../../../../Actions/Driver/authAction";

class Login extends Component {
  // State
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
  // seeting State value
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
      return <Redirect to={`/cabshare/auth/driver?name=${user.name}&id=${user._id}`} />;
    }
    else {
      return (
        <div className="form-container-driver " style={{ padding: '10rem auto' }}>
          <div ><form>
            <span className="form-container-h1 ">Login</span>
            <hr className="bg-white" />
            <div>
              {this.state.msg ? (
                <div>
                  <br />
                  <div className="msg">
                    {this.state.msg}
                  </div>
                  <br />
                </div>
              ) : null}
              <div className="form-group rider-login " style={{ margin: '2rem auto' }}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  className="form-control  "
                  onChange={this.handleChange}
                  onClick={this.props.clearErrors}
                />
              </div>
              <div className="form-group rider-login " style={{ margin: '2rem auto' }}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control "
                  onChange={this.handleChange}
                  onClick={this.props.clearErrors}
                />
              </div>
              <hr className="bg-white" />
              <div>
                <button type='submit' className="login-submit " onClick={this.Submit}>
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
  isAuthenticated: state.driverAuth.isAuthenticated,
  error: state.driverError,
  user: state.driverAuth.driver,

});

export default connect(mapStateToProps, { login, clearErrors })(Login);
