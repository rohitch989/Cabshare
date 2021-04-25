import React, { Component } from "react";

class Confirm extends Component {
  // Continue Click Handle
  Continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  // Back Click handle
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { name, email, phone, password },
    } = this.props;



    return (
      <div className="form-container-driver">
        <form >
          <h1 className="form-container-h1">Confirm </h1>

          <hr className="bg-white" />
          <br />
          <div className="text-dark ">
            <div className="form-group " style={{ margin: '2rem auto' }}>
              <label htmlFor="name" className="signup-label ">
                Name:
            </label>
              <div className="col-sm-10  pl-5">
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  id="name"
                  value={name} style={{ color: 'white' }}
                />
              </div>
            </div>
            <div className="form-group " style={{ margin: '2rem auto' }}>
              <label htmlFor="email" className="signup-label  ">
                Email:
            </label>
              <div className="">
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  id="email"
                  value={email}
                  style={{ color: 'white' }}
                />
              </div>
            </div>
            <div className="form-group " style={{ margin: '2rem auto' }}>
              <label htmlFor="phone" className="signup-label">
                Phone_Number:
            </label>
              <div className="">
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  id="phone"
                  value={phone}
                  style={{ color: 'white' }}
                />
              </div>
            </div>
            <div className="form-group " style={{ margin: '2rem auto' }}>
              <label htmlFor="password" className="signup-label">
                Password:
            </label>
              <div className="">
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  id="password"
                  value={password}
                  style={{ color: 'white' }}
                />
              </div>
            </div>
            <hr />
            <br />
            <div className="confirm-button">
              <button className="sign-back" onClick={this.back}>
                Back
              </button>
              <button type='submit' className="sign-btn" onClick={this.Continue}>
                Continue
              </button>
            </div>
          </div></form>
      </div>
    );
  }
}

export default Confirm;
