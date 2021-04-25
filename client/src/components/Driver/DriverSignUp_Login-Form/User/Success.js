import React, { Component } from "react";
import PropTypes from "prop-types";
import { logout } from "../../../../Actions/Driver/authAction";
import '../map.css'
import { connect } from "react-redux";


class Success extends Component {
  // Static Prototype declaration
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (<div>
        <div className="form-container-driver " style={{ padding: '10rem auto' }}>
          <span className="form-container-h1 ">Login</span>
          <hr className="bg-white" />
          <div className="form-group rider-login " style={{ margin: '2rem auto' }}>
            Please <span className="msg">Login</span> to continue

              </div>


        </div>
        {setTimeout(() => {
          this.props.logout();
        }, 2000)}
      </div>)
    }
    else {
      return (<div>{this.props.change('login')}
      </div>)
    }


  }
}
// MapStateToProps.
const mapStateToProps = (state) => ({
  isAuthenticated: state.driverAuth.isAuthenticated,
  user: state.driverAuth.driver,
});

export default connect(mapStateToProps, { logout })(Success);
